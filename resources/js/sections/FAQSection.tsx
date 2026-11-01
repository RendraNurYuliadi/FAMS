
import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';
import { faqs } from '../data/landing';

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="bg-white px-5 py-24 sm:py-28 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                    <SectionHeading
                        eyebrow="FAQ"
                        title="Pertanyaan yang sering diajukan."
                        description="Informasi dasar tentang tujuan, proses, dan rancangan sistem FAMS."
                        centered={false}
                    />
                    <a href="#kontak" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">
                        Masih ada pertanyaan? <Icon name="arrow-right" size={16} />
                    </a>
                </div>

                <div className="border-t border-neutral-200">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <article key={faq.question} className="border-b border-neutral-200">
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className="flex w-full items-center justify-between gap-5 py-5 text-left"
                                >
                                    <span className="flex gap-4 text-sm font-medium leading-6 sm:text-base">
                                        <span className="text-xs text-neutral-400">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        {faq.question}
                                    </span>
                                    <Icon name={isOpen ? 'minus' : 'plus'} size={18} className="shrink-0" />
                                </button>

                                {isOpen && (
                                    <p className="max-w-2xl pb-6 pl-8 text-sm leading-7 text-neutral-500">
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
