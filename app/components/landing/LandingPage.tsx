"use client";

import { useEffect, useRef, useState } from "react";
import { LandingContent } from "./LandingContent";
import { Footer } from "../layout/Footer";
import { FloatingCTA } from "../layout/FloatingCTA";
import { LoadingOverlay } from "./LoadingOverlay";

export function LandingShowcase() {
    const [heroReady, setHeroReady] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [revealVideo, setRevealVideo] = useState(false);
    const [loaderStage, setLoaderStage] = useState<"visible" | "pulse-out" | "logo-out" | "hide">("visible");
    const sequenceStarted = useRef(false);

    useEffect(() => {
        const fallbackTimer = window.setTimeout(() => {
            setHeroReady(true);
        }, 6000);

        return () => window.clearTimeout(fallbackTimer);
    }, []);

    useEffect(() => {
        if (!heroReady || sequenceStarted.current) return;
        sequenceStarted.current = true;

        const buffer = 0;
        const logoDuration = 90;
        const overlayDuration = 130;

        const revealTimer = window.setTimeout(() => {
            setRevealVideo(true);
            setLoaderStage("logo-out");
        }, buffer);

        const hideTimer = window.setTimeout(() => {
            setLoaderStage("hide");
        }, buffer + logoDuration);

        const unmountTimer = window.setTimeout(() => {
            setShowLoader(false);
        }, buffer + logoDuration + overlayDuration);

        return () => {
            window.clearTimeout(revealTimer);
            window.clearTimeout(hideTimer);
            window.clearTimeout(unmountTimer);
        };
    }, [heroReady]);

    return (
        <main className="min-h-screen bg-white">
            {showLoader ? <LoadingOverlay stage={loaderStage} /> : null}
            <LandingContent
                onHeroReady={() => setHeroReady(true)}
                isHeroReady={revealVideo}
            />

            {!showLoader ? <FloatingCTA /> : null}
            <Footer />
        </main>
    );
}
