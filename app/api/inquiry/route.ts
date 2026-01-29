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

      // 1. 管理者への通知
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

      // 2. ユーザーへの自動返信
      await transporter.sendMail({
        from: `"LIVAPON" <${process.env.SMTP_USER}>`,
        to: safeEmailHeader,
        subject: `【LIVAPON】お問い合わせありがとうございます`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <p>${safeName} 様</p>
            <p>この度はお問い合わせいただき、誠にありがとうございます。<br>
            内容を確認し、担当者より順次ご連絡差し上げます。</p>
            
            <div style="border: 1px solid #eee; padding: 15px; margin: 20px 0;">
              <p style="margin-top: 0; font-weight: bold; border-bottom: 1px solid #eee; padding-bottom: 5px;">お問い合わせ内容控え</p>
              <p style="margin: 5px 0;">会社名: ${safeCompany}</p>
              <p style="margin: 5px 0;">種別: ${safeCategory}</p>
              <p style="margin: 15px 0; white-space: pre-wrap;">${safeMessage}</p>
            </div>
            
            <p>しばらくお待ちいただけますようお願い申し上げます。</p>
            
            <p style="border-top: 1px solid #eee; padding-top: 10px; font-size: 14px;">
              LIVAPON 運営チーム<br>
              <a href="https://livapon-bender-lp.vercel.app">https://livapon-bender-lp.vercel.app</a>
            </p>
          </div>
        `
      });

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
