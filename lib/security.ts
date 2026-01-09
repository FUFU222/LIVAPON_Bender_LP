import 'server-only';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 1. HTMLエスケープ処理 (XSS対策)
 */
export function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * 2. 管理者認証 (API Keyチェック)
 */
export function verifyAdminAuth(request: NextRequest) {
    const apiKey = request.headers.get('x-api-key');
    const validApiKey = process.env.ADMIN_API_KEY;

    if (!validApiKey) {
        // 設定されていない場合はエラーを出す（セキュリティのためデフォルトは拒絶）
        console.error('ADMIN_API_KEY is not set in environment variables');
        return false;
    }

    return apiKey === validApiKey;
}

/**
 * 3. 簡易インメモリ・レートリミット
 */
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const WINDOW_SIZE = 60 * 60 * 1000; // 1時間
const MAX_REQUESTS = 10; // 1時間に10回まで（LPのフォームとしては十分）

export function checkRateLimit(request: NextRequest): boolean {
    // 開発環境ではスキップ（任意）
    if (process.env.NODE_ENV === 'development') return true;

    const ip = (request as any).ip || request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowData = rateLimitMap.get(ip);

    if (!windowData || now - windowData.lastReset > WINDOW_SIZE) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
        return true;
    }

    if (windowData.count >= MAX_REQUESTS) {
        return false;
    }

    windowData.count += 1;
    return true;
}

/**
 * 4. セキュリティレスポンスユーティリティ
 */
export function unauthorizedResponse() {
    return NextResponse.json(
        { error: 'Unauthorized: Access denied', success: false },
        { status: 401 }
    );
}

export function rateLimitResponse() {
    return NextResponse.json(
        { error: 'Too many requests: Please try again later', success: false },
        { status: 429 }
    );
}

export function badRequestResponse(message: string) {
    return NextResponse.json(
        { error: message, success: false },
        { status: 400 }
    );
}

export function internalErrorResponse() {
    // 本番環境では詳細を隠す
    return NextResponse.json(
        { error: 'An unexpected error occurred', success: false },
        { status: 500 }
    );
}
