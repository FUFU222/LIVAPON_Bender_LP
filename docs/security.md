# セキュリティ状況（現行実装）

このドキュメントは、現在の実装（2026-01-15 時点）に合わせたセキュリティ対策と留意点を整理したものです。

## 1. 実装済みの対策

- **管理者APIの認証**
  - `x-api-key` ヘッダーと `ADMIN_API_KEY` を照合
  - 対象: `GET /api/bookings`, `POST /api/bookings/[id]/approve`, `POST /api/bookings/[id]/reject`
  - 実装: `lib/security.ts`

- **入力バリデーション（Zod）**
  - 問い合わせ/予約/拒否理由のスキーマ検証
  - 実装: `lib/schemas.ts`, `app/api/inquiry/route.ts`, `app/api/bookings/*`

- **HTMLエスケープ（XSS対策）**
  - メール本文/通知文に挿入するユーザー入力を `escapeHtml` で無害化
  - 実装: `lib/security.ts`, `lib/notifications.ts`, `app/api/inquiry/route.ts`

- **簡易レートリミット**
  - IPごとに 1時間 10回まで（インメモリ）
  - 対象: `POST /api/inquiry`, `POST /api/bookings`
  - 実装: `lib/security.ts`

- **安全なエラーレスポンス**
  - 例外詳細をクライアントに返さない統一レスポンス
  - 実装: `lib/security.ts`

## 2. 現状の留意点（未対応/要設計）

- **管理画面の認証/認可**
  - 管理APIは `x-api-key` 前提だが、`app/admin/bookings` はクライアント実装のためヘッダー送信ができない。
  - 現状のままでは管理画面の API 呼び出しが 401 になるため、
    1) サーバー側での認証済みプロキシ化、または
    2) 管理UIの認証方式（セッション/NextAuth等）
    を別途設計する必要がある。

- **予約データの永続化**
  - 予約はインメモリ `Map` で保持され、再起動やスケールアウトで消失。
  - 本番運用は DB（Supabase/PostgreSQL 等）への移行が前提。

- **レートリミットの強度**
  - インメモリのため複数インスタンスでは効かない。
  - 本番では Redis 等の集中ストア化が推奨。

## 3. 関連ファイル

- `lib/security.ts`
- `lib/schemas.ts`
- `app/api/inquiry/route.ts`
- `app/api/bookings/route.ts`
- `app/api/bookings/[id]/approve/route.ts`
- `app/api/bookings/[id]/reject/route.ts`
- `lib/notifications.ts`
