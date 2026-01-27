"use client";

import type { ReactNode } from "react";

const sizeClasses = {
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
};

type ContainerSize = keyof typeof sizeClasses;

interface ContainerProps {
    size?: ContainerSize;
    className?: string;
    children: ReactNode;
}

export function Container({ size = "6xl", className = "", children }: ContainerProps) {
    const classes = ["mx-auto w-full px-6", sizeClasses[size], className]
        .filter(Boolean)
        .join(" ");

    return <div className={classes}>{children}</div>;
}
