import { NextRequest, NextResponse } from 'next/server';
import { addMonths, differenceInCalendarDays, endOfMonth } from 'date-fns';
import { getAvailableSlots, getBookingDateRange } from '@/lib/google-calendar';
import { AvailableSlotsResponse } from '@/types/booking';

const MAX_WINDOW_DAYS = 62;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const windowDays = parseNumberParam(searchParams.get('days'), 1, MAX_WINDOW_DAYS);
  const startOffsetDays = parseNumberParam(searchParams.get('startOffsetDays'), 0, 30);
  const allowWeekendsParam = searchParams.get('includeWeekends');
  const allowWeekends = allowWeekendsParam ? allowWeekendsParam === 'true' : undefined;
  const referenceDate = new Date();
  const baseRange = getBookingDateRange({
    referenceDate,
    startOffsetDays: startOffsetDays ?? undefined,
    windowDays: 1,
  });
  const endOfNextMonth = endOfMonth(addMonths(referenceDate, 1));
  const computedWindowDays = Math.max(
    1,
    differenceInCalendarDays(endOfNextMonth, baseRange.startDate) + 1
  );
  const effectiveWindowDays = windowDays ?? computedWindowDays;

  try {
    const range = getBookingDateRange({
      referenceDate,
      windowDays: effectiveWindowDays,
      startOffsetDays: startOffsetDays ?? undefined,
    });

    const slots = await getAvailableSlots({
      startDate: range.startDate,
      endDate: range.endDate,
      allowWeekends,
    });

    const response: AvailableSlotsResponse & { source?: string; range?: { startDate: string; endDate: string } } = {
      slots,
      generatedAt: new Date().toISOString(),
      source: 'live',
      range: {
        startDate: range.startDate.toISOString(),
        endDate: range.endDate.toISOString(),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching available slots:', error);

    const isDev = process.env.NODE_ENV === 'development';
    const hasCredentials = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY;

    if (isDev && !hasCredentials) {
      return NextResponse.json({
        slots: generateMockSlots(effectiveWindowDays, allowWeekends ?? false),
        generatedAt: new Date().toISOString(),
        source: 'mock',
      });
    }

    return NextResponse.json(
      {
        error: 'Failed to fetch available slots',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

function parseNumberParam(value: string | null, min: number, max: number): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return undefined;
  return Math.min(max, Math.max(min, Math.floor(parsed)));
}

function generateMockSlots(days: number, includeWeekends: boolean) {
  const slots = [] as { date: string; startTime: string; endTime: string }[];
  const today = new Date();

  for (let day = 1; day <= days; day++) {
    const date = new Date(today);
    date.setDate(date.getDate() + day);

    if (!includeWeekends && (date.getDay() === 0 || date.getDay() === 6)) {
      continue;
    }

    const dateStr = date.toISOString().split('T')[0];

    for (let hour = 10; hour < 18; hour++) {
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
