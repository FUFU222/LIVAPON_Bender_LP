import { NextRequest, NextResponse } from 'next/server';
import { getBookingById, updateBooking } from '@/lib/booking-store';
import { notifyUserBookingRejected } from '@/lib/notifications';
import { rejectionSchema } from '@/lib/schemas';
import {
    verifyAdminAuth,
    unauthorizedResponse,
    badRequestResponse,
    internalErrorResponse
} from '@/lib/security';

type RouteContext = { params: Promise<{ id: string }> };

// POST: 予約を拒否
export async function POST(
    request: NextRequest,
    { params }: RouteContext
) {
    try {
        // 1. 管理者認証チェック
        if (!verifyAdminAuth(request)) {
            return unauthorizedResponse();
        }

        const { id } = await params;
        const body = await request.json();

        // 2. 厳格なバリデーション (Zod)
        const result = rejectionSchema.safeParse(body);
        if (!result.success) {
            const errorMessage = result.error.issues.map(e => e.message).join(', ');
            return badRequestResponse(errorMessage);
        }

        // 予約を取得
        const booking = getBookingById(id);
        if (!booking) {
            return NextResponse.json(
                { error: '予約が見つかりません', success: false },
                { status: 404 }
            );
        }

        if (booking.status !== 'pending') {
            return NextResponse.json(
                { error: 'この予約は既に処理されています', success: false },
                { status: 400 }
            );
        }

        // 予約を更新
        const updatedBooking = updateBooking(id, {
            status: 'rejected',
            adminNotes: result.data.reason,
        });

        // ユーザーに通知
        notifyUserBookingRejected(updatedBooking!, result.data.reason).catch(err => {
            console.error('Error sending rejection notification:', err);
        });

        return NextResponse.json({
            success: true,
            booking: updatedBooking,
        });
    } catch (error) {
        console.error('Error rejecting booking:', error);
        return internalErrorResponse();
    }
}
