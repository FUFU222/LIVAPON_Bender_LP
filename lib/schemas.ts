import { z } from 'zod';

/**
 * 問い合わせフォームのスキーマ
 */
export const inquirySchema = z.object({
    company: z.string().trim().min(1, '会社名は必須です').max(100, '会社名が長すぎます'),
    name: z.string().trim().min(1, 'お名前は必須です').max(50, 'お名前が長すぎます'),
    email: z.string().trim().email('無効なメールアドレスです').max(100, 'メールアドレスが長すぎます'),
    category: z.preprocess(
        (value) => (typeof value === 'string' ? value.trim() : value),
        z.enum([
            '導入相談',
            '出店/掲載について',
            'Japan Festival CANADA について',
            '連携/協業',
            'メディア/取材',
            'その他',
        ], {
            required_error: 'お問い合わせ種別を選択してください',
            invalid_type_error: 'お問い合わせ種別を選択してください',
        })
    ),
    message: z.string().trim().min(1, 'お問い合わせ内容は必須です').max(2000, 'お問い合わせ内容は2000文字以内で入力してください'),
});
