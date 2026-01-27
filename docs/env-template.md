# LIVAPON_Bender_LP 環境変数テンプレート

以下を `.env.local` にコピーし、各値を自分の環境に合わせて設定してください。

## メール送信 (SMTP)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@example.com
```

## アプリ設定
```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 将来の拡張用（任意）
```
# DATABASE_URL=postgres://user:pass@host:5432/dbname
```

値を更新したらサーバーを再起動し、`npm run dev` やデプロイ環境で反映されていることを確認してください。
