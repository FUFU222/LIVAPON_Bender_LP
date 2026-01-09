import { z } from 'zod';

/**
 * 問い合わせフォームのスキーマ
 */
export const inquirySchema = z.object({
    company: z.string().min(1, '会社名は必須です').max(100, '会社名が長すぎます'),
    name: z.string().min(1, 'お名前は必須です').max(50, 'お名前が長すぎます'),
    email: z.string().email('無効なメールアドレスです').max(100, 'メールアドレスが長すぎます'),
    message: z.string().min(1, 'お問い合わせ内容は必須です').max(2000, 'お問い合わせ内容は2000文字以内で入力してください'),
});

/**
 * 予約申込みフォームのスキーマ
 */
export const bookingSchema = z.object({
    companyName: z.string().min(1, '会社名は必須です').max(100, '会社名が長すぎます'),
    contactName: z.string().min(1, '担当者名は必須です').max(50, '担当者名が長すぎます'),
    email: z.string().email('無効なメールアドレスです').max(100, 'メールアドレスが長すぎます'),
    phone: z.string().max(20, '電話番号が長すぎます').optional().or(z.literal('')),
    message: z.string().max(1000, 'メッセージは1000文字以内で入力してください').optional().or(z.literal('')),
    preferredSlots: z.array(z.object({
        date: z.string(),
        startTime: z.string(),
        endTime: z.string(),
    })).min(1, '希望日時を少なくとも1つ選択してください').max(3, '希望日時は最大3つまでです'),
});

/**
 * 予約拒否のスキーマ
 */
export const rejectionSchema = z.object({
    reason: z.string().min(1, '拒否理由は必須です').max(500, '理由は500文字以内で入力してください'),
});
