import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';
import { testimonials } from '../data/landing';

const testimonialTones = [
    {
        card: 'from-charcoal-900 via-charcoal-800 to-charcoal-700 text-white',
        number: 'text-white/50',
        quote: 'text-white',
        divider: 'border-white/20',
        initials: 'bg-[#F97316] text-white',
        name: 'text-white',
        role: 'text-white/60',
        decoration: 'border-white/10 bg-white/5',
        accent: 'bg-[#F97316]',
    },
    {
        card: 'from-white via-white to-[#FFF0E3] text-[#171717]',
        number: 'text-[#EA580C]/70',
        quote: 'text-[#292524]',
        divider: 'border-orange-100',
        initials: 'bg-[#FFF0E3] text-[#EA580C]',
        name: 'text-[#171717]',
        role: 'text-gray-500',
        decoration: 'border-orange-200/60 bg-[#FFF7ED]/70',
        accent: 'bg-[#F97316]',
    },
    {
        card: 'from-[#FED7AA] via-[#FFF0E3] to-[#FFF7ED] text-[#171717]',
        number: 'text-[#C2410C]/70',
        quote: 'text-[#431407]',
        divider: 'border-orange-200',
        initials: 'bg-[#EA580C] text-white',
        name: 'text-[#171717]',
        role: 'text-[#9A3412]/70',
        decoration: 'border-orange-300/50 bg-white/30',
        accent: 'bg-[#EA580C]',
    },
];

export default function TestimonialsSection() {
    const [active, setActive] = useState(0);

    const total = testimonials.length;

    function change(direction: number) {
        if (total === 0) return;

        setActive((current) => (current + direction + total) % total);
    }

    function getTestimonial(index: number) {
        return testimonials[(active + index) % total];
    }

    if (total === 0) return null;

    return (
        <section className="landing-section relative isolate overflow-hidden bg-surface-warm px-space-lg py-space-section sm:py-space-section-lg lg:px-space-2xl">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(249,115,22,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.055) 1px, transparent 1px)',
                        backgroundSize: '42px 42px',
                        maskImage:
                            'radial-gradient(ellipse at center, black 10%, transparent 78%)',
                    }}
                />

                <div className="absolute top-0 -left-36 size-96 rounded-full bg-[#FED7AA]/50 blur-3xl" />
                <div className="absolute -right-36 -bottom-36 size-96 rounded-full bg-[#FDBA74]/30 blur-3xl" />
                <div className="absolute top-20 right-[20%] size-48 rounded-full bg-white/70 blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl">
                <SectionHeading
                    eyebrow="Perspektif Pengguna"
                    title="Pengelolaan yang lebih mudah dipahami."
                    description="FAMS dirancang berdasarkan kebutuhan pengelola, peminjam, dan petugas perawatan."
                />

                {/* Carousel */}
                <div className="mt-12">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {Array.from({
                            length: Math.min(3, total),
                        }).map((_, index) => {
                            const item = getTestimonial(index);
                            const tone = testimonialTones[index];

                            return (
                                <article
                                    key={`${active}-${index}`}
                                    className={`group relative isolate flex min-h-[300px] flex-col overflow-hidden rounded-panel border border-white/60 bg-gradient-to-br ${tone.card} p-7 shadow-[0_12px_35px_rgba(124,45,18,0.08)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(124,45,18,0.15)] sm:p-space-2xl`}
                                >
                                    {/* Decorative circles */}
                                    <div
                                        className={`pointer-events-none absolute -top-14 -right-12 -z-10 size-44 rounded-full border ${tone.decoration}`}
                                    />

                                    <div
                                        className={`pointer-events-none absolute -top-6 -right-4 -z-10 size-28 rounded-full border ${tone.decoration}`}
                                    />

                                    {/* Pattern */}
                                    <div
                                        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.09]"
                                        style={{
                                            backgroundImage:
                                                'repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 13px)',
                                            maskImage:
                                                'linear-gradient(135deg, black, transparent 55%)',
                                        }}
                                    />

                                    {/* Card header */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                                            <Icon
                                                name="quote"
                                                size={24}
                                                className="opacity-80 transition-opacity group-hover:opacity-100"
                                            />
                                        </div>

                                        <span
                                            className={`text-caption font-semibold tracking-[0.2em] ${tone.number}`}
                                        >
                                            {String(
                                                ((active + index) % total) + 1,
                                            ).padStart(2, '0')}
                                        </span>
                                    </div>

                                    {/* Quote */}
                                    <blockquote
                                        className={`mt-7 flex-1 text-body leading-relaxed font-medium tracking-tight sm:text-subheading ${tone.quote}`}
                                    >
                                        “{item.quote}”
                                    </blockquote>

                                    {/* User information */}
                                    <div
                                        className={`mt-space-2xl flex items-center gap-space-md border-t pt-space-xl ${tone.divider}`}
                                    >
                                        <span
                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-caption font-bold ${tone.initials}`}
                                        >
                                            {item.initials}
                                        </span>

                                        <div className="min-w-0">
                                            <p
                                                className={`truncate text-body font-semibold ${tone.name}`}
                                            >
                                                {item.name}
                                            </p>

                                            <p
                                                className={`mt-space-xs truncate text-caption ${tone.role}`}
                                            >
                                                {item.role}
                                            </p>
                                        </div>

                                        <div className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                            <Icon
                                                name="arrow-up-right"
                                                size={15}
                                            />
                                        </div>
                                    </div>

                                    {/* Bottom accent */}
                                    <div
                                        className={`absolute right-7 bottom-0 left-7 h-[3px] origin-left scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100 ${tone.accent}`}
                                    />
                                </article>
                            );
                        })}
                    </div>

                    {/* Navigation */}
                    <div className="mt-space-2xl flex flex-wrap items-center justify-between gap-5">
                        <div className="flex items-center gap-space-sm">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setActive(index)}
                                    aria-label={`Tampilkan testimoni ${index + 1}`}
                                    aria-current={
                                        active === index ? 'true' : undefined
                                    }
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        active === index
                                            ? 'w-8 bg-[#F97316]'
                                            : 'w-2 bg-orange-200 hover:bg-[#FB923C]'
                                    }`}
                                />
                            ))}

                            <span className="ml-space-sm text-caption font-medium text-gray-400">
                                {active + 1} / {total}
                            </span>
                        </div>

                        <div className="flex gap-space-sm">
                            <button
                                type="button"
                                onClick={() => change(-1)}
                                aria-label="Testimoni sebelumnya"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-orange-200 bg-white text-[#171717] transition-all hover:border-[#EA580C] hover:bg-[#EA580C] hover:text-white"
                            >
                                <Icon name="chevron-left" size={18} />
                            </button>

                            <button
                                type="button"
                                onClick={() => change(1)}
                                aria-label="Testimoni berikutnya"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-orange-200 bg-white text-[#171717] transition-all hover:border-[#EA580C] hover:bg-[#EA580C] hover:text-white"
                            >
                                <Icon name="chevron-right" size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <p className="mt-space-2xl text-center text-caption leading-6 text-gray-400">
                    Pernyataan di atas adalah ilustrasi kebutuhan pengguna,
                    bukan testimoni nyata.
                </p>
            </div>
        </section>
    );
}
