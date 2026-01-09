"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { InkTrail } from "../canvas/InkTrail";
import { format, parse } from "date-fns";
import { ja } from "date-fns/locale";
import { DateTimeSlot } from "@/types/booking";

type FormTab = "inquiry" | "meeting";

interface InquiryFormData {
    company: string;
    name: string;
    email: string;
    message: string;
}

interface MeetingFormData {
    company: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    selectedSlots: DateTimeSlot[];
}

export function CTAForm() {
    const [activeTab, setActiveTab] = useState<FormTab>("meeting");
    const [inquiryData, setInquiryData] = useState<InquiryFormData>({
        company: "",
        name: "",
        email: "",
        message: "",
    });
    const [meetingData, setMeetingData] = useState<MeetingFormData>({
        company: "",
        name: "",
        email: "",
        phone: "",
        message: "",
        selectedSlots: [],
    });

    const [availableSlots, setAvailableSlots] = useState<DateTimeSlot[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    useEffect(() => {
        if (activeTab === "meeting") {
            setIsLoadingSlots(true);
            fetch("/api/calendar/available-slots")
                .then(res => res.json())
                .then(data => {
                    setAvailableSlots(data.slots || []);
                })
                .catch(err => {
                    console.error("Failed to fetch available slots:", err);
                })
                .finally(() => {
                    setIsLoadingSlots(false);
                });
        }
    }, [activeTab]);

    const slotsByDate = availableSlots.reduce((acc, slot) => {
        if (!acc[slot.date]) acc[slot.date] = [];
        acc[slot.date].push(slot);
        return acc;
    }, {} as Record<string, DateTimeSlot[]>);

    const toggleSlot = (slot: DateTimeSlot) => {
        setMeetingData(prev => {
            const isSelected = prev.selectedSlots.some(
                s => s.date === slot.date && s.startTime === slot.startTime
            );
            if (isSelected) {
                return { ...prev, selectedSlots: prev.selectedSlots.filter(s => !(s.date === slot.date && s.startTime === slot.startTime)) };
            } else if (prev.selectedSlots.length < 3) {
                return { ...prev, selectedSlots: [...prev.selectedSlots, slot] };
            }
            return prev;
        });
    };

    const handleInquirySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const response = await fetch("/api/inquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inquiryData),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "送信に失敗しました");
            setIsSubmitted(true);
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "エラーが発生しました");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleMeetingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    companyName: meetingData.company,
                    contactName: meetingData.name,
                    email: meetingData.email,
                    phone: meetingData.phone,
                    message: meetingData.message,
                    preferredSlots: meetingData.selectedSlots,
                }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || "予約の作成に失敗しました");
            setIsSubmitted(true);
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "エラーが発生しました");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDateLabel = (dateStr: string) => {
        const date = parse(dateStr, "yyyy-MM-dd", new Date());
        return format(date, "M月d日(E)", { locale: ja });
    };

    return (
        <div className="relative">
            {/* Tab Switcher */}
            <div className="flex justify-center gap-2 mb-8 relative z-20">
                <button
                    onClick={() => { setActiveTab("meeting"); setIsSubmitted(false); }}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === "meeting" ? "bg-accent text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                    📅 面談を予約する
                </button>
                <button
                    onClick={() => { setActiveTab("inquiry"); setIsSubmitted(false); }}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === "inquiry" ? "bg-accent text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                    ✉️ お問い合わせ
                </button>
            </div>

            {/* Form Container */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-gray-light/30 relative z-10"
            >
                <AnimatePresence mode="wait">
                    {isSubmitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center py-12"
                        >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{activeTab === "meeting" ? "面談予約を受け付けました" : "お問い合わせありがとうございます"}</h3>
                            <p className="text-gray-dark mb-6">{activeTab === "meeting" ? "担当者が確認の上、確定した日時をメールにてご連絡いたします。" : "担当者が確認の上、順次ご連絡差し上げます。"}</p>
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <p className="text-accent font-medium italic">「世界への第一歩を、これから一緒に踏み出しましょう。」</p>
                            </div>
                        </motion.div>
                    ) : activeTab === "meeting" ? (
                        <motion.form key="meeting" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleMeetingSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="m-company" className="block text-sm font-medium mb-2">会社名 <span className="text-accent">*</span></label>
                                    <input type="text" id="m-company" required value={meetingData.company} onChange={e => setMeetingData(prev => ({ ...prev, company: e.target.value }))} className="w-full px-4 py-3 bg-white border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
                                </div>
                                <div>
                                    <label htmlFor="m-name" className="block text-sm font-medium mb-2">ご担当者名 <span className="text-accent">*</span></label>
                                    <input type="text" id="m-name" required value={meetingData.name} onChange={e => setMeetingData(prev => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-3 bg-white border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="m-email" className="block text-sm font-medium mb-2">メールアドレス <span className="text-accent">*</span></label>
                                    <input type="email" id="m-email" required value={meetingData.email} onChange={e => setMeetingData(prev => ({ ...prev, email: e.target.value }))} className="w-full px-4 py-3 bg-white border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
                                </div>
                                <div>
                                    <label htmlFor="m-phone" className="block text-sm font-medium mb-2">電話番号</label>
                                    <input type="tel" id="m-phone" value={meetingData.phone} onChange={e => setMeetingData(prev => ({ ...prev, phone: e.target.value }))} className="w-full px-4 py-3 bg-white border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-3">希望日時を選択（最大3つ） <span className="text-accent">*</span><span className="text-gray-500 font-normal ml-2">({meetingData.selectedSlots.length}/3 選択中)</span></label>
                                {isLoadingSlots ? <div className="flex items-center justify-center py-8"><svg className="animate-spin w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg><span className="ml-3 text-gray-600">空き時間を取得中...</span></div> : Object.keys(slotsByDate).length === 0 ? <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-600">現在予約可能な日時がありません。</div> : (
                                    <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-xl p-4 space-y-4">
                                        {Object.entries(slotsByDate).map(([date, slots]) => (
                                            <div key={date}>
                                                <h4 className="font-medium text-gray-700 mb-2 sticky top-0 bg-white py-1">{formatDateLabel(date)}</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {slots.map(slot => {
                                                        const selected = meetingData.selectedSlots.some(s => s.date === slot.date && s.startTime === slot.startTime);
                                                        const disabled = !selected && meetingData.selectedSlots.length >= 3;
                                                        return (
                                                            <button key={`${slot.date}-${slot.startTime}`} type="button" onClick={() => toggleSlot(slot)} disabled={disabled} className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all ${selected ? "bg-accent text-white shadow-md" : disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white border border-gray-300 text-gray-700 hover:border-accent hover:text-accent"}`}>
                                                                {selected && <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-[10px] rounded-full flex items-center justify-center border border-white shadow-sm">{meetingData.selectedSlots.findIndex(s => s.date === slot.date && s.startTime === slot.startTime) + 1}</span>}
                                                                {slot.startTime}〜{slot.endTime}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="m-message" className="block text-sm font-medium mb-2">ご相談内容</label>
                                <textarea id="m-message" rows={3} placeholder="面談で相談したい内容をお書きください（任意）" value={meetingData.message} onChange={e => setMeetingData(prev => ({ ...prev, message: e.target.value }))} className="w-full px-4 py-3 bg-white border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none" />
                            </div>
                            {submitError && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{submitError}</div>}
                            <motion.button type="submit" disabled={isSubmitting || meetingData.selectedSlots.length === 0} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 px-8 bg-accent text-white font-bold text-lg rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                                {isSubmitting ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>送信中...</span> : "面談を予約する（無料）"}
                            </motion.button>
                        </motion.form>
                    ) : (
                        <motion.form key="inquiry" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleInquirySubmit} className="space-y-6">
                            <div>
                                <label htmlFor="i-company" className="block text-sm font-medium mb-2">会社名 <span className="text-accent">*</span></label>
                                <input type="text" id="i-company" required value={inquiryData.company} onChange={e => setInquiryData(prev => ({ ...prev, company: e.target.value }))} className="w-full px-4 py-3 bg-white border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
                            </div>
                            <div>
                                <label htmlFor="i-name" className="block text-sm font-medium mb-2">ご担当者名 <span className="text-accent">*</span></label>
                                <input type="text" id="i-name" required value={inquiryData.name} onChange={e => setInquiryData(prev => ({ ...prev, name: e.target.value }))} className="w-full px-4 py-3 bg-white border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
                            </div>
                            <div>
                                <label htmlFor="i-email" className="block text-sm font-medium mb-2">メールアドレス <span className="text-accent">*</span></label>
                                <input type="email" id="i-email" required value={inquiryData.email} onChange={e => setInquiryData(prev => ({ ...prev, email: e.target.value }))} className="w-full px-4 py-3 bg-white border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors" />
                            </div>
                            <div>
                                <label htmlFor="i-message" className="block text-sm font-medium mb-2">お問い合わせ内容 <span className="text-accent">*</span></label>
                                <textarea id="i-message" required rows={5} placeholder="貴社の製品概要や課題をご記入ください。" value={inquiryData.message} onChange={e => setInquiryData(prev => ({ ...prev, message: e.target.value }))} className="w-full px-4 py-3 bg-white border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none" />
                            </div>
                            <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 px-8 bg-accent text-white font-bold text-lg rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                                {isSubmitting ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>送信中...</span> : "導入について相談する（無料）"}
                            </motion.button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
