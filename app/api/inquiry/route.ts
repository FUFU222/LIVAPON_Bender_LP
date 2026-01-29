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
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
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

    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error('SMTP is not configured');
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: Inquiry received', data);
        return NextResponse.json({ success: true });
      }
      return internalErrorResponse();
    }

    // SMTPが設定されている場合はメール送信
    {
      const transporter = getTransporter();

      await transporter.sendMail({
        from: `"LIVAPON LP" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        replyTo: safeEmailHeader,
        subject: `【お問い合わせ】${safeCompanyHeader} - ${safeNameHeader}様`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #D63031; padding-bottom: 10px;">
              新規お問い合わせ
            </h2>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; background: #f5f5f5; width: 120px; font-weight: bold;">会社名</td>
                <td style="padding: 10px;">${safeCompany}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">ご担当者名</td>
                <td style="padding: 10px;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">メールアドレス</td>
                <td style="padding: 10px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">お問い合わせ種別</td>
                <td style="padding: 10px;">${safeCategory}</td>
              </tr>
            </table>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px 0;">お問い合わせ内容</h3>
              <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
            </div>
            
            <p style="color: #666; font-size: 12px; text-align: center;">
              このメールは LIVAPON LP から自動送信されています。
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[CRITICAL] Error processing inquiry submission:', error);
    return internalErrorResponse();
  }
}
