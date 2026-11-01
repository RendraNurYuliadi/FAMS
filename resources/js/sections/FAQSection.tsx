
import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';
import { faqs } from '../data/landing';

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="relative isolate overflow-hidden bg-neutral-100 px-5 py-24 sm:py-28 lg:px-8">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-35">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(23,23,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        maskImage:
                            'radial-gradient(ellipse at 75% 45%, black 5%, transparent 75%)',
                    }}
                />
                <div className="absolute -right-40 top-1/4 size-[28rem] rounded-full bg-white/80 blur-3xl" />
                <div className="absolute -left-40 bottom-0 size-96 rounded-full bg-neutral-300/50 blur-3xl" />
            </div>
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                    <SectionHeading
                        eyebrow="FAQ"
                        title="Pertanyaan yang sering diajukan."
                        description="Informasi dasar tentang tujuan, proses, dan rancangan sistem FAMS."
                        centered={false}
                    />
                    <a href="#kontak" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 transition hover:text-neutral-500">
                        Masih ada pertanyaan? <Icon name="arrow-right" size={16} />
                    </a>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <article
                                key={faq.question}
                                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                                    isOpen
                                        ? 'border-neutral-800 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-700 text-white shadow-[0_16px_40px_rgba(0,0,0,0.14)]'
                                        : 'border-neutral-200 bg-gradient-to-br from-white via-neutral-50 to-neutral-200 text-neutral-900 shadow-sm hover:border-neutral-400'
                                }`}
                            >
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                                >
                                    <span className="flex gap-4 text-sm font-medium leading-6 sm:text-base">
                                        <span className={`text-xs ${isOpen ? 'text-white/50' : 'text-neutral-500'}`}>
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        {faq.question}
                                    </span>
                                    <Icon name={isOpen ? 'minus' : 'plus'} size={18} className={`shrink-0 ${isOpen ? 'text-white' : 'text-neutral-600'}`} />
                                </button>

                                {isOpen && (
                                    <p className="max-w-2xl px-5 pb-6 pl-12 text-sm leading-7 text-white/70 sm:px-6 sm:pl-14">
                                        {faq.answer}
                                    </p>
                                )}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
