"use client";

import { useEffect, useState } from "react";

interface CopyrightProps {
    className?: string;
}

export function Copyright({ className = "text-gray-dark text-sm" }: CopyrightProps) {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <span className={className}>
            © {year ?? "----"} LIVAPON. All Rights Reserved.
        </span>
    );
}
