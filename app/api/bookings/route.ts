import { NextRequest, NextResponse } from 'next/server';
import { createBooking, getAllBookings, getBookingsByStatus } from '@/lib/booking-store';
import { notifyAdminNewBooking, notifyUserBookingReceived } from '@/lib/notifications';
import { BookingResponse } from '@/types/booking';
import { bookingSchema } from '@/lib/schemas';
import {
    verifyAdminAuth,
    unauthorizedResponse,
    checkRateLimit,
    rateLimitResponse,
    badRequestResponse,
    internalErrorResponse
} from '@/lib/security';

// GET: 予約一覧を取得（管理者用）
export async function GET(request: NextRequest) {
    try {
        // 1. 管理者認証チェック
        if (!verifyAdminAuth(request)) {
            return unauthorizedResponse();
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        const bookings = status
            ? getBookingsByStatus(status as 'pending' | 'approved' | 'rejected' | 'cancelled')
            : getAllBookings();

        return NextResponse.json({ bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return internalErrorResponse();
    }
}

// POST: 新規予約を作成
export async function POST(request: NextRequest) {
    try {
        // 1. レートリミットチェック
        if (!checkRateLimit(request)) {
            return rateLimitResponse();
        }

        const body = await request.json();

        // 2. 厳格なバリデーション (Zod)
        const result = bookingSchema.safeParse(body);
        if (!result.success) {
            const errorMessage = result.error.issues.map(e => e.message).join(', ');
            return badRequestResponse(errorMessage);
        }

        // 予約を作成
        const booking = createBooking(result.data);

        // 通知を送信（非同期で実行）
        Promise.all([
            notifyAdminNewBooking(booking),
            notifyUserBookingReceived(booking),
        ]).catch(err => {
            console.error('Error sending notifications:', err);
        });

        const response: BookingResponse = {
            success: true,
            booking,
        };

        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        console.error('Error creating booking:', error);
        return internalErrorResponse();
    }
}
