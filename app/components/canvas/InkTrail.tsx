"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; t: number };

type InkTrailProps = {
    className?: string;
    colors?: string[];                 // 墨色の候補
    accentProbability?: number;        // 赤など差し色の出現率
    minWidth?: number;                 // 最小筆幅（px, CSS基準）
    maxWidth?: number;                 // 最大筆幅（px, CSS基準）
    fadeStrength?: number;             // 1フレームで消える強さ（0.02〜0.10目安）
    bristleCount?: number;             // 毛羽立ち（副スタンプ）
    splatterProbability?: number;      // 飛沫の確率（0〜1）
    drawOnlyWhenPressed?: boolean;     // trueなら押してる時だけ描く（モバイル向け）
};

function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
}
function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}

function prefersReducedMotion() {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

/**
 * ノイズ入りの筆先マスク（白=インク）を作る
 * → これを色で染めたバリアントを作ってスタンプする
 */
function createBrushMask(size: number) {
    const c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);

    // ベース：やや歪んだ円グラデ（中心濃い、外側薄い）
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate((Math.random() - 0.5) * 0.3);
    ctx.scale(1.2, 0.9);
    const g = ctx.createRadialGradient(0, 0, 2, 0, 0, size * 0.48);
    g.addColorStop(0, "rgba(255,255,255,0.95)");
    g.addColorStop(0.5, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0.00)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.48, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // かすれ：ランダム粒
    ctx.save();
    for (let i = 0; i < size * 10; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const r = Math.random() * (size * 0.06);
        ctx.globalAlpha = Math.random() * 0.12;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
    }
    ctx.restore();

    // エッジをザラつかせる（αノイズ）
    const img = ctx.getImageData(0, 0, size, size);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
        const a = d[i + 3] / 255;
        if (a <= 0) continue;
        const jitter = 0.65 + Math.random() * 0.65; // かすれ強弱
        d[i + 3] = Math.floor(clamp(a * jitter, 0, 1) * 255);
    }
    ctx.putImageData(img, 0, 0);

    return c;
}

function tintMask(mask: HTMLCanvasElement, color: string) {
    const size = mask.width;
    const c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(mask, 0, 0);
    ctx.globalCompositeOperation = "source-in";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, size, size);
    ctx.globalCompositeOperation = "source-over";
    return c;
}

export function InkTrail({
    className,
    colors = ["#0b0b0b", "#111111", "#1a1a1a", "#bc002d"], // 墨+差し色
    accentProbability = 0.12,
    minWidth = 2.0,
    maxWidth = 18.0,
    fadeStrength = 0.055,
    bristleCount = 3,
    splatterProbability = 0.08,
    drawOnlyWhenPressed = false,
}: InkTrailProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    const dprRef = useRef(1);
    const rectRef = useRef<DOMRect | null>(null);

    const pointsRef = useRef<Point[]>([]);
    const lastPointRef = useRef<Point | null>(null);
    const pointerDownRef = useRef(false);

    const rafRef = useRef<number | null>(null);

    const brushVariants = useRef<{ ready: boolean; variants: HTMLCanvasElement[] }>({
        ready: false,
        variants: [],
    });

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        ctxRef.current = ctx;

        // 見た目を少し柔らかく（やりすぎ注意）
        ctx.imageSmoothingEnabled = true;

        // ブラシ作成（offscreen）
        const mask = createBrushMask(128);
        const baseColors = colors.slice(0, Math.max(1, colors.length));
        const variants = baseColors.map((c) => tintMask(mask, c));
        brushVariants.current.ready = true;
        brushVariants.current.variants = variants;

        const resize = () => {
            rectRef.current = canvas.getBoundingClientRect();
            const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1)); // 2以上は重いので制限
            dprRef.current = dpr;

            const w = Math.floor((rectRef.current.width || 1) * dpr);
            const h = Math.floor((rectRef.current.height || 1) * dpr);

            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
        };

        resize();
        window.addEventListener("resize", resize);

        const getLocal = (e: PointerEvent) => {
            const rect = rectRef.current ?? canvas.getBoundingClientRect();
            rectRef.current = rect;
            const dpr = dprRef.current;
            return {
                x: (e.clientX - rect.left) * dpr,
                y: (e.clientY - rect.top) * dpr,
            };
        };

        const onPointerDown = (e: PointerEvent) => {
            pointerDownRef.current = true;
            const { x, y } = getLocal(e);
            const t = performance.now();
            pointsRef.current.push({ x, y, t });
            lastPointRef.current = { x, y, t };
        };

        const onPointerUp = () => {
            pointerDownRef.current = false;
            lastPointRef.current = null;
        };

        const onPointerMove = (e: PointerEvent) => {
            if (drawOnlyWhenPressed && !pointerDownRef.current) return;

            const { x, y } = getLocal(e);
            const t = performance.now();

            const last = lastPointRef.current;
            if (!last) {
                lastPointRef.current = { x, y, t };
                pointsRef.current.push({ x, y, t });
                return;
            }

            // 間引き（細かすぎる点は捨てて軽量化）
            const dx = x - last.x;
            const dy = y - last.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 2.0 * dprRef.current) return;

            lastPointRef.current = { x, y, t };
            pointsRef.current.push({ x, y, t });
        };

        canvas.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("pointercancel", onPointerUp);
        window.addEventListener("pointermove", onPointerMove, { passive: true });

        const stamp = (
            cx: CanvasRenderingContext2D,
            x: number,
            y: number,
            angle: number,
            widthCss: number,
            speed: number
        ) => {
            const variants = brushVariants.current.variants;
            if (!variants.length) return;

            // 色選択：ほぼ墨、たまに差し色
            const useAccent = Math.random() < accentProbability;
            const idx = useAccent ? variants.length - 1 : Math.floor(Math.random() * Math.max(1, variants.length - 1));
            const img = variants[clamp(idx, 0, variants.length - 1)];

            const dpr = dprRef.current;
            const w = widthCss * dpr;

            // 速いほど細く、かつ“はらい”っぽく伸びる
            const stretch = clamp(1 + speed * 0.9, 1, 2.8);

            cx.save();
            cx.translate(x, y);
            cx.rotate(angle);

            // かすれ強弱
            cx.globalAlpha = clamp(0.65 + Math.random() * 0.35, 0.15, 1);

            // ちょいブラー（墨のにじみ“風”）
            cx.filter = "blur(0.35px)";

            const drawSize = w * 2.0;
            cx.scale(stretch, 1);
            cx.drawImage(img, -drawSize / 2, -drawSize / 2, drawSize, drawSize);

            // 毛羽立ち（副スタンプを少しずらして重ねる）
            for (let i = 0; i < bristleCount; i++) {
                const ox = (Math.random() - 0.5) * w * 0.25;
                const oy = (Math.random() - 0.5) * w * 0.35;
                const s = 0.75 + Math.random() * 0.35;
                cx.globalAlpha = 0.18 + Math.random() * 0.22;
                cx.drawImage(img, -drawSize / 2 + ox, -drawSize / 2 + oy, drawSize * s, drawSize * s);
            }

            cx.filter = "none";
            cx.restore();

            // 飛沫（速いほど出やすく）
            const splatter = splatterProbability * clamp(speed * 1.2, 0, 2.2);
            if (Math.random() < splatter) {
                cx.save();
                cx.globalAlpha = 0.15 + Math.random() * 0.25;
                const rBase = w * 0.18;
                for (let i = 0; i < 3 + Math.floor(Math.random() * 4); i++) {
                    const a = Math.random() * Math.PI * 2;
                    const rr = w * (0.6 + Math.random() * 1.8);
                    const px = x + Math.cos(a) * rr;
                    const py = y + Math.sin(a) * rr;
                    const pr = rBase * (0.3 + Math.random() * 0.9);
                    cx.beginPath();
                    cx.arc(px, py, pr, 0, Math.PI * 2);
                    cx.fillStyle = "#111111";
                    cx.fill();
                }
                cx.restore();
            }
        };

        const speedToWidth = (speed: number) => {
            // speedは「px / ms」くらいの値
            // 速い→細い、遅い→太い
            const s = clamp(speed, 0, 1.8);
            const w = lerp(maxWidth, minWidth, s / 1.8);
            return clamp(w, minWidth, maxWidth);
        };

        const loop = () => {
            const cx = ctxRef.current;
            const c = canvasRef.current;
            if (!cx || !c) return;

            // 透明に向かってフェード（背景が何色でもOK）
            cx.save();
            cx.globalCompositeOperation = "destination-out";
            cx.fillStyle = `rgba(0,0,0,${fadeStrength})`;
            cx.fillRect(0, 0, c.width, c.height);
            cx.restore();

            // 点列を消化してスタンプ描画
            const pts = pointsRef.current;
            if (pts.length >= 2) {
                // 一度に食いすぎると重いので上限
                const consume = Math.min(pts.length - 1, 8);

                for (let k = 0; k < consume; k++) {
                    const p0 = pts[k];
                    const p1 = pts[k + 1];

                    const dx = p1.x - p0.x;
                    const dy = p1.y - p0.y;
                    const dist = Math.hypot(dx, dy);
                    const dt = Math.max(1, p1.t - p0.t);
                    const speed = dist / dt; // px/ms
                    const angle = Math.atan2(dy, dx);

                    const width = speedToWidth(speed);

                    // スタンプ間隔：太いほど間隔を広げる（密だと重い）
                    const spacing = clamp(width * 0.35, 3, 10) * dprRef.current;
                    const steps = Math.max(1, Math.floor(dist / spacing));

                    for (let i = 0; i <= steps; i++) {
                        const t = i / steps;
                        const x = lerp(p0.x, p1.x, t);
                        const y = lerp(p0.y, p1.y, t);
                        stamp(cx, x, y, angle, width, speed);
                    }
                }

                // 消化した分だけ削る（先頭は残し、繋がり維持）
                pts.splice(0, consume);
            }

            rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("pointercancel", onPointerUp);
            window.removeEventListener("pointermove", onPointerMove);
        };
    }, [
        colors,
        accentProbability,
        minWidth,
        maxWidth,
        fadeStrength,
        bristleCount,
        splatterProbability,
        drawOnlyWhenPressed,
    ]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none", // CTA操作の邪魔をしない
            }}
        />
    );
}
