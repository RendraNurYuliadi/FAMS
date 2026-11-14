import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';
import { faqs } from '../data/landing';

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section
            id="faq"
            className="landing-section relative isolate overflow-hidden bg-surface-warm px-space-lg py-space-section sm:py-space-section-lg lg:px-space-2xl"
        >
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(249,115,22,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.055) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        maskImage:
                            'radial-gradient(ellipse at 75% 45%, black 5%, transparent 75%)',
                    }}
                />

                <div className="absolute top-1/4 -right-40 size-[28rem] rounded-full bg-[#FED7AA]/50 blur-3xl" />
                <div className="absolute bottom-0 -left-40 size-96 rounded-full bg-white/80 blur-3xl" />
                <div className="absolute top-0 right-[35%] size-64 rounded-full bg-[#FFF0E3]/80 blur-3xl" />
            </div>

            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
                {/* Left information */}
                <div className="flex flex-col items-start">
                    <SectionHeading
                        eyebrow="FAQ"
                        title="Pertanyaan yang sering diajukan."
                        description="Informasi dasar tentang tujuan, proses, dan rancangan sistem FAMS."
                        centered={false}
                    />

                    {/* Additional information */}
                    <div className="mt-8 w-full max-w-sm rounded-2xl border border-orange-100 bg-white/80 p-5 shadow-[0_8px_25px_rgba(124,45,18,0.04)]">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E3] text-[#EA580C]">
                                <Icon name="arrow-right" size={21} />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-[#171717]">
                                    Butuh informasi lainnya?
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                    Kami siap membantu menjelaskan FAMS.
                                </p>
                            </div>
                        </div>

                        <a
                            href="#kontak"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#EA580C] transition-colors hover:text-[#C2410C]"
                        >
                            Hubungi kami
                            <Icon name="arrow-right" size={16} />
                        </a>
                    </div>
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-space-md">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <article
                                key={faq.question}
                                className={`group relative overflow-hidden rounded-card border transition-all duration-300 ${
                                    isOpen
                                        ? 'border-charcoal-800 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-700 text-white shadow-[0_16px_40px_rgba(0,0,0,0.13)]'
                                        : 'border-orange-100 bg-white text-[#171717] shadow-[0_5px_20px_rgba(124,45,18,0.035)] hover:border-orange-300 hover:shadow-[0_10px_25px_rgba(124,45,18,0.07)]'
                                }`}
                            >
                                {/* Active accent */}
                                {isOpen && (
                                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#F97316]" />
                                )}

                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    onClick={() =>
                                        setOpenIndex(isOpen ? null : index)
                                    }
                                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-space-xl"
                                >
                                    <span className="flex items-start gap-space-lg text-body leading-6 font-medium">
                                        <span
                                            className={`pt-0.5 text-caption font-semibold tracking-wider ${
                                                isOpen
                                                    ? 'text-[#FB923C]'
                                                    : 'text-[#EA580C]/70'
                                            }`}
                                        >
                                            {String(index + 1).padStart(2, '0')}
                                        </span>

                                        <span
                                            className={
                                                isOpen
                                                    ? 'text-white'
                                                    : 'text-[#171717]'
                                            }
                                        >
                                            {faq.question}
                                        </span>
                                    </span>

                                    <span
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                                            isOpen
                                                ? 'bg-[#F97316] text-white'
                                                : 'bg-[#FFF0E3] text-[#EA580C] group-hover:bg-[#F97316] group-hover:text-white'
                                        }`}
                                    >
                                        <Icon
                                            name={isOpen ? 'minus' : 'plus'}
                                            size={17}
                                        />
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-space-xl pl-12 sm:px-space-xl sm:pl-14">
                                        <div className="mb-4 h-px w-full bg-white/15" />

                                        <p className="max-w-2xl text-body leading-7 text-white/70">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
