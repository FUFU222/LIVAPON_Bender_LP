# LIVAPON LP｜構成設計（現行）

本ドキュメントは **Design 01（Landing）** の現行実装に合わせた構成です。
文言は `app/components/landing/content.ts` の実装を正とします。

## 00_オープニング（Loading）

- FV動画の読み込み中にロゴ＋波動＋タイピングを表示
- ロゴ: `public/livapon_symbol_new.png`
- 波動: ロゴ中心から画面外まで拡がるリング
- タイピング: `LOADING` / `LIVAPON`

## 01_FV（Hero）

- ラベル: `LIVAPON CROSS BORDER PLATFORM`
- キャッチコピー: **世界進出を、もっとシンプルに。**
- サブコピー: 「LIVEで語る」越境ECサービス
- メインCTA: **海外展開の相談をする**
- 背景: `public/FV_bg_movie.mp4`

## 02_課題提示（Intro）

- セクション見出し: 海外展開が伸び悩む / 5つの理由
- サブテキスト: こんなお悩みありませんか？
- 課題カード（タイトル＋心の声）
  - 言語・文化の壁 / 世界観がうまく伝わらない…
  - 決済・物流の複雑さ / 社内工数がどんどん増える…
  - 集客コストの増大 / 広告費がかさむ…
  - 顧客の反応が不明 / 次の打ち手が見えない…
  - ファン形成の難しさ / ブランドが育っていかない…

## 03_共通認識の提示

- テキスト: `実は…多くのブランドやメーカーが / 同じところでつまずいています`
- PCは2行、モバイルは階段状の改行＋左揃え
- ScrollFloat（GSAP）で文字が落ちる演出

## 04_SUPPORT（LIVAPONが叶える海外進出）

- セクション見出し: **LIVAPONが叶える海外進出**
- リード: **“売る”より先に、“伝わる”体験を**
- Feature（交互レイアウト＋背景画像）
  1. 海外向けライブ配信 / 公式ライバーが世界へアプローチ
  2. 越境をもっと身近に / 決済・物流まで“国内感覚”で
  3. データ蓄積・改善 / ライブコマースのコメントや購入者情報をマーケティングに活用
- Bento UI（エディトリアル配置）
  - 0円（初期費用 / 手数料）
  - 228 の国と地域へ
  - 国内配送感覚（全面画像）
  - EC掲載のみでも OK！
  - 国別の出品可否を事前確認（背景画像）
  - 少量ロットから小さく始められる
  - Instagram導線（`instagramを見る`）

## 05_前置きメッセージ

- テキスト: `すでに舞台は用意されています`
- BlurText（1文字ずつ落下）

## 06_OFFICIAL SPONSOR

- セクションタイトル: Japan Festival CANADA
- バッジ: OFFICIAL E-COMMERCE SPONSOR
- リード: あなたのブランドを"世界"と接続する
- 背景: 会場写真 + 左側グラデーション / 右側白パネル
- ロゴ: `public/japan-festival-canada-logo.png`
- 詳細: `docs/official-sponsor.md`

## 07_LIVE（熱量）

- 見出し演出: Deliver / RotatingText（LIVE / NIPPON）
- サブコピー: 世界ではすでに、ライブが「売れる場所」に。
- 3つの説明ブロック（liveHighlights）

## 08_BRIDGE（ブリッジ）

- 見出し: 縦書き「いつか自分も」＋「と思った方へ」
- 文章: LIVAPONでは、海外販売やライブコマースについて基礎から整理できる説明会を行っています。
- 背景: `public/bridge-image.png`
- 下部にスクロール誘導の矢印

## 09_オンライン説明会

- タイトル: 【無料】越境EC「LIVAPON」オンライン合同説明会
- 説明: Made in Japanを世界へ。海外販売の仕組みやライブコマース戦略を解説します。初心者の方も大歓迎です。
- 日時: 毎週水曜日 17:00〜18:00
- CTA: 詳細・申し込みはこちら（Peatix）

## 10_FAQ

- アコーディオン（単一オープン）
- Q/A 表記（番号なし）

## 11_お問い合わせ

- 見出し: お問い合わせ
- サブ: 導入・提携に関するご相談はこちらから
- フォーム: `CTAForm`（入力フォームはこのセクションのみ）

## Footer

- 会社情報 / プライバシーポリシー / 利用規約
- コピーライト（年はクライアント側で更新）

## 実装参照

- `app/components/landing/LandingContent.tsx`
- `app/components/landing/content.ts`
- `app/components/landing/sections/IntroProblemsSection.tsx`
- `app/components/landing/sections/CommonRecognitionSection.tsx`
- `app/components/landing/sections/SupportSection.tsx`
- `app/components/landing/sections/BridgeSection.tsx`
- `app/components/landing/sections/OfficialSponsorSection.tsx`
- `app/components/landing/sections/FaqSection.tsx`
- `app/components/forms/CTAForm.tsx`
