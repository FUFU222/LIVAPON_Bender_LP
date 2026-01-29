import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { inquirySchema } from '@/lib/schemas';
import {
  escapeHtml,
  sanitizeHeaderValue,
  checkRateLimit,
  rateLimitResponse,
  badRequestResponse,
  internalErrorResponse
} from '@/lib/security';

// メール送信用トランスポーター
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('SMTP_CONFIG_MISSING');
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user,
      pass,
    },
  });
}

// POST: 一般問い合わせを送信
export async function POST(request: NextRequest) {
  try {
    // 1. レートリミットチェック
    if (!checkRateLimit(request)) {
      return rateLimitResponse();
    }

    const body = await request.json();

    // 2. 厳格なバリデーション (Zod)
    const result = inquirySchema.safeParse(body);
    if (!result.success) {
      if (process.env.NODE_ENV === 'development') {
        const errorMessage = result.error.issues.map(e => e.message).join(', ');
        return badRequestResponse(errorMessage);
      }
      return badRequestResponse('入力内容に誤りがあります');
    }

    const data = result.data;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
      console.error('ADMIN_EMAIL is not configured');
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: Inquiry received', data);
        return NextResponse.json({ success: true });
      }
      return internalErrorResponse();
    }

    // 3. XSS対策: ユーザー入力をエスケープ
    const safeCompany = escapeHtml(data.company);
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeCategory = escapeHtml(data.category);
    const safeMessage = escapeHtml(data.message);
    const safeCompanyHeader = sanitizeHeaderValue(data.company);
    const safeNameHeader = sanitizeHeaderValue(data.name);
    const safeEmailHeader = sanitizeHeaderValue(data.email);

    // SMTP設定チェック
    try {
      const transporter = getTransporter();

      console.log(`[INFO] Attempting to send admin notification to: ${adminEmail}`);

      // 1. 管理者への通知
      const adminMailResult = await transporter.sendMail({
        from: `"LIVAPON LP" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        replyTo: safeEmailHeader,
        subject: `【お問い合わせ】${safeCompanyHeader} - ${safeNameHeader}様`,
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
            <div style="background-color: #D63031; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #fff; margin: 0; font-size: 24px;">LIVAPON お問い合わせ</h1>
            </div>
            
            <div style="padding: 30px; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px;">
              <h2 style="font-size: 18px; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #f5f5f5;">
                新規お問い合わせ内容
              </h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; width: 140px; color: #666; font-weight: bold;">会社名</td>
                  <td style="padding: 12px 0;">${safeCompany}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #666; font-weight: bold;">ご担当者名</td>
                  <td style="padding: 12px 0;">${safeName} 様</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #666; font-weight: bold;">メールアドレス</td>
                  <td style="padding: 12px 0;"><a href="mailto:${safeEmail}" style="color: #D63031;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #666; font-weight: bold;">お問い合わせ種別</td>
                  <td style="padding: 12px 0;">${safeCategory}</td>
                </tr>
              </table>
              
              <div style="margin-top: 30px; background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
                <h3 style="margin-top: 0; font-size: 16px; color: #D63031;">お問い合わせ内容</h3>
                <p style="margin-bottom: 0; white-space: pre-wrap;">${safeMessage}</p>
              </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
              このメールは LIVAPON LP システムから自動送信されています。
            </div>
          </div>
        `,
      });
      console.log(`[SUCCESS] Admin notification sent: ${adminMailResult.messageId}`);

      // 2. ユーザーへの自動返信
      console.log(`[INFO] Attempting to send auto-reply to user: ${safeEmailHeader}`);
      const userMailResult = await transporter.sendMail({
        from: `"LIVAPON" <${process.env.SMTP_USER}>`,
        to: safeEmailHeader,
        subject: `【LIVAPON】お問い合わせ内容の確認`,
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.8;">
            <div style="text-align: center; padding: 30px 0;">
              <div style="font-size: 28px; font-weight: bold; color: #D63031; letter-spacing: 2px;">LIVAPON</div>
              <div style="font-size: 12px; color: #999; margin-top: 4px; letter-spacing: 0.2em;">CROSS BORDER PLATFORM</div>
            </div>

            <div style="border-top: 4px solid #D63031; padding: 40px 30px; background-color: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
              <p style="font-size: 16px; margin-top: 0;">${safeName} 様</p>
              
              <p>この度はお問い合わせいただき、誠にありがとうございます。<br>
              LIVAPON 運営事務局でございます。</p>
              
              <p>送信いただいた内容は、現在担当者が確認しております。<br>
              2〜3営業日以内に改めてご連絡差し上げますので、恐れ入りますが今しばらくお待ちください。</p>
              
              <div style="margin: 40px 0; padding: 25px; background-color: #fcfcfc; border: 1px solid #f0f0f0; border-radius: 8px;">
                <h3 style="margin-top: 0; font-size: 14px; color: #D63031; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 20px;">お問い合わせ内容の控え</h3>
                <dl style="margin: 0;">
                  <dt style="font-weight: bold; color: #666; font-size: 13px;">会社名</dt>
                  <dd style="margin: 0 0 15px 0; font-size: 15px;">${safeCompany}</dd>
                  
                  <dt style="font-weight: bold; color: #666; font-size: 13px;">お問い合わせ種別</dt>
                  <dd style="margin: 0 0 15px 0; font-size: 15px;">${safeCategory}</dd>
                  
                  <dt style="font-weight: bold; color: #666; font-size: 13px;">内容</dt>
                  <dd style="margin: 0; font-size: 15px; white-space: pre-wrap;">${safeMessage}</dd>
                </dl>
              </div>

              <p style="font-size: 14px; color: #666;">
                万が一、一週間経っても返信がない場合は、大変お手数ですが本メールへの返信、または公式サイトより再度お問い合わせいただけますと幸いです。
              </p>
            </div>

            <div style="text-align: center; padding: 30px; color: #999;">
              <p style="font-size: 14px; margin: 0;">LIVAPON チーム</p>
              <p style="font-size: 12px; margin: 5px 0 0 0;">
                <a href="https://livapon-bender-lp.vercel.app" style="color: #999; text-decoration: none;">https://livapon-bender-lp.vercel.app</a>
              </p>
            </div>
          </div>
        `
      });
      console.log(`[SUCCESS] User auto-reply sent: ${userMailResult.messageId}`);

    } catch (err: any) {
      if (err.message === 'SMTP_CONFIG_MISSING') {
        console.warn('SMTP is not configured. Skipping email delivery.');
        if (process.env.NODE_ENV === 'development') {
          return NextResponse.json({ success: true, note: 'Mock success (no SMTP)' });
        }
        return internalErrorResponse();
      }
      throw err; // Go to catch-all
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[CRITICAL] Error processing inquiry submission:', error);
    return internalErrorResponse();
  }
}
