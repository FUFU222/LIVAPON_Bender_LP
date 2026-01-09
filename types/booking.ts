// Booking system types

export interface DateTimeSlot {
    date: string;      // YYYY-MM-DD
    startTime: string; // HH:mm
    endTime: string;   // HH:mm
}

export interface AvailableSlot {
    start: Date;
    end: Date;
    duration: number;  // minutes
}

export type BookingStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface Booking {
    id: string;
    companyName: string;
    contactName: string;
    email: string;
    phone?: string;
    message?: string;
    preferredSlots: DateTimeSlot[];  // 最大3つ
    confirmedSlot?: DateTimeSlot;
    status: BookingStatus;
    meetLink?: string;
    adminNotes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBookingRequest {
    companyName: string;
    contactName: string;
    email: string;
    phone?: string;
    message?: string;
    preferredSlots: DateTimeSlot[];
}

export interface ApproveBookingRequest {
    selectedSlotIndex: number; // preferredSlotsの中から選択するインデックス
    adminNotes?: string;
}

export interface AvailableSlotsResponse {
    slots: DateTimeSlot[];
    generatedAt: string;
}

export interface BookingResponse {
    success: boolean;
    booking?: Booking;
    error?: string;
}
