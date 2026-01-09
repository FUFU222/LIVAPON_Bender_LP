import { NextRequest, NextResponse } from 'next/server';
import { getAvailableSlots, getBookingDateRange } from '@/lib/google-calendar';
import { AvailableSlotsResponse } from '@/types/booking';

export async function GET(request: NextRequest) {
    try {
        const { startDate, endDate } = getBookingDateRange();

        const slots = await getAvailableSlots(startDate, endDate);

        const response: AvailableSlotsResponse & { source?: string } = {
            slots,
            generatedAt: new Date().toISOString(),
            source: 'live'
        };

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching available slots:', error);

        // 開発環境用のモックデータ
        const isDev = process.env.NODE_ENV === 'development';
        const hasCredentials = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY;

        if (isDev && !hasCredentials) {
            return NextResponse.json({
                slots: generateMockSlots(),
                generatedAt: new Date().toISOString(),
                source: 'mock'
            });
        }

        return NextResponse.json(
            { error: 'Failed to fetch available slots', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}

// 開発用モックスロット生成
function generateMockSlots() {
    const slots = [];
    const today = new Date();

    for (let day = 1; day <= 14; day++) {
        const date = new Date(today);
        date.setDate(date.getDate() + day);

        // 週末をスキップ
        if (date.getDay() === 0 || date.getDay() === 6) continue;

        const dateStr = date.toISOString().split('T')[0];

        // 10:00〜18:00 の1時間スロット
        for (let hour = 10; hour < 18; hour++) {
            // ランダムに一部のスロットを除外（予約済みをシミュレート）
            if (Math.random() > 0.7) continue;

            slots.push({
                date: dateStr,
                startTime: `${hour.toString().padStart(2, '0')}:00`,
                endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
            });
        }
    }

    return slots;
}
