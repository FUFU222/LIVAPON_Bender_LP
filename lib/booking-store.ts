import { Booking, CreateBookingRequest } from '@/types/booking';

// インメモリストレージ（後でデータベースに置き換え可能）
// 本番環境ではSupabaseやFirebaseなどを使用することを推奨
const bookings: Map<string, Booking> = new Map();

/**
 * IDを生成
 */
function generateId(): string {
    return `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * 全ての予約を取得
 */
export function getAllBookings(): Booking[] {
    return Array.from(bookings.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

/**
 * ステータスで予約をフィルタリング
 */
export function getBookingsByStatus(status: Booking['status']): Booking[] {
    return getAllBookings().filter(b => b.status === status);
}

/**
 * IDで予約を取得
 */
export function getBookingById(id: string): Booking | undefined {
    return bookings.get(id);
}

/**
 * 新規予約を作成
 */
export function createBooking(request: CreateBookingRequest): Booking {
    const id = generateId();
    const now = new Date();

    const booking: Booking = {
        id,
        companyName: request.companyName,
        contactName: request.contactName,
        email: request.email,
        phone: request.phone,
        message: request.message,
        preferredSlots: request.preferredSlots.slice(0, 3), // 最大3つ
        status: 'pending',
        createdAt: now,
        updatedAt: now,
    };

    bookings.set(id, booking);
    return booking;
}

/**
 * 予約を更新
 */
export function updateBooking(id: string, updates: Partial<Booking>): Booking | undefined {
    const booking = bookings.get(id);
    if (!booking) return undefined;

    const updatedBooking: Booking = {
        ...booking,
        ...updates,
        updatedAt: new Date(),
    };

    bookings.set(id, updatedBooking);
    return updatedBooking;
}

/**
 * 予約を削除
 */
export function deleteBooking(id: string): boolean {
    return bookings.delete(id);
}
