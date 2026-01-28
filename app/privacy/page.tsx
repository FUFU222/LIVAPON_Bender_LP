import Link from "next/link";
import Image from "next/image";
import { Copyright } from "@/app/components/ui/Copyright";

export default function PrivacyPolicy() {
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
                    <h1 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">プライバシーポリシー</h1>

                    <p className="text-gray-dark leading-relaxed mb-8">
                        LIVAPON（以下、「当方」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
                    </p>

                    <section className="mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 border-b border-gray-200 pb-2">第1条（個人情報）</h2>
                        <p className="text-gray-dark leading-relaxed">
                            「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
                        </p>
                    </section>

                    <section className="mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 border-b border-gray-200 pb-2">第2条（個人情報の収集方法）</h2>
                        <p className="text-gray-dark leading-relaxed">
                            当方は、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレス、銀行口座番号、クレジットカード番号などの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を、当方の提携先（情報提供元、広告主、広告配信先などを含みます。以下、｢提携先｣といいます。）などから収集することがあります。
                        </p>
                    </section>

                    <section className="mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 border-b border-gray-200 pb-2">第3条（個人情報を収集・利用する目的）</h2>
                        <p className="text-gray-dark leading-relaxed mb-4">
                            当方が個人情報を収集・利用する目的は、以下のとおりです。
                        </p>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-dark">
                            <li>本サービスの提供・運営のため</li>
                            <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
                            <li>ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当方が提供する他のサービスの案内のメールを送付するため</li>
                            <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
                            <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</li>
                            <li>上記の利用目的に付随する目的</li>
                        </ol>
                    </section>

                    <section className="mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 border-b border-gray-200 pb-2">第4条（利用目的の変更）</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-dark">
                            <li>当方は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。</li>
                            <li>利用目的の変更を行った場合には、変更後の目的について、当方所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。</li>
                        </ol>
                    </section>

                    <section className="mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 border-b border-gray-200 pb-2">第5条（個人情報の第三者提供）</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-dark">
                            <li>
                                当方は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                                    <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                                    <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
                                </ul>
                            </li>
                            <li>
                                前項の定めにかかわらず、次に掲げる場合には、当該情報の提供先は第三者に該当しないものとします。
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>当方が利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合</li>
                                    <li>合併その他の事由による事業の承継に伴って個人情報が提供される場合</li>
                                </ul>
                            </li>
                        </ol>
                    </section>

                    <section className="mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 border-b border-gray-200 pb-2">第6条（アクセス解析ツールについて）</h2>
                        <p className="text-gray-dark leading-relaxed">
                            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
                        </p>
                    </section>

                    <section className="mb-8 md:mb-12">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 border-b border-gray-200 pb-2">第7条（お問い合わせ窓口）</h2>
                        <p className="text-gray-dark leading-relaxed mb-4">
                            本ポリシーに関するお問い合わせは、お問い合わせフォームよりお願いいたします。
                        </p>
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
