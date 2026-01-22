"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { format, parse } from "date-fns";
import { ja } from "date-fns/locale";
import { Booking, DateTimeSlot } from "@/types/booking";

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const fetchBookings = useCallback(async () => {
        setIsLoading(true);
        try {
            const url = statusFilter === "all"
                ? "/api/bookings"
                : `/api/bookings?status=${statusFilter}`;
            const res = await fetch(url);
            const data = await res.json();
            setBookings(data.bookings || []);
        } catch (err) {
            setError("予約情報の取得に失敗しました");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [statusFilter]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const handleApprove = async (bookingId: string, slotIndex: number) => {
        if (!confirm("この日時で承認しますか？")) return;

        setProcessingId(bookingId);
        try {
            const res = await fetch(`/api/bookings/${bookingId}/approve`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ selectedSlotIndex: slotIndex }),
            });

            if (!res.ok) {
                throw new Error("承認に失敗しました");
            }

            await fetchBookings();
        } catch (err) {
            alert(err instanceof Error ? err.message : "エラーが発生しました");
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (bookingId: string) => {
        const reason = prompt("拒否理由を入力してください（任意）:");
        if (reason === null) return;

        setProcessingId(bookingId);
        try {
            const res = await fetch(`/api/bookings/${bookingId}/reject`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reason }),
            });

            if (!res.ok) {
                throw new Error("拒否に失敗しました");
            }

            await fetchBookings();
        } catch (err) {
            alert(err instanceof Error ? err.message : "エラーが発生しました");
        } finally {
            setProcessingId(null);
        }
    };

    const formatSlot = (slot: DateTimeSlot) => {
        const date = parse(slot.date, "yyyy-MM-dd", new Date());
        return `${format(date, "M/d(E)", { locale: ja })} ${slot.startTime}〜${slot.endTime}`;
    };

    const getStatusBadge = (status: Booking["status"]) => {
        const styles: Record<Booking["status"], string> = {
            pending: "bg-yellow-100 text-yellow-800",
            approved: "bg-green-100 text-green-800",
            rejected: "bg-red-100 text-red-800",
            cancelled: "bg-gray-100 text-gray-800",
        };
        const labels: Record<Booking["status"], string> = {
            pending: "保留中",
            approved: "承認済み",
            rejected: "拒否",
            cancelled: "キャンセル",
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {labels[status]}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">予約管理</h1>
                    <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                        ← サイトに戻る
                    </Link>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Filter */}
                <div className="mb-6 flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700">ステータス:</label>
                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                    >
                        <option value="all">すべて</option>
                        <option value="pending">保留中</option>
                        <option value="approved">承認済み</option>
                        <option value="rejected">拒否</option>
                    </select>
                    <button
                        onClick={fetchBookings}
                        className="ml-auto text-sm text-accent hover:underline"
                    >
                        🔄 更新
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <svg className="animate-spin w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                        {error}
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                        予約がありません
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map(booking => (
                            <div
                                key={booking.id}
                                className={`bg-white rounded-lg shadow-sm border p-6 ${processingId === booking.id ? "opacity-50" : ""
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-bold text-lg">{booking.companyName}</h3>
                                            {getStatusBadge(booking.status)}
                                        </div>
                                        <p className="text-gray-600">{booking.contactName} 様</p>
                                    </div>
                                    <div className="text-right text-sm text-gray-500">
                                        <p>予約日時</p>
                                        <p>{format(new Date(booking.createdAt), "yyyy/MM/dd HH:mm")}</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">メールアドレス</p>
                                        <a href={`mailto:${booking.email}`} className="text-accent hover:underline">
                                            {booking.email}
                                        </a>
                                    </div>
                                    {booking.phone && (
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">電話番号</p>
                                            <p>{booking.phone}</p>
                                        </div>
                                    )}
                                </div>

                                {booking.message && (
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-500 mb-1">相談内容</p>
                                        <p className="text-gray-700 whitespace-pre-wrap">{booking.message}</p>
                                    </div>
                                )}

                                {/* 希望日時 */}
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500 mb-2">希望日時</p>
                                    <div className="flex flex-wrap gap-2">
                                        {booking.preferredSlots.map((slot, i) => (
                                            <div
                                                key={i}
                                                className={`px-3 py-2 rounded-lg text-sm ${booking.confirmedSlot?.date === slot.date &&
                                                        booking.confirmedSlot?.startTime === slot.startTime
                                                        ? "bg-green-100 text-green-800 font-medium"
                                                        : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                <span className="font-medium mr-1">{i + 1}.</span>
                                                {formatSlot(slot)}
                                                {booking.status === "pending" && (
                                                    <button
                                                        onClick={() => handleApprove(booking.id, i)}
                                                        disabled={processingId === booking.id}
                                                        className="ml-2 text-accent hover:underline text-xs"
                                                    >
                                                        この日時で承認
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* 確定情報 */}
                                {booking.status === "approved" && booking.confirmedSlot && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                        <p className="text-sm font-medium text-green-800 mb-1">確定日時</p>
                                        <p className="text-green-900 font-bold">{formatSlot(booking.confirmedSlot)}</p>
                                        {booking.meetLink && (
                                            <a
                                                href={booking.meetLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-green-700 hover:underline block mt-2"
                                            >
                                                🔗 Google Meetリンク
                                            </a>
                                        )}
                                    </div>
                                )}

                                {/* アクション */}
                                {booking.status === "pending" && (
                                    <div className="flex gap-3 pt-4 border-t">
                                        <button
                                            onClick={() => handleReject(booking.id)}
                                            disabled={processingId === booking.id}
                                            className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                                        >
                                            拒否する
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
