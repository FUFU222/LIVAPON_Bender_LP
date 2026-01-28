# LIVAPON_Bender_LP

LIVAPON のクロスボーダー DX 支援サービスを紹介するための Next.js 製ランディングページです。ブランドコンセプトや問い合わせ導線を 1 つの App Router プロジェクト内にまとめ、モーションを多用した体験を提供します。

## コミュニケーション方針

- このリポジトリに関する会話・Issue・Pull Request・ドキュメントは **すべて日本語** で行ってください。
- **本セッションのやりとりも日本語で統一**します（英語での回答は行いません）。
- Codex を含む開発メンバーも日本語でのやり取りを前提とするため、報告や質問、コメントも日本語で記載しましょう。
- 英語が必要な場合は併記で構いませんが、日本語訳を必ず添えてください。

## ドキュメント運用ルール

- Markdown はすべて `docs/` ディレクトリに格納し、開発工程や機能のまとまり単位で適宜ファイルを追加します。
- ファイル名は **英小文字のkebab-case** を基本とし、内容が想像できる短い名前にします。
- 新しい機能を実装したら `docs/development-log.md` に日付・担当者・概要・関連ファイルを追記し、必要に応じて専用ドキュメントを作成してリンクしてください。
- 設計や要件の補足資料を増やす際もまず `docs/` に配置し、`docs/AGENTS.md` から参照できるよう更新します。

## ドキュメント索引

- `docs/development-log.md` — 機能単位の実装ログとテンプレート
- `docs/design-overview.md` — デザイン/体験設計の概要（現行実装準拠）
- `docs/content-structure.md` — 掲載内容の構成設計（Design 01）
- `docs/official-sponsor.md` — Japan Festival CANADA 公式スポンサー セクション仕様
- `docs/development-guidelines.md` — セッション運用/自動コミットのルール
- `docs/security.md` — セキュリティ状況（現行実装準拠）
- `docs/env-template.md` — `.env.local` 作成用テンプレート
- `docs/walkthrough.md` — 改善レポート（実装メモ）

## 主な機能

- お問い合わせフォーム：顧客情報を受け取り、メール通知を行います。
- 現在の開発対象：Design 01（Landing）のみ。他バリアントは削除済み。
- 先進表現：Canvas/WebGL ベースのロゴ演出やスクロール連動アニメーションを実装し、ブランドメッセージを印象的に提示します。
- セキュリティ強化：XSS 対策、レートリミット、機密値のサニタイズ方針を `docs/security.md` に整理しています。

## 開発環境セットアップ

1. リポジトリをクローン
   ```bash
   git clone https://github.com/FUFU222/LIVAPON_Bender_LP.git
   cd LIVAPON_Bender_LP
   ```
2. 依存関係をインストール
   ```bash
   npm install
   ```
3. 環境変数ファイルを作成
   - `docs/env-template.md` を参照して `.env.local` を用意し、SMTP 等を設定します。
4. 開発サーバーを起動
   ```bash
   npm run dev
   ```
5. `http://localhost:3000` を開いて動作を確認します。

### 利用可能なスクリプト

| コマンド        | 説明                               |
| --------------- | ---------------------------------- |
| `npm run dev`   | 開発サーバーをポート 3000 で起動   |
| `npm run build` | 本番ビルドを作成                   |
| `npm run start` | ビルド済みアプリを本番モードで起動 |
| `npm run lint`  | ESLint で静的解析を実行            |

## ディレクトリ概要

```
app/            # App Router配下のページ・API・UIコンポーネント
lib/            # バリデーション、通知、セキュリティ関連のユーティリティ
public/         # 画像・アイコンなどの静的アセット
docs/           # すべてのMarkdownドキュメント（AGENTS, 開発ログ, セキュリティ資料など）
```

## デプロイと運用

- Vercel でのデプロイを想定しています。`VERCEL` の Production 環境では `NODE_ENV=production` かつ `.env` に SMTP など必要な環境変数を設定してください。
- SMTP アカウントなど秘匿情報は Git に含めず、各環境で安全に注入します。
- 追加で必要な手順や運用ルールがあれば `docs/` 配下に追記し、`docs/AGENTS.md` からリンクしてください。

## 参考リンク

- [Next.js App Router ドキュメント](https://nextjs.org/docs/app) — このプロジェクトのベース技術。
- [Framer Motion](https://www.framer.com/motion/) — スクロール連動や UI アニメーションで利用。
- [Lenis](https://lenis.studiofreight.com/) — スムーススクロール制御で使用。

開発に関する質問やタスク共有は、必ず日本語で残してください。
