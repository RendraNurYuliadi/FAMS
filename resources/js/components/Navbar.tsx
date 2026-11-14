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
    dark,
}: {
    activeSection: string;
    variant: 'desktop' | 'tablet';
    dark: boolean;
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
    const spacing = 'gap-space-xs';

    const linkStyle =
        variant === 'desktop'
            ? 'rounded-full px-space-sm py-space-sm text-micro'
            : 'shrink-0 rounded-full px-space-md py-space-sm text-caption';

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
                    aria-current={
                        activeSection === link.href ? 'location' : undefined
                    }
                    className={`${linkStyle} shrink-0 transition-all duration-200 ${
                        activeSection === link.href
                            ? 'bg-primary-500 font-bold text-white'
                            : dark
                              ? 'font-medium text-gray-300 hover:bg-white/10 hover:text-white'
                              : 'font-medium text-gray-700 hover:bg-primary-100 hover:text-text-primary'
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
                        className={`${linkStyle} inline-flex items-center gap-space-xs font-semibold transition ${
                            dark
                                ? 'text-gray-300 hover:bg-white/10 hover:text-white'
                                : 'text-gray-700 hover:bg-primary-100 hover:text-text-primary'
                        }`}
                    >
                        Lainnya
                        <Icon name="menu" size={14} />
                    </button>

                    {moreOpen && (
                        <div
                            className={`absolute top-full right-0 z-[60] mt-space-sm min-w-44 rounded-card border p-space-sm shadow-xl ${
                                dark
                                    ? 'border-white/10 bg-charcoal-800 text-white'
                                    : 'border-primary-100 bg-white text-text-primary'
                            }`}
                        >
                            {hiddenLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    aria-current={
                                        activeSection === link.href
                                            ? 'location'
                                            : undefined
                                    }
                                    onClick={() => setMoreOpen(false)}
                                    className={`block rounded-lg px-space-md py-2.5 text-body transition ${
                                        activeSection === link.href
                                            ? dark
                                                ? 'bg-primary-500/15 font-bold text-primary-400'
                                                : 'bg-primary-soft font-bold text-primary-600'
                                            : dark
                                              ? 'font-medium text-gray-300 hover:bg-white/10 hover:text-white'
                                              : 'font-medium text-gray-700 hover:bg-primary-50 hover:text-text-primary'
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
            className={`landing-navbar sticky top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'landing-navbar--scrolled bg-transparent px-space-md pt-space-md sm:px-space-xl lg:px-space-2xl'
                    : 'bg-surface-warm'
            }`}
        >
            <div
                className={`mx-auto max-w-7xl transition-all duration-300 ${
                    scrolled
                        ? 'rounded-card border border-white/10 bg-charcoal-900 text-white shadow-xl shadow-black/15'
                        : 'text-text-primary'
                }`}
            >
                <nav className="mx-auto flex items-center justify-between gap-4 px-5 py-space-lg lg:px-space-2xl">
                    {/* BRAND */}
                    <a
                        href="#beranda"
                        className="flex shrink-0 items-center gap-space-md"
                    >
                        <span className="flex h-10 w-10 items-center justify-center rounded-card bg-primary-500 text-body font-bold text-white shadow-md shadow-primary-950/20">
                            F
                        </span>

                        <span>
                            <span
                                className={`block text-subheading font-semibold tracking-tight ${
                                    scrolled
                                        ? 'text-white'
                                        : 'text-text-primary'
                                }`}
                            >
                                FAMS <span className="text-primary-500">.</span>
                            </span>

                            <span
                                className={`hidden text-micro font-medium tracking-[0.16em] sm:block ${
                                    scrolled ? 'text-gray-400' : 'text-gray-600'
                                }`}
                            >
                                FACULTY ASSET MANAGEMENT
                            </span>
                        </span>
                    </a>

                    {/* DESKTOP NAVIGATION */}
                    <div className="hidden min-w-0 flex-1 justify-center px-space-lg xl:flex">
                        <SectionNavigation
                            activeSection={activeSection}
                            variant="desktop"
                            dark={scrolled}
                        />
                    </div>

                    {/* LOGIN BUTTON */}
                    <div className="hidden shrink-0 xl:block">
                        <Button href="/splash-login">
                            Masuk
                            <Icon name="arrow-up-right" size={16} />
                        </Button>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        type="button"
                        aria-label={open ? 'Tutup navigasi' : 'Buka navigasi'}
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border transition md:hidden ${
                            scrolled
                                ? 'border-white/15 bg-white/5 text-white hover:border-primary-500/50 hover:bg-primary-500/15'
                                : 'border-primary-200 bg-white/70 text-text-primary hover:border-primary-500 hover:bg-primary-soft'
                        }`}
                    >
                        <Icon name={open ? 'close' : 'menu'} />
                    </button>
                </nav>

                {/* TABLET NAVIGATION */}
                <nav
                    aria-label="Navigasi section"
                    className={`hidden border-t px-5 py-space-sm md:block xl:hidden ${
                        scrolled ? 'border-white/10' : 'border-primary-200/60'
                    }`}
                >
                    <div className="mx-auto max-w-7xl">
                        <SectionNavigation
                            activeSection={activeSection}
                            variant="tablet"
                            dark={scrolled}
                        />
                    </div>
                </nav>

                {/* MOBILE NAVIGATION */}
                {open && (
                    <div
                        className={`border-t px-5 py-5 md:hidden ${
                            scrolled
                                ? 'border-white/10 bg-charcoal-800'
                                : 'border-primary-200/60 bg-surface-warm'
                        }`}
                    >
                        <div className="mx-auto max-w-7xl">
                            <div className="grid grid-cols-2 gap-space-sm sm:grid-cols-3">
                                {links.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setOpen(false)}
                                        aria-current={
                                            activeSection === link.href
                                                ? 'location'
                                                : undefined
                                        }
                                        className={`rounded-xl px-space-md py-space-md text-body transition ${
                                            activeSection === link.href
                                                ? 'bg-primary-500 font-bold text-white'
                                                : scrolled
                                                  ? 'font-medium text-gray-300 hover:bg-white/10 hover:text-white'
                                                  : 'font-medium text-gray-700 hover:bg-primary-100 hover:text-text-primary'
                                        }`}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>

                            <div className="mt-space-lg">
                                <Button
                                    href="/login"
                                    onClick={() => setOpen(false)}
                                >
                                    Masuk ke Sistem{' '}
                                    <Icon name="arrow-up-right" size={16} />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
