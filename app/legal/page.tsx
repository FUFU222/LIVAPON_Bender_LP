import Link from "next/link";
import Image from "next/image";
import { Copyright } from "@/app/components/ui/Copyright";

export default function Legal() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 md:h-20 flex items-center">
                <div className="max-w-6xl mx-auto px-4 w-full">
                    <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
                        <span className="sr-only">LIVAPON TOP</span>
                        <Image
                            src="/images/livapon_logo_black.png"
                            alt="LIVAPON"
                            width={120}
                            height={32}
                            className="h-6 md:h-8 w-auto"
                        />
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-24 md:pt-32 pb-24 px-4">
                <article className="max-w-3xl mx-auto prose prose-gray">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">特定商取引法に基づく表記</h1>

                    <section className="mb-8 md:mb-12">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-left text-gray-dark">
                                <tbody>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 font-bold w-1/3 md:w-1/4 align-top">販売業者</th>
                                        <td className="py-4">株式会社CHAIRAMAN</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 font-bold align-top">代表責任者</th>
                                        <td className="py-4">
                                            田中透
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 font-bold align-top">所在地</th>
                                        <td className="py-4">
                                            〒107-0062<br />
                                            東京都港区南青山2-2-15
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 font-bold align-top">電話番号</th>
                                        <td className="py-4">
                                            請求があった場合に遅滞なく開示します。
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 font-bold align-top">メールアドレス</th>
                                        <td className="py-4">
                                            information@chairman.jp
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 font-bold align-top">販売価格</th>
                                        <td className="py-4">
                                            各サービスページに記載されている価格とします。
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 font-bold align-top">商品代金以外の必要料金</th>
                                        <td className="py-4">
                                            消費税、銀行振込手数料（銀行振込の場合）
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 font-bold align-top">支払方法および支払の時期</th>
                                        <td className="py-4">
                                            クレジットカード決済、銀行振込
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 font-bold align-top">お支払時期</th>
                                        <td className="py-4">
                                            ・クレジットカード：各カード会社引き落とし日<br />
                                            ・銀行振込：注文後7日以内
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 font-bold align-top">引渡時期</th>
                                        <td className="py-4">
                                            決済確認後、即時（サービスによって異なります）
                                        </td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 font-bold align-top">返品・交換・キャンセルについて</th>
                                        <td className="py-4">
                                            サービスの性質上、返品・返金はお受けしておりません。解約については利用規約をご確認ください。
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </article>
            </main>

            <footer className="bg-gray-50 py-12 border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <Link href="/" className="text-accent font-medium hover:underline">
                        Top Pageへ戻る
                    </Link>
                    <div className="mt-8">
                        <Copyright />
                    </div>
                </div>
            </footer>
        </div>
    );
}
