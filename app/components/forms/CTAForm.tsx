"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface InquiryFormData {
    company: string;
    name: string;
    email: string;
    category: string;
    message: string;
}

const inquiryCategories = [
    "導入相談",
    "出店/掲載について",
    "Japan Festival CANADA について",
    "連携/協業",
    "メディア/取材",
    "その他",
];

export function CTAForm() {
    const [inquiryData, setInquiryData] = useState<InquiryFormData>({
        company: "",
        name: "",
        email: "",
        category: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

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

    return (
        <div className="relative">
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
                            <h3 className="text-2xl font-bold mb-4">お問い合わせありがとうございます</h3>
                            <p className="text-gray-dark mb-6">担当者が確認の上、順次ご連絡差し上げます。</p>
                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <p className="text-accent font-medium italic">「世界への第一歩を、これから一緒に踏み出しましょう。」</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="inquiry"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onSubmit={handleInquirySubmit}
                            className="space-y-6"
                        >
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
                                <label htmlFor="i-category" className="block text-sm font-medium mb-2">お問い合わせ種別 <span className="text-accent">*</span></label>
                                <div className="relative">
                                    <select
                                        id="i-category"
                                        required
                                        value={inquiryData.category}
                                        onChange={e => setInquiryData(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full appearance-none px-4 py-3 pr-10 bg-white border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                                    >
                                        <option value="" disabled>選択してください</option>
                                        {inquiryCategories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-dark/70">
                                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="i-message" className="block text-sm font-medium mb-2">お問い合わせ内容 <span className="text-accent">*</span></label>
                                <textarea id="i-message" required rows={5} placeholder="貴社の製品概要や課題をご記入ください。" value={inquiryData.message} onChange={e => setInquiryData(prev => ({ ...prev, message: e.target.value }))} className="w-full px-4 py-3 bg-white border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none" />
                            </div>
                            {submitError && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{submitError}</div>}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileTap={{ scale: 0.98 }}
                                className="group relative inline-flex w-full items-center justify-center rounded-full bg-accent px-8 py-4 text-lg font-bold text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)] transition-all duration-300 overflow-hidden hover:shadow-[0_22px_50px_rgba(0,0,0,0.45)] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-[350ms] ease-[cubic-bezier(0.85,0,0.15,1)] group-hover:scale-x-100" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            送信中...
                                        </>
                                    ) : (
                                        "導入について相談する（無料）"
                                    )}
                                </span>
                            </motion.button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
