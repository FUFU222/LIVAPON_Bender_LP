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
    stopDistance?: number;     // 停止時の波紋を出すまでの移動距離
    stopDelay?: number;        // 停止判定までの時間(ms)
    stopSizeScale?: number;    // 停止時の波紋サイズ係数
};

export function WaterRipple({
    className,
    rippleSpeed = 2.5,
    maxRadiusMultiplier = 160,
    baseOpacity = 0.03,
    color = "#111111",
    stopDistance = 80,
    stopDelay = 30,
    stopSizeScale = 2.0,
}: WaterRippleProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ripplesRef = useRef<Ripple[]>([]);
    const lastPosRef = useRef<{ x: number; y: number } | null>(null);
    const travelDistanceRef = useRef<number>(0);
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
            const rect = canvas.getBoundingClientRect();
            const edgeMargin = 12; // shadow/blur 分の余白
            const edgeLimit = Math.min(
                x - edgeMargin,
                y - edgeMargin,
                rect.width - x - edgeMargin,
                rect.height - y - edgeMargin
            );
            if (edgeLimit <= 8) return;

            // 停止時の波紋は大きく、ゆっくり消える
            const sizeScale = isStopRipple ? stopSizeScale : 1.0;
            const desiredMaxRadius = Math.random() * maxRadiusMultiplier * sizeScale + 50;
            const boundedMaxRadius = Math.min(desiredMaxRadius, edgeLimit);

            ripplesRef.current.push({
                x,
                y,
                radius: 0,
                maxRadius: boundedMaxRadius,
                opacity: isStopRipple ? baseOpacity * 1.1 : baseOpacity,
                speed: rippleSpeed * (isStopRipple ? 0.85 : 1.0 + Math.random() * 0.5),
                width: isStopRipple ? 3 : 2,
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

            isMovingRef.current = true;

            // 停止判定タイマーをリセット
            if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
            stopTimerRef.current = setTimeout(() => {
                isMovingRef.current = false;
                // 一定距離以上動いた時のみ、停止時にほのかに波紋を発生
                if (travelDistanceRef.current >= stopDistance) {
                    addRipple(x, y, true);
                }
                lastPosRef.current = null;
                travelDistanceRef.current = 0;
            }, stopDelay); // 停止したら「止まった」とみなす

            if (lastPosRef.current) {
                const dx = x - lastPosRef.current.x;
                const dy = y - lastPosRef.current.y;
                const dist = Math.hypot(dx, dy);
                travelDistanceRef.current += dist;
                lastPosRef.current = { x, y };
            } else {
                lastPosRef.current = { x, y };
            }
        };

        const render = () => {
            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);

            // 波紋の描画
            ripplesRef.current.forEach((ripple) => {
                ripple.radius += ripple.speed;
                ripple.opacity -= 0.0005 * ripple.speed; // 半径が広がるにつれて薄くなる
                ripple.width += 0.05; // 広がるにつれて少し太くなる

                if (ripple.opacity <= 0 || ripple.radius >= ripple.maxRadius) {
                    ripplesRef.current.shift(); // 配列の先頭から削除（古い順）
                    return;
                }

                const t = ripple.radius / ripple.maxRadius;
                const fade = Math.max(0, 1 - t);
                const alpha = ripple.opacity * fade * fade;
                const width = Math.max(0.6, ripple.width * (1 - t * 0.4));

                // 影（Shadow）とハイライトで水面の立体感を表現
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.strokeStyle = color;
                ctx.lineWidth = width;
                ctx.shadowBlur = 6;
                ctx.shadowColor = color;
                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
                ctx.stroke();

                ctx.shadowBlur = 0;
                ctx.globalAlpha = alpha * 0.5;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
                ctx.lineWidth = Math.max(0.4, width * 0.6);
                ctx.beginPath();
                ctx.arc(ripple.x, ripple.y, ripple.radius + width * 0.6, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();

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
            travelDistanceRef.current = 0;
        });

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
        };
    }, [rippleSpeed, maxRadiusMultiplier, baseOpacity, color, stopDistance, stopDelay, stopSizeScale]);

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
