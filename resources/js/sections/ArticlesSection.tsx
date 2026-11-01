
import { useEffect, useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';
import { articles } from '../data/landing';

export default function ArticlesSection() {
    const [active, setActive] = useState(0);
    const [selectedArticle, setSelectedArticle] = useState<
        (typeof articles)[number] | null
    >(null);

    const visibleCount = 3;
    const maxStart = Math.max(0, articles.length - visibleCount);

    function move(direction: number) {
        setActive((current) =>
            Math.max(0, Math.min(maxStart, current + direction)),
        );
    }

    // Tutup modal dengan tombol Escape
    useEffect(() => {
        if (!selectedArticle) return;

        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setSelectedArticle(null);
            }
        }

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [selectedArticle]);

    return (
        <>
            <section
                id="artikel"
                className="bg-white px-5 py-24 sm:py-28 lg:px-8"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <SectionHeading
                            eyebrow="Wawasan & Panduan"
                            title="Memahami pengelolaan aset lebih jauh."
                            description="Materi edukasi seputar pengelolaan dan pemanfaatan fasilitas fakultas."
                            centered={false}
                        />

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => move(-1)}
                                disabled={active === 0}
                                aria-label="Artikel sebelumnya"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <Icon name="chevron-left" />
                            </button>

                            <button
                                type="button"
                                onClick={() => move(1)}
                                disabled={active === maxStart}
                                aria-label="Artikel berikutnya"
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <Icon name="chevron-right" />
                            </button>
                        </div>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {articles
                            .slice(active, active + visibleCount)
                            .map((article) => (
                                <button
                                    key={article.id}
                                    type="button"
                                    onClick={() => setSelectedArticle(article)}
                                    className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white text-left transition duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-lg"
                                >
                                    <div className="block aspect-[16/10] overflow-hidden bg-neutral-100">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <p className="text-[10px] font-semibold tracking-[0.18em] text-neutral-500">
                                            {article.category}
                                        </p>

                                        <h3 className="mt-4 text-lg font-semibold leading-snug text-neutral-950">
                                            {article.title}
                                        </h3>

                                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-neutral-500">
                                            {article.description}
                                        </p>

                                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-950">
                                            Baca selengkapnya
                                            <Icon
                                                name="arrow-up-right"
                                                size={16}
                                            />
                                        </span>
                                    </div>
                                </button>
                            ))}
                    </div>

                    {/* Carousel indicators */}
                    <div
                        className="mt-8 flex justify-center gap-2"
                        aria-label="Posisi carousel artikel"
                    >
                        {Array.from({ length: maxStart + 1 }).map(
                            (_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => setActive(index)}
                                    aria-label={`Tampilkan artikel mulai dari urutan ${index + 1}`}
                                    aria-current={active === index}
                                    className={`h-1.5 rounded-full transition-all ${
                                        active === index
                                            ? 'w-8 bg-black'
                                            : 'w-2 bg-neutral-300 hover:bg-neutral-500'
                                    }`}
                                />
                            ),
                        )}
                    </div>

                    <p className="mt-5 text-center text-xs text-neutral-400">
                        Konten artikel merupakan contoh dan belum berupa
                        publikasi resmi FAMS.
                    </p>
                </div>
            </section>

            {/* Article detail modal */}
            {selectedArticle && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedArticle(null);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="article-modal-title"
                        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedArticle(null)}
                            aria-label="Tutup artikel"
                            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm transition hover:bg-neutral-100"
                        >
                            <Icon name="close" size={18} />
                        </button>

                        <div className="aspect-[16/9] overflow-hidden bg-neutral-100">
                            <img
                                src={selectedArticle.image}
                                alt={selectedArticle.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="p-6 sm:p-8">
                            <p className="text-[10px] font-semibold tracking-[0.18em] text-neutral-500">
                                {selectedArticle.category}
                            </p>

                            <h2
                                id="article-modal-title"
                                className="mt-3 text-2xl font-semibold leading-tight text-neutral-950 sm:text-3xl"
                            >
                                {selectedArticle.title}
                            </h2>

                            <div className="my-6 h-px bg-neutral-200" />

                            <p className="whitespace-pre-line text-sm leading-8 text-neutral-600">
                                {selectedArticle.description}
                            </p>

                            <div className="mt-8 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setSelectedArticle(null)}
                                    className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
                                >
                                    Tutup artikel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
