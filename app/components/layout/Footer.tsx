import { Copyright } from "../ui/Copyright";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-foreground text-white py-12">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <div className="mb-6">
                    <Image
                        src="/images/livapon_logo_white.png"
                        alt="LIVAPON"
                        width={150}
                        height={40}
                        className="h-8 w-auto mx-auto"
                    />
                </div>

                {/* Legal Links */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 text-xs text-gray-light/70">
                    <Link href="/privacy" className="hover:text-white transition-colors">
                        プライバシーポリシー
                    </Link>
                    <Link href="/terms" className="hover:text-white transition-colors">
                        利用規約
                    </Link>
                    <Link href="/legal" className="hover:text-white transition-colors">
                        特定商取引法に基づく表記
                    </Link>
                </div>

                <p className="text-sm text-gray-light/70 mb-4">
                    日本の『最高』を、<br className="md:hidden" />世界の『熱狂』へ。
                </p>
                <p className="text-xs text-gray-light/50">
                    © <Copyright /> LIVAPON. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
