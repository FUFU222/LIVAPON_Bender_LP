"use client";

import { useState, useEffect } from "react";

export function Copyright() {
    // プリレンダリング時はnullにしておき、マウント後に現在の年を設定する
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <span className="text-gray-dark text-sm">
            © {year || "2026"} LIVAPON. All Rights Reserved.
        </span>
    );
}
