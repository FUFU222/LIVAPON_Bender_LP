# Japan Festival CANADA 公式スポンサー セクション（現行実装）

LIVAPON が **Japan Festival CANADA の公式スポンサー** であることを明確に伝えるためのセクション仕様です。
現行実装に合わせてテキスト・構成を整理しています。

## 目的

- 「公式スポンサー」という肩書きを**記号化**して強く見せる
- 説明的な文章を減らし、**感じる／伝わる**方向へ短文化
- 写真を単なる背景ではなく**演出装置**として使う

## 掲載文言（現行）

- **バッジ**: `OFFICIAL SPONSOR`
- **見出し**: `Japan Festival CANADA`
- **リード**: `世界の熱量が集まる場所から、日本の価値を届ける。`
- **箇条書き**
  - `現地の熱量とリアルにつながる`
  - `ライブ×越境でブランドを語る`
  - `オンラインだけに頼らない販売導線`
- **CTA**: `Japan Festival CANADA 参加について相談する`
- **ロゴキャプション**: `Japan Festival CANADA 公式ロゴ`

## レイアウト

- 左側: 会場写真を背景にしたブロック（黒→透明のグラデーションで可読性確保）
- 右側: 白背景ブロックに公式ロゴを大きく配置
- 直前に短い導入セクションを配置  
  `すでに舞台は用意されています`（BlurTextで出現）

## 使用アセット

- 背景写真: `public/japan-festival-canada-bg.png`
- 公式ロゴ: `public/japan-festival-canada-logo.png`

## 実装参照

- セクション本体: `app/components/variants/VariantA.tsx`
- 文言定義: `app/components/variants/content.ts`
