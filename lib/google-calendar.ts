import { google, calendar_v3 } from 'googleapis';
import { addDays, format, parse, setHours, setMinutes, startOfDay, addMinutes, isAfter, isBefore, isEqual } from 'date-fns';
import { DateTimeSlot, AvailableSlot } from '@/types/booking';

// 営業時間設定
const BUSINESS_HOURS = {
    startHour: 10, // 10:00
    endHour: 18,   // 18:00
};

// スロットの長さ（分）
const SLOT_DURATION = 60;

// 予約可能な期間（今日から何日先まで）
const BOOKING_WINDOW_DAYS = 14;

/**
 * Google サービスアカウント認証クライアントを作成
 */
function getServiceAccountAuth() {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

    if (!privateKey || !clientEmail) {
        throw new Error('Google Service Account credentials are not configured. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY.');
    }

    const auth = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    return auth;
}

/**
 * Google Calendar APIクライアントを取得
 */
function getCalendarClient(): calendar_v3.Calendar {
    const auth = getServiceAccountAuth();
    return google.calendar({ version: 'v3', auth });
}

/**
 * 指定期間の空き時間を取得
 */
export async function getAvailableSlots(
    startDate: Date,
    endDate: Date
): Promise<DateTimeSlot[]> {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!calendarId) {
        throw new Error('GOOGLE_CALENDAR_ID is not configured');
    }

    // FreeBusy APIで予約済み時間を取得
    const freeBusyResponse = await calendar.freebusy.query({
        requestBody: {
            timeMin: startDate.toISOString(),
            timeMax: endDate.toISOString(),
            items: [{ id: calendarId }],
        },
    });

    const busySlots = freeBusyResponse.data.calendars?.[calendarId]?.busy || [];

    // 空き時間スロットを計算
    const availableSlots: DateTimeSlot[] = [];

    // 各日について処理
    let currentDate = startOfDay(startDate);
    const lastDate = startOfDay(endDate);

    while (isBefore(currentDate, lastDate) || isEqual(currentDate, lastDate)) {
        // 週末をスキップ（オプション）
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            // 営業時間内のスロットを生成
            const daySlots = generateDaySlots(currentDate, busySlots);
            availableSlots.push(...daySlots);
        }

        currentDate = addDays(currentDate, 1);
    }

    return availableSlots;
}

/**
 * 1日分の空きスロットを生成
 */
function generateDaySlots(
    date: Date,
    busySlots: calendar_v3.Schema$TimePeriod[]
): DateTimeSlot[] {
    const slots: DateTimeSlot[] = [];
    const dateStr = format(date, 'yyyy-MM-dd');

    // 営業開始時間から終了時間まで
    let slotStart = setMinutes(setHours(date, BUSINESS_HOURS.startHour), 0);
    const dayEnd = setMinutes(setHours(date, BUSINESS_HOURS.endHour), 0);

    while (isBefore(slotStart, dayEnd)) {
        const slotEnd = addMinutes(slotStart, SLOT_DURATION);

        // このスロットが予約済み時間と重複しないかチェック
        const isAvailable = !busySlots.some(busy => {
            const busyStart = new Date(busy.start!);
            const busyEnd = new Date(busy.end!);

            // スロットが予約済み時間と重複するかチェック
            return (
                (isAfter(slotStart, busyStart) || isEqual(slotStart, busyStart)) && isBefore(slotStart, busyEnd) ||
                (isAfter(slotEnd, busyStart) && (isBefore(slotEnd, busyEnd) || isEqual(slotEnd, busyEnd))) ||
                (isBefore(slotStart, busyStart) && isAfter(slotEnd, busyEnd))
            );
        });

        // 現在時刻より後のスロットのみ追加
        if (isAvailable && isAfter(slotStart, new Date())) {
            slots.push({
                date: dateStr,
                startTime: format(slotStart, 'HH:mm'),
                endTime: format(slotEnd, 'HH:mm'),
            });
        }

        slotStart = slotEnd;
    }

    return slots;
}

/**
 * 予約可能な日付範囲を取得
 */
export function getBookingDateRange(): { startDate: Date; endDate: Date } {
    const startDate = addDays(new Date(), 1); // 明日から
    const endDate = addDays(new Date(), BOOKING_WINDOW_DAYS);
    return { startDate, endDate };
}

/**
 * カレンダーイベントを作成（承認時）
 */
export async function createCalendarEvent(
    slot: DateTimeSlot,
    booking: {
        companyName: string;
        contactName: string;
        email: string;
    }
): Promise<{ eventId: string; meetLink: string }> {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!calendarId) {
        throw new Error('GOOGLE_CALENDAR_ID is not configured');
    }

    const startDateTime = parse(`${slot.date} ${slot.startTime}`, 'yyyy-MM-dd HH:mm', new Date());
    const endDateTime = parse(`${slot.date} ${slot.endTime}`, 'yyyy-MM-dd HH:mm', new Date());

    const event = await calendar.events.insert({
        calendarId,
        conferenceDataVersion: 1,
        requestBody: {
            summary: `【面談】${booking.companyName} - ${booking.contactName}様`,
            description: `LIVAPON 導入相談面談\n\n会社名: ${booking.companyName}\nご担当者: ${booking.contactName}\nメール: ${booking.email}`,
            start: {
                dateTime: startDateTime.toISOString(),
                timeZone: 'Asia/Tokyo',
            },
            end: {
                dateTime: endDateTime.toISOString(),
                timeZone: 'Asia/Tokyo',
            },
            attendees: [
                { email: booking.email },
                { email: calendarId },
            ],
            conferenceData: {
                createRequest: {
                    requestId: `livapon-${Date.now()}`,
                    conferenceSolutionKey: { type: 'hangoutsMeet' },
                },
            },
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 }, // 1日前
                    { method: 'popup', minutes: 30 },       // 30分前
                ],
            },
        },
    });

    const meetLink = event.data.conferenceData?.entryPoints?.find(
        ep => ep.entryPointType === 'video'
    )?.uri || '';

    return {
        eventId: event.data.id || '',
        meetLink,
    };
}

/**
 * カレンダーイベントを削除（キャンセル時）
 */
export async function deleteCalendarEvent(eventId: string): Promise<void> {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!calendarId) {
        throw new Error('GOOGLE_CALENDAR_ID is not configured');
    }

    await calendar.events.delete({
        calendarId,
        eventId,
    });
}
