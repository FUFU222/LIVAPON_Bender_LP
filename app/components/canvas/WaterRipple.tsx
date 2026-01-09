"use client";

import React, { useEffect, useRef } from "react";

type Ripple = {
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    opacity: number;
    speed: number;
    width: number; // 線の太さ
};

type WaterRippleProps = {
    className?: string;
    rippleSpeed?: number;      // 波紋が広がる速度
    maxRadiusMultiplier?: number; // 波紋の最大サイズの係数
    baseOpacity?: number;      // 波紋の基本不透明度
    color?: string;            // 影の色（基本は黒/グレー）
};

export function WaterRipple({
    className,
    rippleSpeed = 2.5,
    maxRadiusMultiplier = 80,
    baseOpacity = 0.08,
    color = "#000000",
}: WaterRippleProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ripplesRef = useRef<Ripple[]>([]);
    const lastPosRef = useRef<{ x: number; y: number } | null>(null);
    const lastTimeRef = useRef<number>(0);
    const isMovingRef = useRef<boolean>(false);
    const stopTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;

        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (!rect) return;

            const dpr = Math.min(window.devicePixelRatio, 2);
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener("resize", resize);
        resize();

        const addRipple = (x: number, y: number, isStopRipple: boolean = false) => {
            // 停止時の波紋は大きく、ゆっくり消える
            const sizeScale = isStopRipple ? 2.5 : 1.0;

            ripplesRef.current.push({
                x,
                y,
                radius: 0,
                maxRadius: Math.random() * maxRadiusMultiplier * sizeScale + 50,
                opacity: isStopRipple ? baseOpacity * 1.5 : baseOpacity,
                speed: rippleSpeed * (isStopRipple ? 0.8 : 1.0 + Math.random() * 0.5),
                width: isStopRipple ? 4 : 2,
            });

            // 数が増えすぎないように制限
            if (ripplesRef.current.length > 30) {
                ripplesRef.current.shift();
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const now = Date.now();

            isMovingRef.current = true;

            // 停止判定タイマーをリセット
            if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
            stopTimerRef.current = setTimeout(() => {
                isMovingRef.current = false;
                // マウスが止まった瞬間に大きな波紋を発生
                addRipple(x, y, true);
                lastPosRef.current = null;
            }, 100); // 100ms停止したら「止まった」とみなす

            // 移動中の波紋生成（一定距離または一定時間ごと）
            if (lastPosRef.current) {
                const dx = x - lastPosRef.current.x;
                const dy = y - lastPosRef.current.y;
                const dist = Math.hypot(dx, dy);
                const timeDiff = now - lastTimeRef.current;

                // あまり頻繁に出しすぎない (距離20px以上 または 時間50ms以上)
                if (dist > 20 || timeDiff > 50) {
                    addRipple(x, y, false);
                    lastPosRef.current = { x, y };
                    lastTimeRef.current = now;
                }
            } else {
                lastPosRef.current = { x, y };
                lastTimeRef.current = now;
            }
        };

        const render = () => {
            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);

            // 波紋の描画
            ripplesRef.current.forEach((ripple, index) => {
                ripple.radius += ripple.speed;
                ripple.opacity -= 0.0005 * ripple.speed; // 半径が広がるにつれて薄くなる
                ripple.width += 0.05; // 広がるにつれて少し太くなる

                if (ripple.opacity <= 0 || ripple.radius >= ripple.maxRadius) {
                    ripplesRef.current.shift(); // 配列の先頭から削除（古い順）
                    return;
                }

                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);

                // 影（Shadow）を描画して立体感を出す
                ctx.strokeStyle = `rgba(0, 0, 0, ${ripple.opacity})`;
                ctx.lineWidth = ripple.width;
                ctx.stroke();

                // ハイライト（Highlight）を少しずらして描画（任意：白背景だと効果薄いが、重ねると立体感が出る）
                // 白背景なので、ハイライトは描かずに影だけで「凹み」を表現するか、
                // あるいはクリッピングで内側を薄くするか。
                // ここではシンプルに影のグラデーションのみにする。
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", () => {
            if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
            lastPosRef.current = null;
        });

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
        };
    }, [rippleSpeed, maxRadiusMultiplier, baseOpacity, color]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "auto", // マウスイベントを受け取る
            }}
        />
    );
}
