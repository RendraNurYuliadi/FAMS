
import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';
import { testimonials } from '../data/landing';

const testimonialTones = [
    {
        card: 'from-neutral-950 via-neutral-800 to-neutral-600 text-white',
        number: 'text-white/50',
        quote: 'text-white',
        divider: 'border-white/20',
        initials: 'bg-white text-neutral-950',
        name: 'text-white',
        role: 'text-white/60',
        decoration: 'border-white/10 bg-white/5',
    },
    {
        card: 'from-white via-neutral-50 to-neutral-200 text-neutral-950',
        number: 'text-neutral-500',
        quote: 'text-neutral-800',
        divider: 'border-neutral-300',
        initials: 'bg-neutral-800 text-white',
        name: 'text-neutral-950',
        role: 'text-neutral-500',
        decoration: 'border-neutral-500/15 bg-white/40',
    },
    {
        card: 'from-neutral-300 via-neutral-200 to-neutral-100 text-neutral-950',
        number: 'text-neutral-600',
        quote: 'text-neutral-900',
        divider: 'border-neutral-400',
        initials: 'bg-neutral-950 text-white',
        name: 'text-neutral-950',
        role: 'text-neutral-600',
        decoration: 'border-neutral-700/15 bg-white/30',
    },
];

export default function TestimonialsSection() {
    const [active, setActive] = useState(0);

    const total = testimonials.length;

    function change(direction: number) {
        setActive((current) => (current + direction + total) % total);
    }

    function getTestimonial(index: number) {
        return testimonials[(active + index) % total];
    }

    return (
        <section className="relative isolate overflow-hidden bg-neutral-100 px-5 py-24 sm:py-28 lg:px-8">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(23,23,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.05) 1px, transparent 1px)',
                        backgroundSize: '38px 38px',
                        maskImage:
                            'radial-gradient(ellipse at center, black 10%, transparent 78%)',
                    }}
                />
                <div className="absolute -left-36 top-0 size-96 rounded-full bg-white blur-3xl" />
                <div className="absolute -right-36 bottom-0 size-96 rounded-full bg-neutral-400/40 blur-3xl" />
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
                        {Array.from({ length: Math.min(3, total) }).map((_, index) => {
                            const item = getTestimonial(index);
                            const tone = testimonialTones[index % testimonialTones.length];

                            return (
                                <article
                                    key={`${active}-${index}`}
                                    className={`group relative isolate flex min-h-[300px] flex-col overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br ${tone.card} p-7 shadow-[0_16px_45px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:p-8`}
                                >
                                    <div className={`pointer-events-none absolute -right-12 -top-14 -z-10 size-44 rounded-full border ${tone.decoration}`} />
                                    <div className={`pointer-events-none absolute -right-4 -top-6 -z-10 size-28 rounded-full border ${tone.decoration}`} />
                                    <div
                                        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
                                        style={{
                                            backgroundImage:
                                                'repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 13px)',
                                            maskImage:
                                                'linear-gradient(135deg, black, transparent 55%)',
                                        }}
                                    />
                                    <div className="flex items-center justify-between">
                                        <Icon
                                            name="quote"
                                            size={30}
                                            className="opacity-60 transition-opacity group-hover:opacity-100"
                                        />

                                        <span className={`text-xs font-medium tracking-widest ${tone.number}`}>
                                            {String(((active + index) % total) + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    <blockquote className={`mt-7 flex-1 text-base font-medium leading-relaxed tracking-tight ${tone.quote} sm:text-lg`}>
                                        “{item.quote}”
                                    </blockquote>

                                    <div className={`mt-8 flex items-center gap-3 border-t pt-6 ${tone.divider}`}>
                                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${tone.initials}`}>
                                            {item.initials}
                                        </span>

                                        <div className="min-w-0">
                                            <p className={`truncate text-sm font-semibold ${tone.name}`}>
                                                {item.name}
                                            </p>
                                            <p className={`mt-1 truncate text-xs ${tone.role}`}>
                                                {item.role}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {/* Navigation */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setActive(index)}
                                    aria-label={`Tampilkan testimoni ${index + 1}`}
                                    aria-current={active === index ? 'true' : undefined}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        active === index
                                            ? 'w-8 bg-neutral-950'
                                            : 'w-2 bg-neutral-300 hover:bg-neutral-500'
                                    }`}
                                />
                            ))}

                            <span className="ml-2 text-xs text-neutral-400">
                                {active + 1} / {total}
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => change(-1)}
                                aria-label="Testimoni sebelumnya"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-all hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
                            >
                                <Icon name="chevron-left" size={18} />
                            </button>

                            <button
                                type="button"
                                onClick={() => change(1)}
                                aria-label="Testimoni berikutnya"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 transition-all hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
                            >
                                <Icon name="chevron-right" size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-center text-xs leading-6 text-neutral-400">
                    Pernyataan di atas adalah ilustrasi kebutuhan pengguna, bukan testimoni nyata.
                </p>
            </div>
        </section>
    );
}
