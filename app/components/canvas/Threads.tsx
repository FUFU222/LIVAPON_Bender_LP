"use client";

import { useEffect, useRef, useState } from "react";
import { Renderer, Program, Mesh, Triangle, Color } from "ogl";

interface ThreadsProps {
    color?: [number, number, number];
    amplitude?: number;
    distance?: number;
    speed?: number;
    enableMouseInteraction?: boolean;
    className?: string;
}

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform float uSpeed;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 18; // Reduced for performance
const float u_line_width = 3.0;
const float u_line_blur = 5.0;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance, float speed) {
    float split_point = 0.05 + (perc * 0.4);

    float amplitude_normal = smoothstep(0.0, 0.5, st.x) * (1.0 - smoothstep(0.8, 1.2, st.x));
    float finalAmplitude = amplitude_normal * 0.6 * amplitude * (1.0 + (mouse.y - 0.5) * 0.3);

    float time_scaled = time * speed + (mouse.x - 0.5) * 0.5 + perc * 10.0;
    float blur = smoothstep(split_point, split_point + 0.1, st.x) * perc;

    // Simplified noise (single layer for performance)
    float xnoise = noise(vec2(time_scaled * 0.6, st.x * 3.0 + perc));

    float y = 0.5 + (perc - 0.5) * distance + (xnoise - 0.5) * finalAmplitude;

    float p_pixel = pixel(1.0, iResolution.xy) * u_line_blur * (1.0 + blur);
    float line_start = smoothstep(y + (width / 2.0) + p_pixel, y, st.y);
    float line_end = smoothstep(y, y - (width / 2.0) - p_pixel, st.y);

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.2, pow(perc, 0.5))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    float p_pixel = pixel(1.0, iResolution.xy);
    
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * p_pixel * (1.2 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance,
            uSpeed
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

export function Threads({
    color = [1, 1, 1],
    amplitude = 1,
    distance = 0,
    speed = 0.2,
    enableMouseInteraction = true,
    className = "",
    ...rest
}: ThreadsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameId = useRef<number>(undefined);
    const programRef = useRef<Program>(undefined);
    const rendererRef = useRef<Renderer>(undefined);
    const [isVisible, setIsVisible] = useState(false);

    // Intersection Observer to pause when not in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;

        const renderer = new Renderer({
            alpha: true,
            antialias: false, // Turned off for performance (high DPR handles it)
            dpr: Math.min(window.devicePixelRatio, 1.5) // Capped at 1.5
        });
        rendererRef.current = renderer;
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        container.appendChild(gl.canvas);

        const geometry = new Triangle(gl);
        const program = new Program(gl, {
            vertex: vertexShader,
            fragment: fragmentShader,
            uniforms: {
                iTime: { value: 0 },
                iResolution: {
                    value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height),
                },
                uColor: { value: new Color(...color) },
                uAmplitude: { value: amplitude },
                uDistance: { value: distance },
                uSpeed: { value: speed },
                uMouse: { value: new Float32Array([0.5, 0.5]) },
            },
        });
        programRef.current = program;

        const mesh = new Mesh(gl, { geometry, program });

        function resize() {
            if (!container || !rendererRef.current || !programRef.current) return;
            const { clientWidth, clientHeight } = container;
            rendererRef.current.setSize(clientWidth, clientHeight);
            const uniforms = programRef.current.uniforms;
            uniforms.iResolution.value.r = clientWidth;
            uniforms.iResolution.value.g = clientHeight;
            uniforms.iResolution.value.b = clientWidth / clientHeight;
        }
        window.addEventListener("resize", resize);
        resize();

        let currentMouse = [0.5, 0.5];
        let targetMouse = [0.5, 0.5];

        function handleMouseMove(e: MouseEvent) {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;
            targetMouse = [x, y];
        }
        function handleMouseLeave() {
            targetMouse = [0.5, 0.5];
        }

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        function update(t: number) {
            if (!isVisible) {
                animationFrameId.current = requestAnimationFrame(update);
                return;
            }

            if (programRef.current) {
                if (enableMouseInteraction) {
                    const smoothing = 0.05;
                    currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
                    currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
                    programRef.current.uniforms.uMouse.value[0] = currentMouse[0];
                    programRef.current.uniforms.uMouse.value[1] = currentMouse[1];
                }
                programRef.current.uniforms.iTime.value = t * 0.001;
            }

            renderer.render({ scene: mesh });
            animationFrameId.current = requestAnimationFrame(update);
        }
        animationFrameId.current = requestAnimationFrame(update);

        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
            window.removeEventListener("resize", resize);
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
            if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
            gl.getExtension("WEBGL_lose_context")?.loseContext();
        };
    }, [enableMouseInteraction, isVisible]); // Re-run update loop if visibility changes

    useEffect(() => {
        if (programRef.current) {
            programRef.current.uniforms.uColor.value.set(...color);
            programRef.current.uniforms.uAmplitude.value = amplitude;
            programRef.current.uniforms.uDistance.value = distance;
            programRef.current.uniforms.uSpeed.value = speed;
        }
    }, [color, amplitude, distance, speed]);

    return <div ref={containerRef} className={`w-full h-full relative ${className}`} {...rest} />;
}
