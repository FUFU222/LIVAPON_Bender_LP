import nodemailer from 'nodemailer';
import { Booking, DateTimeSlot } from '@/types/booking';
import { format, parse } from 'date-fns';
import { ja } from 'date-fns/locale';
import { escapeHtml } from './security';

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

/**
 * 日時スロットを読みやすい形式にフォーマット
 */
function formatSlot(slot: DateTimeSlot): string {
  const date = parse(slot.date, 'yyyy-MM-dd', new Date());
  const formattedDate = format(date, 'M月d日(E)', { locale: ja });
  return `${formattedDate} ${slot.startTime}〜${slot.endTime}`;
}

/**
 * 管理者に新規予約通知を送信
 */
export async function notifyAdminNewBooking(booking: Booking): Promise<void> {
  const transporter = getTransporter();
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.error('ADMIN_EMAIL is not configured');
    return;
  }

  const preferredSlotsText = booking.preferredSlots
    .map((slot, i) => `  ${i + 1}. ${formatSlot(slot)}`)
    .join('\n');

  const approveUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/bookings?highlight=${booking.id}`;

  await transporter.sendMail({
    from: `"LIVAPON 予約システム" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject: `【新規面談予約】${booking.companyName} - ${booking.contactName}様`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #D63031; padding-bottom: 10px;">
          新規面談予約のお知らせ
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 10px; background: #f5f5f5; width: 120px; font-weight: bold;">会社名</td>
            <td style="padding: 10px;">${escapeHtml(booking.companyName)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">ご担当者名</td>
            <td style="padding: 10px;">${escapeHtml(booking.contactName)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">メールアドレス</td>
            <td style="padding: 10px;"><a href="mailto:${escapeHtml(booking.email)}">${escapeHtml(booking.email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; background: #f5f5f5; font-weight: bold;">お問い合わせ内容</td>
            <td style="padding: 10px;">${escapeHtml(booking.message || '').replace(/\n/g, '<br>')}</td>
          </tr>
        </table>
        
        <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #856404;">希望日時（優先順）</h3>
          <pre style="margin: 0; font-family: inherit;">${preferredSlotsText}</pre>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${approveUrl}" 
             style="display: inline-block; padding: 15px 40px; background: #D63031; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
            予約を確認・承認する
          </a>
        </div>
        
        <p style="color: #666; font-size: 12px; text-align: center;">
          このメールは LIVAPON 予約システムから自動送信されています。
        </p>
      </div>
    `,
  });
}

/**
 * ユーザーに予約確認メールを送信
 */
export async function notifyUserBookingReceived(booking: Booking): Promise<void> {
  const transporter = getTransporter();

  const preferredSlotsText = booking.preferredSlots
    .map((slot, i) => `  ${i + 1}. ${formatSlot(slot)}`)
    .join('\n');

  await transporter.sendMail({
    from: `"LIVAPON" <${process.env.SMTP_USER}>`,
    to: booking.email,
    subject: '【LIVAPON】面談予約を受け付けました',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #D63031; padding-bottom: 10px;">
          面談予約を受け付けました
        </h2>
        
        <p>${escapeHtml(booking.contactName)} 様</p>
        
        <p>
          この度は LIVAPON への面談予約をお申し込みいただき、誠にありがとうございます。<br>
          以下の内容で予約を受け付けました。
        </p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0;">ご希望日時</h3>
          <pre style="margin: 0; font-family: inherit;">${preferredSlotsText}</pre>
        </div>
        
        <p>
          担当者が確認の上、確定した日時をメールにてご連絡いたします。<br>
          通常1〜2営業日以内にご連絡いたしますので、今しばらくお待ちください。
        </p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="color: #666; font-size: 12px;">
          ※このメールは自動送信されています。<br>
          ※ご不明な点がございましたら、本メールにご返信ください。
        </p>
      </div>
    `,
  });
}

/**
 * ユーザーに予約承認通知を送信
 */
export async function notifyUserBookingApproved(
  booking: Booking,
  meetLink: string
): Promise<void> {
  const transporter = getTransporter();

  if (!booking.confirmedSlot) {
    throw new Error('Confirmed slot is required');
  }

  const confirmedSlotText = formatSlot(booking.confirmedSlot);

  await transporter.sendMail({
    from: `"LIVAPON" <${process.env.SMTP_USER}>`,
    to: booking.email,
    subject: '【LIVAPON】面談日時が確定しました',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #D63031; padding-bottom: 10px;">
          面談日時が確定しました
        </h2>
        
        <p>${booking.contactName} 様</p>
        
        <p>
          面談日時が確定しましたのでお知らせいたします。
        </p>
        
        <div style="background: #d4edda; border: 1px solid #28a745; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #155724;">確定日時</h3>
          <p style="font-size: 1.2em; margin: 0; font-weight: bold;">${confirmedSlotText}</p>
        </div>
        
        <div style="background: #e7f3ff; border: 1px solid #0d6efd; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #084298;">オンライン会議リンク</h3>
          <a href="${meetLink}" style="color: #0d6efd; word-break: break-all;">${meetLink}</a>
          <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #666;">
            ※開始時刻になりましたら、上記リンクからご参加ください。
          </p>
        </div>
        
        <h3>当日の流れ</h3>
        <ol>
          <li>開始5分前を目安に、上記リンクからご参加ください</li>
          <li>カメラ・マイクの動作確認をお願いいたします</li>
          <li>ご相談内容について詳しくお伺いします（約60分）</li>
        </ol>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="color: #666; font-size: 12px;">
          ※ご都合が悪くなった場合は、本メールにご返信ください。<br>
          ※このメールは自動送信されています。
        </p>
      </div>
    `,
  });
}

/**
 * ユーザーに予約拒否通知を送信
 */
export async function notifyUserBookingRejected(
  booking: Booking,
  reason?: string
): Promise<void> {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"LIVAPON" <${process.env.SMTP_USER}>`,
    to: booking.email,
    subject: '【LIVAPON】面談予約について',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #D63031; padding-bottom: 10px;">
          面談予約について
        </h2>
        
        <p>${booking.contactName} 様</p>
        
        <p>
          この度は面談予約をお申し込みいただき、誠にありがとうございます。<br>
          大変恐縮ではございますが、ご希望いただいた日時での面談が難しい状況となっております。
        </p>

        ${reason ? `
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>理由:</strong> ${escapeHtml(reason)}</p>
        </div>
        ` : ''}
        
        <p>
          お手数ですが、改めて別の日時で予約いただくか、直接メールにてご連絡いただけますと幸いです。
        </p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        
        <p style="color: #666; font-size: 12px;">
          ※ご不明な点がございましたら、本メールにご返信ください。
        </p>
      </div>
    `,
  });
}
