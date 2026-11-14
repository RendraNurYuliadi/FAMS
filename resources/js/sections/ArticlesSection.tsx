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

        const previousOverflow = document.body.style.overflow;

        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setSelectedArticle(null);
            }
        }

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = previousOverflow;
        };
    }, [selectedArticle]);

    return (
        <>
            <section
                id="artikel"
                className="landing-section relative overflow-hidden bg-surface-warm px-space-lg py-space-section-sm sm:py-space-section lg:px-space-2xl lg:py-space-section-lg"
            >
                {/* Soft Background Accent */}
                <div className="pointer-events-none absolute -top-32 -right-32 size-[420px] rounded-full bg-orange-200/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-40 -left-32 size-[420px] rounded-full bg-white/80 blur-3xl" />

                <div className="relative mx-auto max-w-7xl">
                    {/* Section Heading */}
                    <div className="flex flex-col gap-space-xl sm:flex-row sm:items-end sm:justify-between">
                        <SectionHeading
                            eyebrow="Wawasan & Panduan"
                            title="Memahami pengelolaan aset lebih jauh."
                            description="Materi edukasi seputar pengelolaan dan pemanfaatan fasilitas fakultas."
                            centered={false}
                        />

                        {/* Carousel Navigation */}
                        <div className="flex gap-space-sm">
                            <button
                                type="button"
                                onClick={() => move(-1)}
                                disabled={active === 0}
                                aria-label="Artikel sebelumnya"
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-100 bg-white text-[#171717] shadow-sm transition-all duration-300 hover:border-[#F97316] hover:bg-[#FFF0E3] hover:text-[#EA580C] disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <Icon name="chevron-left" />
                            </button>

                            <button
                                type="button"
                                onClick={() => move(1)}
                                disabled={active === maxStart}
                                aria-label="Artikel berikutnya"
                                className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-100 bg-white text-[#171717] shadow-sm transition-all duration-300 hover:border-[#F97316] hover:bg-[#FFF0E3] hover:text-[#EA580C] disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <Icon name="chevron-right" />
                            </button>
                        </div>
                    </div>

                    {/* Article Cards */}
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
                        {articles
                            .slice(active, active + visibleCount)
                            .map((article, index) => (
                                <button
                                    key={article.id}
                                    type="button"
                                    onClick={() => setSelectedArticle(article)}
                                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-orange-100/80 bg-white text-left shadow-[0_8px_30px_rgba(23,23,23,0.05)] transition-all duration-500 hover:-translate-y-2 hover:border-orange-300 hover:shadow-[0_22px_45px_rgba(234,88,12,0.13)]"
                                >
                                    {/* Image Area */}
                                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FFF0E3]">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Image Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/10 transition-opacity duration-500 group-hover:from-black/65" />

                                        {/* Article Number */}
                                        <span className="absolute top-5 left-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 bg-black/20 text-sm font-semibold text-white backdrop-blur-md">
                                            {String(
                                                active + index + 1,
                                            ).padStart(2, '0')}
                                        </span>

                                        {/* Category */}
                                        <span className="absolute top-5 right-5 rounded-full border border-white/40 bg-white/95 px-3.5 py-2 text-[10px] font-bold tracking-[0.12em] text-[#EA580C] shadow-sm backdrop-blur-md">
                                            {article.category}
                                        </span>

                                        {/* Image Caption */}
                                        <div className="absolute right-6 bottom-6 left-6">
                                            <div className="mb-3 flex items-center gap-2">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
                                                <span className="text-[10px] font-semibold tracking-[0.18em] text-white/80">
                                                    FAMS INSIGHT
                                                </span>
                                            </div>

                                            <h3 className="line-clamp-2 text-xl leading-snug font-bold text-white sm:text-2xl">
                                                {article.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                                        <p className="line-clamp-3 text-sm leading-7 text-gray-500">
                                            {article.description}
                                        </p>

                                        {/* Card Footer */}
                                        <div className="mt-auto pt-7">
                                            <div className="flex items-center justify-between border-t border-orange-100 pt-5">
                                                <span className="text-xs font-semibold tracking-wide text-[#171717] transition-colors duration-300 group-hover:text-[#EA580C]">
                                                    Jelajahi artikel
                                                </span>

                                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF0E3] text-[#EA580C] transition-all duration-300 group-hover:rotate-[-45deg] group-hover:bg-[#F97316] group-hover:text-white">
                                                    <Icon
                                                        name="arrow-up-right"
                                                        size={19}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#F97316] transition-all duration-500 group-hover:w-full" />
                                </button>
                            ))}
                    </div>

                    {/* Carousel Indicators */}
                    <div
                        className="mt-space-2xl flex justify-center gap-space-sm"
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
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        active === index
                                            ? 'w-8 bg-[#F97316]'
                                            : 'w-2 bg-orange-200 hover:bg-[#EA580C]'
                                    }`}
                                />
                            ),
                        )}
                    </div>

                    {/* Content Notice */}
                    <p className="mt-5 text-center text-caption text-gray-500">
                        Konten artikel merupakan contoh dan belum berupa
                        publikasi resmi FAMS.
                    </p>
                </div>
            </section>

            {/* Article Detail Modal */}
            {selectedArticle && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171717]/75 p-4 backdrop-blur-md sm:p-6"
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
                        className="relative grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.25)] md:grid-cols-[0.9fr_1.1fr]"
                    >
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={() => setSelectedArticle(null)}
                            aria-label="Tutup artikel"
                            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/40 bg-white/95 text-gray-800 shadow-lg backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:bg-[#F97316] hover:text-white"
                        >
                            <Icon name="close" size={18} />
                        </button>

                        {/* Modal Image Panel */}
                        <div className="group relative min-h-[230px] overflow-hidden bg-[#FFF0E3] sm:min-h-[300px] md:min-h-[560px]">
                            <img
                                src={selectedArticle.image}
                                alt={selectedArticle.title}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10" />

                            {/* Image Decoration */}
                            <div className="absolute top-6 left-6 flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-4 py-2 backdrop-blur-md">
                                <span className="h-2 w-2 rounded-full bg-[#F97316]" />
                                <span className="text-[10px] font-bold tracking-[0.18em] text-white">
                                    FAMS INSIGHT
                                </span>
                            </div>

                            {/* Image Bottom Information */}
                            <div className="absolute right-7 bottom-8 left-7 sm:right-9 sm:bottom-10 sm:left-9">
                                <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-4 py-2 text-[10px] font-semibold tracking-wider text-white backdrop-blur-md">
                                    {selectedArticle.category}
                                </span>

                                <div className="mt-5 h-1 w-12 rounded-full bg-[#F97316]" />

                                <p className="mt-4 text-xs font-medium tracking-[0.16em] text-white/70">
                                    WAWASAN PENGELOLAAN ASET
                                </p>
                            </div>
                        </div>

                        {/* Modal Content Panel */}
                        <div className="flex min-h-0 flex-col overflow-y-auto bg-white">
                            <div className="flex-1 p-6 sm:p-9 lg:p-11">
                                {/* Modal Eyebrow */}
                                <div className="flex items-center gap-3">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF0E3] text-[#EA580C]">
                                        <Icon name="book" size={17} />
                                    </span>

                                    <div>
                                        <p className="text-[10px] font-bold tracking-[0.16em] text-[#EA580C]">
                                            ARTIKEL & EDUKASI
                                        </p>
                                        <p className="mt-0.5 text-[10px] text-gray-400">
                                            Faculty Asset Management System
                                        </p>
                                    </div>
                                </div>

                                {/* Article Title */}
                                <h2
                                    id="article-modal-title"
                                    className="mt-9 text-2xl leading-tight font-bold tracking-tight text-[#171717] sm:text-3xl lg:text-4xl"
                                >
                                    {selectedArticle.title}
                                </h2>

                                {/* Accent Divider */}
                                <div className="mt-7 flex items-center gap-2">
                                    <span className="h-1 w-12 rounded-full bg-[#F97316]" />
                                    <span className="h-1 w-3 rounded-full bg-orange-200" />
                                    <span className="h-1 w-1 rounded-full bg-orange-100" />
                                </div>

                                {/* Article Description */}
                                <div className="mt-8">
                                    <p className="mb-4 text-[10px] font-bold tracking-[0.16em] text-gray-400">
                                        RINGKASAN ARTIKEL
                                    </p>

                                    <p className="text-sm leading-8 whitespace-pre-line text-gray-600 sm:text-base">
                                        {selectedArticle.description}
                                    </p>
                                </div>

                                {/* Information Note */}
                                <div className="mt-9 flex gap-3 rounded-xl border border-orange-100 bg-[#FFF7ED] p-4">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFF0E3] text-[#EA580C]">
                                        <Icon name="info" size={17} />
                                    </span>

                                    <div>
                                        <p className="text-xs font-semibold text-[#171717]">
                                            Informasi FAMS
                                        </p>
                                        <p className="mt-1 text-xs leading-6 text-gray-500">
                                            Konten ini merupakan materi contoh
                                            untuk memberikan wawasan mengenai
                                            pengelolaan aset dan fasilitas
                                            fakultas.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex flex-col gap-4 border-t border-orange-100 bg-[#FFFCF8] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-9 lg:px-11">
                                <p className="text-[10px] font-medium tracking-wide text-gray-400">
                                    FACULTY ASSET MANAGEMENT SYSTEM
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setSelectedArticle(null)}
                                    className="inline-flex h-11 items-center justify-center gap-3 rounded-xl bg-charcoal-900 px-6 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#EA580C]"
                                >
                                    Tutup artikel
                                    <Icon name="arrow-right" size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
