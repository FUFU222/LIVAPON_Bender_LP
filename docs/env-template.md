# LIVAPON_Bender_LP 環境変数テンプレート

以下を `.env.local` にコピーし、各値を自分の環境に合わせて設定してください。Googleカレンダー連携にはサービスアカウントを利用します。

## Google Calendar API (Service Account)
1. Google Cloud Console でプロジェクトを作成し、Calendar API を有効化します。
2. サービスアカウントを作成し、秘密鍵 (JSON) を発行します。
3. 対象の Google Calendar をサービスアカウントのメールアドレスと共有し、予定の参照/編集権限を付与します。

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=calendar-owner@example.com    # 予約を登録するカレンダーID
GOOGLE_CALENDAR_TIMEZONE=Asia/Tokyo              # 任意（デフォルト: Asia/Tokyo）
GOOGLE_BOOKING_WINDOW_DAYS=14                    # 何日先まで候補を出すか
GOOGLE_BOOKING_START_OFFSET_DAYS=1               # 何日後から予約を受け付けるか
GOOGLE_SLOT_DURATION_MINUTES=60                  # 1枠の長さ（分）
GOOGLE_BUSINESS_START_HOUR=10                    # 営業開始時刻（24時間表記）
GOOGLE_BUSINESS_END_HOUR=18                      # 営業終了時刻
GOOGLE_ALLOW_WEEKEND_BOOKINGS=false              # trueで土日も候補に含める
```

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
ADMIN_API_KEY=change-me
```

## 将来の拡張用（任意）
```
# DATABASE_URL=postgres://user:pass@host:5432/dbname
```

値を更新したらサーバーを再起動し、`npm run dev` やデプロイ環境で反映されていることを確認してください。
