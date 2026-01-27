# セキュリティ状況（現行実装）

このドキュメントは、現在の実装（2026-01-27 時点）に合わせたセキュリティ対策と留意点を整理したものです。

## 1. 実装済みの対策

- **入力バリデーション（Zod）**
  - 問い合わせのスキーマ検証
  - 実装: `lib/schemas.ts`, `app/api/inquiry/route.ts`

- **HTMLエスケープ（XSS対策）**
  - メール本文に挿入するユーザー入力を `escapeHtml` で無害化
  - 実装: `lib/security.ts`, `app/api/inquiry/route.ts`

- **簡易レートリミット**
  - IPごとに 1時間 10回まで（インメモリ）
  - 対象: `POST /api/inquiry`
  - 実装: `lib/security.ts`

- **安全なエラーレスポンス**
  - 例外詳細をクライアントに返さない統一レスポンス
  - 実装: `lib/security.ts`

## 2. 現状の留意点（未対応/要設計）

- **レートリミットの強度**
  - インメモリのため複数インスタンスでは効かない。
  - 本番では Redis 等の集中ストア化が推奨。

## 3. 関連ファイル

- `lib/security.ts`
- `lib/schemas.ts`
- `app/api/inquiry/route.ts`
