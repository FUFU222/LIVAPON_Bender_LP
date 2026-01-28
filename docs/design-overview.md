# デザイン/体験設計 概要（現行）

本ドキュメントは、現在の実装（Design 01 / Landing）に合わせたデザイン方針の要点をまとめたものです。
他バリアントは削除済みで、**Landing が唯一の正準**です。

## 1. 方向性

- **静と熱の対比**: 余白の静けさの中に、ライブの熱量を差し込む
- **短文・強調の設計**: 読ませるよりも「感じさせる」構成
- **導線の明確化**: 相談/問い合わせを主軸に

## 2. セクション構成（現行）

1. オープニング（Loading）
2. Hero（動画背景＋強いコピー）
3. 課題提示（5つの理由カード）
4. 共通認識テキスト（ScrollFloat）
5. Support（LIVAPONが叶える海外進出）
6. 前置きメッセージ（BlurText）
7. Japan Festival CANADA 公式スポンサー
8. Live（Deliver / LIVE NIPPON）
9. Bridge（縦書きメッセージ＋スクロール誘導）
10. オンライン説明会
11. FAQ（アコーディオン）
12. お問い合わせ

詳細は `docs/content-structure.md` を参照してください。

## 3. ビジュアルの特徴

- **オープニング**: ロゴ＋波動＋タイピングで“起動”を表現
- **Hero**: 映像背景 + 立体的なタイポ
- **課題カード**: 写真 + テキスト帯（黒帯/白帯）で可読性確保
- **共通認識**: ScrollFloatで文字が落ちる演出（モバイルは階段状）
- **Support**: 交互レイアウト＋カーテンリビール、Bentoはエディトリアル配置
- **公式スポンサー**: 左に演出写真、右に白パネルで公式ロゴを大きく配置
- **Live**: RotatingText＋3ケースのカード
- **Bridge**: 縦書きタイポ＋背景画像＋矢印アニメーション

## 4. 技術スタック（UI/モーション）

- **CSS**: Tailwind CSS
- **モーション**: Framer Motion
- **スクロール演出**: GSAP + ScrollTrigger（ScrollFloat）
- **スムーススクロール**: Lenis
- **WebGL**: OGL（MetaBalls）
- **フォント**: `next/font/google`（Noto Sans/Serif、Shippori Mincho、Zen Kaku Gothic、Oswald）

## 5. 主要実装ファイル

- `app/components/landing/LandingPage.tsx`
- `app/components/landing/LandingContent.tsx`
- `app/components/landing/LoadingOverlay.tsx`
- `app/components/landing/content.ts`
- `app/components/landing/sections/IntroProblemsSection.tsx`
- `app/components/landing/sections/CommonRecognitionSection.tsx`
- `app/components/landing/sections/SupportSection.tsx`
- `app/components/landing/sections/BridgeSection.tsx`
- `app/components/landing/sections/OfficialSponsorSection.tsx`
- `app/components/landing/sections/FaqSection.tsx`
- `app/components/ui/ScrollFloat.tsx`
- `app/components/ui/BlurText.tsx`
- `app/components/layout/FloatingCTA.tsx`
