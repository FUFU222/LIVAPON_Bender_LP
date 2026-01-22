# デザイン/体験設計 概要

このドキュメントは、現在の実装（2026-01-19 時点）に合わせたデザイン方針と構成の要点をまとめたものです。
現在の開発対象は **Design 01（VariantA）** で、Design 02/03 は比較用の参考実装として残しています。

## 1. 現在の構成（実装ベース）

- **Design 01: Quiet Flux**
  - 実装: `app/components/variants/VariantA.tsx`
  - キーワード: 余白/静寂、赤のアクセント、映像ヒーロー、段階的な情報開示
- **Design 02: Editorial Drive**
  - 実装: `app/components/variants/VariantB.tsx`
  - キーワード: 紙質感/インク、エディトリアル構図、タイポの強弱（参考）
  - 詳細: `docs/design-variant-b.md`
- **Design 03: Live Pulse**
  - 実装: `app/components/variants/VariantC.tsx`
  - キーワード: ライトグラデーション、動画ヒーロー、スタックパネル演出（参考）

バリアント切り替えは `app/components/variants/LandingShowcase.tsx` に残っていますが、現在は **Design 01 を正準** として開発を進めています。

## 2. 共通コピー（実装と一致）

`app/components/variants/content.ts` に実装されている文言が正準です。
- メイン: **世界進出を、もっとシンプルに。**
- サブ: **「LIVEで語る」越境ECサービス**
- CTA: **まずは無料で相談する**

## 3. セクション構成（共通の流れ）

Design 01（現行運用）はおおむね以下の流れです。

1. Hero
2. Intro（悩みの提示）
3. 共通構造（視点の切り替え）
4. Support（LIVAPONが支援すること）
5. Platform（仕組み）
6. Live（熱量）
7. Proof（実績・数字）
8. Divider（ロゴ演出）
9. Online Seminar（無料説明会告知）
10. Entry/Contact（CTA + フォーム）

Design 03 は「課題提示 → 共通構造 → ライブコマース → オンライン説明会 → 相談CTA」の流れで構成します（参考）。
詳細は `docs/content-structure.md` を参照してください。

## 4. 技術スタック（UI/モーション）

- **CSS**: Tailwind CSS
- **モーション**: Framer Motion
- **スムーススクロール**: Lenis
- **WebGL表現**: OGL（Threads）
- **フォント**: `next/font/google` で読み込み

※ GSAP / ScrollTrigger / Lucide React は現在の実装には含まれていません。

## 5. タイポグラフィ

- グローバル: Noto Sans JP / Noto Serif JP
  - 実装: `app/layout.tsx`, `app/globals.css`
- Design 02: Shippori Mincho + Zen Kaku Gothic New を強調
  - 実装: `VariantB.tsx` の `.design02` スタイル

## 6. 体験設計の方針

- **内容優先**: コピーの視認性と読みのテンポを最優先
- **静と熱の対比**: 静的な構成の中で Live セクションのみ動きを強調
- **余白と導線**: CTA までの視線誘導を明確に

具体的なアニメーションや構図の詳細は、Design 01 の実装（`VariantA.tsx`）に準拠します。
