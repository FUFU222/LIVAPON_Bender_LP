"use client";

import { LandingContent } from "./LandingContent";
import { Footer } from "../layout/Footer";

export function LandingShowcase() {
    return (
        <main className="min-h-screen bg-white">
            <LandingContent />

            <Footer />
        </main>
    );
}
