
import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import Icon from './Icon';

const links = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Ringkasan', href: '#overview' },
    { label: 'Tentang', href: '#tentang' },
    { label: 'Fitur', href: '#fitur' },
    { label: 'Kalender', href: '#kalender' },
    { label: 'Katalog Aset', href: '#aset' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Kontak', href: '#kontak' },
];

function SectionNavigation({
    activeSection,
    variant,
}: {
    activeSection: string;
    variant: 'desktop' | 'tablet';
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const [isCompact, setIsCompact] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        const measurement = measureRef.current;

        if (!container || !measurement) return;

        const updateVisibleLinks = () => {
            setIsCompact(measurement.scrollWidth > container.clientWidth);
        };

        const observer = new ResizeObserver(updateVisibleLinks);
        observer.observe(container);
        observer.observe(measurement);
        updateVisibleLinks();

        return () => observer.disconnect();
    }, []);

    const visibleLinks = isCompact ? links.slice(0, 4) : links;
    const hiddenLinks = isCompact ? links.slice(4) : [];
    const spacing = variant === 'desktop' ? 'gap-1' : 'gap-1';
    const linkStyle =
        variant === 'desktop'
            ? 'rounded-full px-2 py-2 text-[11px]'
            : 'shrink-0 rounded-full px-3 py-2 text-xs';

    return (
        <div
            ref={containerRef}
            className={`relative flex min-w-0 items-center justify-center ${spacing}`}
        >
            <div
                ref={measureRef}
                aria-hidden="true"
                className={`pointer-events-none absolute -z-10 flex w-max items-center ${spacing} opacity-0`}
            >
                {links.map((link) => (
                    <span
                        key={link.href}
                        className={`${linkStyle} font-medium`}
                    >
                        {link.label}
                    </span>
                ))}
            </div>

            {visibleLinks.map((link) => (
                <a
                    key={link.href}
                    href={link.href}
                    aria-current={activeSection === link.href ? 'location' : undefined}
                    className={`${linkStyle} shrink-0 transition-all duration-200 ${
                        activeSection === link.href
                            ? 'font-bold text-neutral-950'
                            : 'font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
                    }`}
                >
                    {link.label}
                </a>
            ))}

            {hiddenLinks.length > 0 && (
                <div className="relative shrink-0">
                    <button
                        type="button"
                        aria-expanded={moreOpen}
                        aria-haspopup="true"
                        onClick={() => setMoreOpen((isOpen) => !isOpen)}
                        className={`${linkStyle} inline-flex items-center gap-1 font-semibold text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950`}
                    >
                        Lainnya
                        <Icon name="menu" size={14} />
                    </button>

                    {moreOpen && (
                        <div className="absolute right-0 top-full z-[60] mt-2 min-w-44 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl">
                            {hiddenLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    aria-current={activeSection === link.href ? 'location' : undefined}
                                    onClick={() => setMoreOpen(false)}
                                    className={`block rounded-lg px-3 py-2.5 text-sm transition ${
                                        activeSection === link.href
                                            ? 'font-bold text-neutral-950'
                                            : 'font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
                                    }`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('#beranda');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const sections = links
            .map((link) => document.querySelector<HTMLElement>(link.href))
            .filter((section): section is HTMLElement => section !== null);

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (first, second) =>
                            second.intersectionRatio - first.intersectionRatio,
                    );

                if (visibleSections[0]?.target instanceof HTMLElement) {
                    setActiveSection(`#${visibleSections[0].target.id}`);
                }
            },
            {
                rootMargin: '-20% 0px -65% 0px',
                threshold: [0, 0.15, 0.35, 0.6],
            },
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'border-b border-neutral-200 bg-white/95 shadow-sm backdrop-blur-xl'
                    : 'border-b border-transparent bg-white'
            }`}
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
                <a href="#beranda" className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 text-base font-bold text-white">
                        F
                    </span>
                    <span>
                        <span className="block text-lg font-semibold tracking-tight">
                            FAMS<span className="text-neutral-400">.</span>
                        </span>
                        <span className="hidden text-[9px] font-medium tracking-[0.16em] text-neutral-500 sm:block">
                            FACULTY ASSET MANAGEMENT
                        </span>
                    </span>
                </a>

                <div className="hidden min-w-0 flex-1 justify-center px-4 xl:flex">
                    <SectionNavigation
                        activeSection={activeSection}
                        variant="desktop"
                    />
                </div>

                <div className="hidden xl:block">
                    <Button href="/splash-login">
                        Masuk<Icon name="arrow-up-right" size={16} />
                    </Button>
                </div>

                <button
                    type="button"
                    aria-label={open ? 'Tutup navigasi' : 'Buka navigasi'}
                    aria-expanded={open}
                    onClick={() => setOpen(!open)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 md:hidden"
                >
                    <Icon name={open ? 'close' : 'menu'} />
                </button>
            </nav>

            <nav
                aria-label="Navigasi section"
                className="hidden border-t border-neutral-100 px-5 py-2 md:block xl:hidden"
            >
                <div className="mx-auto max-w-7xl">
                    <SectionNavigation
                        activeSection={activeSection}
                        variant="tablet"
                    />
                </div>
            </nav>

            {open && (
                <div className="border-t border-neutral-200 bg-white px-5 py-5 md:hidden">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                aria-current={activeSection === link.href ? 'location' : undefined}
                                className={`rounded-xl px-3 py-3 text-sm transition ${
                                    activeSection === link.href
                                        ? 'font-bold text-neutral-950'
                                        : 'font-medium text-neutral-700 hover:bg-neutral-100'
                                }`}
                            >
                                {link.label}
                            </a>
                        ))}
                        </div>
                        <div className="mt-4">
                        <Button href="/login" onClick={() => setOpen(false)}>
                            Masuk ke Sistem <Icon name="arrow-up-right" size={16} />
                        </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
