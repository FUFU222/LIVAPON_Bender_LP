import Link from "next/link";
import Image from "next/image";
import { Copyright } from "@/app/components/ui/Copyright";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 md:h-20 flex items-start pt-6">
                <div className="w-full px-6">
                    <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
                        <span className="sr-only">LIVAPON TOP</span>
                        <Image
                            src="/images/livapon_logo_black.png"
                            alt="LIVAPON"
                            width={120}
                            height={32}
                            className="h-auto w-36 md:w-44"
                        />
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-24 md:pt-32 pb-24 px-4">
                <article className="max-w-3xl mx-auto prose prose-gray">
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">利用規約</h1>

                    <p className="text-gray-dark leading-relaxed mb-8">
                        この利用規約（以下、「本規約」といいます。）は、LIVAPON（以下、「当方」といいます。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。利用ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
                    </p>

                    <section className="mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 border-b border-gray-200 pb-2">第1条（適用）</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-dark">
                            <li>本規約は、ユーザーと当方との間の本サービスの利用に関わる一切の関係に適用されるものとします。</li>
                            <li>当方は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。</li>
                        </ol>
                    </section>

                    <section className="mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 border-b border-gray-200 pb-2">第2条（禁止事項）</h2>
                        <p className="text-gray-dark leading-relaxed mb-4">
                            ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
                        </p>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-dark">
                            <li>法令または公序良俗に違反する行為</li>
                            <li>犯罪行為に関連する行為</li>
                            <li>本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為</li>
                            <li>当方、ほかのユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                            <li>当方のサービスの運営を妨害するおそれのある行為</li>
                            <li>不正アクセスをし、またはこれを試みる行為</li>
                            <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                            <li>不正な目的を持って本サービスを利用する行為</li>
                            <li>当方のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                            <li>その他、当方が不適切と判断する行為</li>
                        </ol>
                    </section>

                    <section className="mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 border-b border-gray-200 pb-2">第3条（本サービスの提供の停止等）</h2>
                        <p className="text-gray-dark leading-relaxed mb-4">
                            当方は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                        </p>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-dark">
                            <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                            <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                            <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                            <li>その他、当方が本サービスの提供が困難と判断した場合</li>
                        </ol>
                    </section>

                    <section className="mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 border-b border-gray-200 pb-2">第4条（利用制限および登録抹消）</h2>
                        <p className="text-gray-dark leading-relaxed">
                            当方は、ユーザーが本規約のいずれかの条項に違反した場合、事前の通知なく、ユーザーに対して本サービスの利用を制限し、または抹消することができるものとします。
                        </p>
                    </section>

                    <section className="mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 border-b border-gray-200 pb-2">第5条（保証の否認および免責事項）</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-dark">
                            <li>当方は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。</li>
                            <li>当方は、本サービスに起因してユーザーに生じたあらゆる損害について、当方の故意または重過失による場合を除き、一切の責任を負いません。</li>
                        </ol>
                    </section>

                    <section className="mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 border-b border-gray-200 pb-2">第6条（利用規約の変更）</h2>
                        <p className="text-gray-dark leading-relaxed">
                            当方は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
                        </p>
                    </section>

                    <section className="mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 border-b border-gray-200 pb-2">第7条（準拠法・裁判管轄）</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-dark">
                            <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
                            <li>本サービスに関して紛争が生じた場合には、当方の本店所在地を管轄する裁判所を専属的合意管轄裁判所とします。</li>
                        </ol>
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
