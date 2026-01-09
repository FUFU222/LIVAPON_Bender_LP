import { google, calendar_v3 } from 'googleapis';
import { addDays } from 'date-fns';
import { DateTimeSlot } from '@/types/booking';

export class SlotUnavailableError extends Error {
  constructor(message = 'Selected slot is no longer available.') {
    super(message);
    this.name = 'SlotUnavailableError';
  }
}

interface CalendarConfig {
  calendarId: string;
  serviceAccountEmail: string;
  privateKey: string;
  timeZone: string;
  slotDurationMinutes: number;
  bookingWindowDays: number;
  bookingStartOffsetDays: number;
  businessHours: {
    startHour: number;
    endHour: number;
  };
  allowWeekendBookings: boolean;
}

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface CalendarEventPayload {
  bookingId: string;
  companyName: string;
  contactName: string;
  email: string;
}

interface CalendarEventResult {
  eventId: string;
  meetLink?: string;
  htmlLink?: string;
}

const calendarConfig = loadCalendarConfig();
let calendarClient: calendar_v3.Calendar | undefined;

function loadCalendarConfig(): CalendarConfig {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!calendarId || !serviceAccountEmail || !rawPrivateKey) {
    throw new Error(
      'Google Calendar credentials are incomplete. Please set GOOGLE_CALENDAR_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_PRIVATE_KEY.'
    );
  }

  const privateKey = rawPrivateKey.replace(/\\n/g, '\n');
  const timeZone = process.env.GOOGLE_CALENDAR_TIMEZONE || 'Asia/Tokyo';
  const slotDurationMinutes = Number(process.env.GOOGLE_SLOT_DURATION_MINUTES || 60);
  const windowDays = Number(process.env.GOOGLE_BOOKING_WINDOW_DAYS || 14);
  const startOffsetDays = Number(process.env.GOOGLE_BOOKING_START_OFFSET_DAYS || 1);
  const businessStartHour = Number(process.env.GOOGLE_BUSINESS_START_HOUR || 10);
  const businessEndHour = Number(process.env.GOOGLE_BUSINESS_END_HOUR || 18);
  const allowWeekendBookings = process.env.GOOGLE_ALLOW_WEEKEND_BOOKINGS === 'true';

  if (slotDurationMinutes <= 0) {
    throw new Error('GOOGLE_SLOT_DURATION_MINUTES must be a positive number.');
  }

  if (businessEndHour <= businessStartHour) {
    throw new Error('GOOGLE_BUSINESS_END_HOUR must be greater than GOOGLE_BUSINESS_START_HOUR.');
  }

  return {
    calendarId,
    serviceAccountEmail,
    privateKey,
    timeZone,
    slotDurationMinutes,
    bookingWindowDays: Math.max(1, windowDays),
    bookingStartOffsetDays: Math.max(0, startOffsetDays),
    businessHours: {
      startHour: businessStartHour,
      endHour: businessEndHour,
    },
    allowWeekendBookings,
  };
}

function getCalendarClient(): calendar_v3.Calendar {
  if (!calendarClient) {
    const auth = new google.auth.JWT({
      email: calendarConfig.serviceAccountEmail,
      key: calendarConfig.privateKey,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });
    calendarClient = google.calendar({ version: 'v3', auth });
  }
  return calendarClient;
}

function minutesToLabel(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function formatDateInTimeZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

function weekdayInTimeZone(dateLabel: string, timeZone: string): number {
  const date = convertLabelToDate(dateLabel, '12:00', timeZone);
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
  });
  const weekday = formatter.format(date);
  const index = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday);
  return index === -1 ? 0 : index;
}

function convertLabelToDate(dateLabel: string, timeLabel: string, timeZone: string): Date {
  const [year, month, day] = dateLabel.split('-').map(Number);
  const [hours, minutes] = timeLabel.split(':').map(Number);
  const utcTimestamp = Date.UTC(year, month - 1, day, hours, minutes, 0);
  const referenceDate = new Date(utcTimestamp);
  const offset = getTimeZoneOffset(timeZone, referenceDate);
  return new Date(utcTimestamp - offset);
}

function getTimeZoneOffset(timeZone: string, date: Date): number {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const parts = dtf.formatToParts(date).reduce<Record<string, string>>((acc, part) => {
    if (part.type !== 'literal') {
      acc[part.type] = part.value;
    }
    return acc;
  }, {});
  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  return asUTC - date.getTime();
}

function convertSlotToRange(slot: DateTimeSlot, timeZone: string): DateRange {
  const startDate = convertLabelToDate(slot.date, slot.startTime, timeZone);
  const endDate = convertLabelToDate(slot.date, slot.endTime, timeZone);
  return { startDate, endDate };
}

function rangesOverlap(a: DateRange, b: DateRange): boolean {
  return a.startDate < b.endDate && b.startDate < a.endDate;
}

async function fetchBusyIntervals(range: DateRange, padDays = 1): Promise<DateRange[]> {
  const calendar = getCalendarClient();
  const timeMaxDate = (() => {
    if (padDays > 0) {
      return addDays(range.endDate, padDays);
    }
    const candidate = new Date(range.endDate);
    if (candidate <= range.startDate) {
      return new Date(range.endDate.getTime() + 60 * 1000);
    }
    return candidate;
  })();
  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: range.startDate.toISOString(),
      timeMax: timeMaxDate.toISOString(),
      items: [{ id: calendarConfig.calendarId }],
    },
  });

  const periods = response.data.calendars?.[calendarConfig.calendarId]?.busy || [];
  return periods
    .map(period => ({
      startDate: period.start ? new Date(period.start) : undefined,
      endDate: period.end ? new Date(period.end) : undefined,
    }))
    .filter((interval): interval is DateRange => Boolean(interval.startDate && interval.endDate));
}

function buildSlotCandidates(
  dateLabel: string,
  busyIntervals: DateRange[],
  now: Date,
  config: CalendarConfig
): DateTimeSlot[] {
  const slots: DateTimeSlot[] = [];
  const dayStartMinutes = config.businessHours.startHour * 60;
  const dayEndMinutes = config.businessHours.endHour * 60;

  for (
    let minutesCursor = dayStartMinutes;
    minutesCursor + config.slotDurationMinutes <= dayEndMinutes;
    minutesCursor += config.slotDurationMinutes
  ) {
    const startLabel = minutesToLabel(minutesCursor);
    const endLabel = minutesToLabel(minutesCursor + config.slotDurationMinutes);
    const slot = { date: dateLabel, startTime: startLabel, endTime: endLabel };
    const slotRange = convertSlotToRange(slot, config.timeZone);

    if (slotRange.endDate <= slotRange.startDate) {
      continue;
    }

    if (slotRange.startDate <= now) {
      continue;
    }

    const overlaps = busyIntervals.some(interval => rangesOverlap(slotRange, interval));
    if (!overlaps) {
      slots.push(slot);
    }
  }

  return slots;
}

export interface BookingRangeOptions {
  referenceDate?: Date;
  startOffsetDays?: number;
  windowDays?: number;
}

export function getBookingDateRange(options?: BookingRangeOptions): DateRange {
  const referenceDate = options?.referenceDate ?? new Date();
  const offset = Math.max(0, options?.startOffsetDays ?? calendarConfig.bookingStartOffsetDays);
  const windowDays = Math.max(1, options?.windowDays ?? calendarConfig.bookingWindowDays);

  const startLabel = formatDateInTimeZone(addDays(referenceDate, offset), calendarConfig.timeZone);
  const endLabel = formatDateInTimeZone(addDays(referenceDate, offset + windowDays - 1), calendarConfig.timeZone);

  return {
    startDate: convertLabelToDate(startLabel, '00:00', calendarConfig.timeZone),
    endDate: convertLabelToDate(endLabel, '00:00', calendarConfig.timeZone),
  };
}

interface AvailabilityOptions {
  startDate?: Date;
  endDate?: Date;
  allowWeekends?: boolean;
}

export async function getAvailableSlots(options?: AvailabilityOptions): Promise<DateTimeSlot[]> {
  const fallbackRange = getBookingDateRange();
  const targetRange: DateRange = {
    startDate: options?.startDate ?? fallbackRange.startDate,
    endDate: options?.endDate ?? fallbackRange.endDate,
  };

  if (targetRange.endDate < targetRange.startDate) {
    throw new Error('endDate must be greater than or equal to startDate');
  }

  const allowWeekends = options?.allowWeekends ?? calendarConfig.allowWeekendBookings;
  const busyIntervals = await fetchBusyIntervals(targetRange);
  const now = new Date();
  const slots: DateTimeSlot[] = [];

  for (let cursor = new Date(targetRange.startDate); cursor <= targetRange.endDate; cursor = addDays(cursor, 1)) {
    const dateLabel = formatDateInTimeZone(cursor, calendarConfig.timeZone);
    const weekday = weekdayInTimeZone(dateLabel, calendarConfig.timeZone);

    if (!allowWeekends && (weekday === 0 || weekday === 6)) {
      continue;
    }

    slots.push(...buildSlotCandidates(dateLabel, busyIntervals, now, calendarConfig));
  }

  return slots;
}

async function assertSlotAvailability(slot: DateTimeSlot): Promise<DateRange> {
  const slotRange = convertSlotToRange(slot, calendarConfig.timeZone);
  const busyIntervals = await fetchBusyIntervals(slotRange, 0);
  const overlaps = busyIntervals.some(interval => rangesOverlap(slotRange, interval));

  if (overlaps) {
    throw new SlotUnavailableError();
  }

  return slotRange;
}

export async function createCalendarEvent(
  slot: DateTimeSlot,
  booking: CalendarEventPayload
): Promise<CalendarEventResult> {
  const calendar = getCalendarClient();
  const slotRange = await assertSlotAvailability(slot);

  const response = await calendar.events.insert({
    calendarId: calendarConfig.calendarId,
    conferenceDataVersion: 1,
    requestBody: {
      summary: `【面談】${booking.companyName} - ${booking.contactName}様`,
      description: `LIVAPON 導入相談面談\n\n会社名: ${booking.companyName}\nご担当者: ${booking.contactName}\nメール: ${booking.email}\n予約ID: ${booking.bookingId}`,
      start: {
        dateTime: slotRange.startDate.toISOString(),
        timeZone: calendarConfig.timeZone,
      },
      end: {
        dateTime: slotRange.endDate.toISOString(),
        timeZone: calendarConfig.timeZone,
      },
      attendees: [
        { email: booking.email },
        { email: calendarConfig.calendarId },
      ],
      extendedProperties: {
        private: {
          bookingId: booking.bookingId,
        },
      },
      conferenceData: {
        createRequest: {
          requestId: `livapon-${booking.bookingId}-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    },
  });

  const meetLink = response.data.conferenceData?.entryPoints?.find(
    entry => entry.entryPointType === 'video'
  )?.uri;

  return {
    eventId: response.data.id || '',
    meetLink: meetLink || undefined,
    htmlLink: response.data.htmlLink || undefined,
  };
}

export async function deleteCalendarEvent(eventId: string): Promise<void> {
  const calendar = getCalendarClient();
  await calendar.events.delete({
    calendarId: calendarConfig.calendarId,
    eventId,
  });
}
