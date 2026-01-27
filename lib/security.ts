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
 * 1.5. ヘッダー用のサニタイズ（CRLFインジェクション対策）
 */
export function sanitizeHeaderValue(str: string): string {
    return str.replace(/[\r\n]+/g, ' ').trim();
}

/**
 * 2. 簡易インメモリ・レートリミット
 */
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const WINDOW_SIZE = 60 * 60 * 1000; // 1時間
const MAX_REQUESTS = 10; // 1時間に10回まで（LPのフォームとしては十分）

export function checkRateLimit(request: NextRequest): boolean {
    // 開発環境ではスキップ（任意）
    if (process.env.NODE_ENV === 'development') return true;

    const ip = getClientIp(request);
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

function getClientIp(request: NextRequest): string {
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0]?.trim() || 'unknown';
    }
    const realIp = request.headers.get('x-real-ip');
    if (realIp) return realIp;
    const cfIp = request.headers.get('cf-connecting-ip');
    if (cfIp) return cfIp;
    return 'unknown';
}

/**
 * 3. セキュリティレスポンスユーティリティ
 */
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
