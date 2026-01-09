import { NextRequest, NextResponse } from 'next/server';
import { getBookingById, updateBooking } from '@/lib/booking-store';
import { createCalendarEvent } from '@/lib/google-calendar';
import { notifyUserBookingApproved } from '@/lib/notifications';
import { ApproveBookingRequest } from '@/types/booking';
import {
    verifyAdminAuth,
    unauthorizedResponse,
    internalErrorResponse
} from '@/lib/security';

type RouteContext = { params: Promise<{ id: string }> };

// POST: 予約を承認
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
        const body: ApproveBookingRequest = await request.json();

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

        // 選択されたスロットを取得
        const selectedSlot = booking.preferredSlots[body.selectedSlotIndex];
        if (!selectedSlot) {
            return NextResponse.json(
                { error: '無効なスロットが選択されました', success: false },
                { status: 400 }
            );
        }

        let meetLink = '';

        // Google Calendarにイベントを作成
        try {
            const result = await createCalendarEvent(selectedSlot, {
                companyName: booking.companyName,
                contactName: booking.contactName,
                email: booking.email,
            });
            meetLink = result.meetLink;
        } catch (calendarError) {
            console.error('Calendar event creation failed:', calendarError);
            // カレンダー連携が失敗しても承認は続行（開発環境対応）
            if (process.env.NODE_ENV === 'development') {
                meetLink = 'https://meet.google.com/xxx-xxxx-xxx';
            } else {
                throw calendarError;
            }
        }

        // 予約を更新
        const updatedBooking = updateBooking(id, {
            status: 'approved',
            confirmedSlot: selectedSlot,
            meetLink,
            adminNotes: body.adminNotes,
        });

        // ユーザーに通知
        notifyUserBookingApproved(updatedBooking!, meetLink).catch(err => {
            console.error('Error sending approval notification:', err);
        });

        return NextResponse.json({
            success: true,
            booking: updatedBooking,
        });
    } catch (error) {
        console.error('Error approving booking:', error);
        return internalErrorResponse();
    }
}
