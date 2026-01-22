# デザイン/体験設計 概要（現行）

本ドキュメントは、現在の実装（Design 01 / VariantA）に合わせたデザイン方針の要点をまとめたものです。
他バリアントは削除済みで、**VariantA が唯一の正準**です。

## 1. 方向性

- **静と熱の対比**: 余白の静けさの中に、ライブの熱量を差し込む
- **短文・強調の設計**: 読ませるよりも「感じさせる」構成
- **導線の明確化**: 相談/問い合わせを主軸に

## 2. セクション構成（現行）

1. Hero（動画背景＋強いコピー）
2. 課題提示（5つの理由カード）
3. 共通認識テキスト（ScrollFloat）
4. Support（LIVAPONが叶える海外進出）
5. 前置きメッセージ（BlurText）
6. Japan Festival CANADA 公式スポンサー
7. Live（Deliver / LIVE NIPPON）
8. オンライン説明会
9. FAQ（アコーディオン）
10. お問い合わせ

詳細は `docs/content-structure.md` を参照してください。

## 3. ビジュアルの特徴

- **Hero**: 映像背景 + 立体的なタイポ
- **課題カード**: 写真 + テキスト帯（黒帯/白帯）で可読性確保
- **共通認識**: ScrollFloatで文字が落ちる演出（モバイルは階段状）
- **Support**: 背景画像を大きく使った交互レイアウト＋カーテンリビール
- **公式スポンサー**: 左に演出写真、右に公式ロゴを大きく配置
- **FAQ**: 1件のみ開くアコーディオン、滑らかな開閉

## 4. 技術スタック（UI/モーション）

- **CSS**: Tailwind CSS
- **モーション**: Framer Motion
- **スクロール演出**: GSAP + ScrollTrigger（ScrollFloat）
- **スムーススクロール**: Lenis
- **WebGL**: OGL（ロゴ演出）
- **フォント**: `next/font/google`（Noto Sans/Serif、Shippori Mincho、Zen Kaku Gothic、Oswald）

## 5. 主要実装ファイル

- `app/components/variants/VariantA.tsx`
- `app/components/variants/content.ts`
- `app/components/ui/ScrollFloat.tsx`
- `app/components/ui/BlurText.tsx`
- `app/components/layout/FloatingCTA.tsx`

