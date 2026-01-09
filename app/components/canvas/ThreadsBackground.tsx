"use client";

import { useEffect, useRef, useCallback } from "react";

interface Thread {
    x: number;
    y: number;
    vx: number;
    vy: number;
    length: number;
    angle: number;
    speed: number;
}

export function ThreadsBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const threadsRef = useRef<Thread[]>([]);
    const animationRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0 });

    const initThreads = useCallback((width: number, height: number) => {
        const threads: Thread[] = [];
        const count = Math.floor((width * height) / 15000);
        for (let i = 0; i < count; i++) {
            threads.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                length: Math.random() * 80 + 40,
                angle: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.002 + 0.001,
            });
        }
        threadsRef.current = threads;
    }, []);

    const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        const threads = threadsRef.current;
        const mouse = mouseRef.current;

        threads.forEach((thread) => {
            // Update position
            thread.x += thread.vx;
            thread.y += thread.vy;
            thread.angle += thread.speed;

            // Wrap around edges
            if (thread.x < -thread.length) thread.x = width + thread.length;
            if (thread.x > width + thread.length) thread.x = -thread.length;
            if (thread.y < -thread.length) thread.y = height + thread.length;
            if (thread.y > height + thread.length) thread.y = -thread.length;

            // Calculate mouse influence
            const dx = mouse.x - thread.x;
            const dy = mouse.y - thread.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, 1 - dist / 200);

            // Draw thread
            const endX = thread.x + Math.cos(thread.angle) * thread.length;
            const endY = thread.y + Math.sin(thread.angle) * thread.length;

            ctx.beginPath();
            ctx.moveTo(thread.x, thread.y);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = `rgba(229, 229, 229, ${0.4 + influence * 0.4})`;
            ctx.lineWidth = 1 + influence * 0.5;
            ctx.stroke();
        });
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
            initThreads(window.innerWidth, window.innerHeight);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);

        const animate = () => {
            draw(ctx, window.innerWidth, window.innerHeight);
            animationRef.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, [initThreads, draw]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
        />
    );
}
