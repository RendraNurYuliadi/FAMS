
import { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';
import { testimonials } from '../data/landing';

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
        <section className="overflow-hidden bg-neutral-50 px-5 py-24 sm:py-28 lg:px-8">
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

                            return (
                                <article
                                    key={`${active}-${index}`}
                                    className="group flex min-h-[300px] flex-col rounded-3xl border border-neutral-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-xl hover:shadow-neutral-200/60 sm:p-8"
                                >
                                    <div className="flex items-center justify-between">
                                        <Icon
                                            name="quote"
                                            size={30}
                                            className="text-neutral-300 transition-colors group-hover:text-neutral-950"
                                        />

                                        <span className="text-xs font-medium tracking-widest text-neutral-300">
                                            {String(((active + index) % total) + 1).padStart(2, '0')}
                                        </span>
                                    </div>

                                    <blockquote className="mt-7 flex-1 text-base font-medium leading-relaxed tracking-tight text-neutral-800 sm:text-lg">
                                        “{item.quote}”
                                    </blockquote>

                                    <div className="mt-8 flex items-center gap-3 border-t border-neutral-100 pt-6">
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-xs font-semibold text-white">
                                            {item.initials}
                                        </span>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-neutral-950">
                                                {item.name}
                                            </p>
                                            <p className="mt-1 truncate text-xs text-neutral-500">
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
