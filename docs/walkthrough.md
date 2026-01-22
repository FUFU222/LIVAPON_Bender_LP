# プロジェクト改善レポート

LIVAPON LPで実施したセキュリティ強化・アニメーション改善を、現行実装に合わせて整理したメモです。
詳細なセキュリティ状況は `docs/security.md` を参照してください。

## 1. 実施内容（概要）

### セキュリティ
- 管理者APIのAPIキー認証、入力バリデーション、HTMLエスケープ、レートリミット、エラーハンドリングを実装。
- 詳細は `docs/security.md` に統合。

### アニメーション/表現
- **DividerSection のスクロール演出**
  - `app/components/sections/DividerSection.tsx`
  - `220vh` のスクロール領域 + `sticky` 固定
  - `useScroll` + `useTransform` でスケール（0.9→10）と透明度（1→0）を制御

- **Threads の描画負荷最適化**
  - `app/components/canvas/Threads.tsx`
  - Intersection Observer で画面外描画を抑制
  - ライン本数/ノイズ処理の簡略化、DPR上限（1.5）

## 2. 主な変更ファイル

- `lib/security.ts`
- `lib/schemas.ts`
- `app/api/inquiry/route.ts`
- `app/api/bookings/route.ts`
- `app/api/bookings/[id]/approve/route.ts`
- `app/api/bookings/[id]/reject/route.ts`
- `lib/notifications.ts`
- `app/components/sections/DividerSection.tsx`
- `app/components/canvas/Threads.tsx`

## 3. 今後の推奨事項

- [ ] データベース導入による永続化（SupabaseやPostgreSQL等）
- [ ] 管理画面の認証/認可設計（セッション/NextAuth等）
- [ ] 本番監視（レートリミット・メール送信状況）の可視化

> **重要**: `.env.local` に `ADMIN_API_KEY` を設定しない場合、管理APIは拒否されます。
