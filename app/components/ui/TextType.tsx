"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

type TextTypeProps = {
    text: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
    cursorCharacter?: string;
    cursorBlinkDuration?: number;
    className?: string;
};

export function TextType({
    text,
    typingSpeed = 120,
    deletingSpeed = 60,
    pauseDuration = 2000,
    cursorCharacter = "|",
    cursorBlinkDuration = 0.8,
    className = "",
}: TextTypeProps) {
    const words = useMemo(() => (text.length ? text : [""]), [text]);
    const [index, setIndex] = useState(0);
    const [display, setDisplay] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = words[index % words.length];
        let timeoutId: number;

        if (!isDeleting && display.length < current.length) {
            timeoutId = window.setTimeout(() => {
                setDisplay(current.slice(0, display.length + 1));
            }, typingSpeed);
        } else if (!isDeleting && display.length === current.length) {
            timeoutId = window.setTimeout(() => setIsDeleting(true), pauseDuration);
        } else if (isDeleting && display.length > 0) {
            timeoutId = window.setTimeout(() => {
                setDisplay(current.slice(0, display.length - 1));
            }, deletingSpeed);
        } else if (isDeleting && display.length === 0) {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
        }

        return () => {
            if (timeoutId) window.clearTimeout(timeoutId);
        };
    }, [words, index, display, isDeleting, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <span className={`texttype ${className}`.trim()}>
            <span className="texttype__text">{display}</span>
            <span
                className="texttype__cursor"
                style={
                    {
                        ["--cursor-blink-duration" as keyof CSSProperties]: `${cursorBlinkDuration}s`,
                    } as CSSProperties
                }
                aria-hidden="true"
            >
                {cursorCharacter}
            </span>
        </span>
    );
}
