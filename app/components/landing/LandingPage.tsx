import { LandingContent } from "./LandingContent";
import { LandingShell } from "./LandingShell";
import { Footer } from "../layout/Footer";

export function LandingShowcase() {
    return (
        <main className="min-h-screen bg-white">
            <LandingShell>
                <LandingContent />
            </LandingShell>
            <Footer />
        </main>
    );
}
