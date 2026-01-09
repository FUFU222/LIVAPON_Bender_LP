# LIVAPON Cross Border Platform - 環境変数設定

# ====================================
# Google Calendar API
# ====================================
# Google Cloud Console で OAuth 2.0 認証情報を作成してください
# https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token

# 空き時間を取得する対象のカレンダーID（通常はGmailアドレス）
GOOGLE_CALENDAR_ID=admin@example.com

# ====================================
# Email Settings (SMTP)
# ====================================
# Gmail を使用する場合、アプリパスワードを生成してください
# https://myaccount.google.com/apppasswords
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# 管理者通知メールの送信先
ADMIN_EMAIL=admin@example.com

# ====================================
# Application Settings
# ====================================
# 本番環境のベースURL（メール内リンクに使用）
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# ====================================
# Database (オプション - 将来の拡張用)
# ====================================
# DATABASE_URL=your-database-url
