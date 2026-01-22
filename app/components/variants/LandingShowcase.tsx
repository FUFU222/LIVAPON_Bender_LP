"use client";

import { VariantA } from "./VariantA";
import { Footer } from "../layout/Footer";

export function LandingShowcase() {
    return (
        <main className="min-h-screen bg-white">
            <VariantA />

            <Footer />
        </main>
    );
}
