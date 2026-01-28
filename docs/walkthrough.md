# プロジェクト改善レポート（現行）

LIVAPON LPで実施した改善内容を、現行実装に合わせて整理したメモです。
セキュリティの詳細は `docs/security.md` を参照してください。

## 1. 実施内容（概要）

### セキュリティ
- 入力バリデーション、HTMLエスケープ、レートリミット、エラーハンドリングを実装。
- 詳細は `docs/security.md` に統合。

### アニメーション/表現
- **オープニングのローディング演出**
  - `app/components/landing/LoadingOverlay.tsx`
  - ロゴ＋波動＋タイピングで起動感を演出
- **SupportセクションのエディトリアルBento配置**
  - `app/components/landing/sections/SupportSection.tsx`
- **Threads の描画負荷最適化**
  - `app/components/canvas/Threads.tsx`
  - Intersection Observer で画面外描画を抑制
  - ライン本数/ノイズ処理の簡略化、DPR上限（1.5）

## 2. 主な変更ファイル

- `lib/security.ts`
- `lib/schemas.ts`
- `app/api/inquiry/route.ts`
- `app/components/landing/LoadingOverlay.tsx`
- `app/components/landing/sections/SupportSection.tsx`
- `app/components/canvas/Threads.tsx`

## 3. 今後の推奨事項

- [ ] 本番監視（レートリミット・メール送信状況）の可視化
