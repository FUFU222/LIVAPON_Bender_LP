# Design 02: Editorial Drive

現状の開発対象は Design 01（VariantA）です。本ドキュメントは Design 02 の参考資料として保持しています。

目的
- Design 02 をエディトリアル志向に刷新し、余白・コントラスト・レイヤーで「視点の流れ」を作る。
- 体験の密度を上げつつ、CTA までの導線を明確化。

実装先
- `app/components/variants/VariantB.tsx`

ビジュアル方向
- 紙質感 × インクのコントラスト。暖色ペーパーと深い黒で主役を引き立てる。
- 斜め構図・オーバーレイ・チケット風のラベルで“編集感”を強化。
- 大胆なタイポグラフィ + 緻密な小見出しでリズムを作る。

タイポグラフィ
- Display: Shippori Mincho (fallback: Noto Serif JP)
- Body: Zen Kaku Gothic New (fallback: Noto Sans JP)
- 目的: 大見出しに骨格を持たせ、本文は読みやすく制御。

主要トークン（VariantB 内 CSS 変数）
- --paper: #f7f1e8
- --ink: #13131a
- --accent: #c1121f
- --accent-2: #f4d35e
- --night: #0f1118

セクション別の要点
- Hero: 斜めの暗幕 + メッシュ + グリッド + ノイズで奥行き。ラベル/CTA/ティッカーで編集感。
- Intro: 暗背景 + 斜行カード配置。大きな番号で視覚的フック。
- Platform: タイムライン風のステップ表示。番号リングでステージ感。
- Live: 濃色背景に光の帯。RotatingText を主役としてステージ感。
- Proof: 数字の強調 + 斜行カードで“紙面”の動き。
- Online Seminar: 白背景カードで情報整理。FREEバッジ + 申し込みCTAで導線を強化。
- Contact: 波紋とライトなカードで余韻。

関連ドキュメント
- `docs/design-overview.md`（全体方針）
