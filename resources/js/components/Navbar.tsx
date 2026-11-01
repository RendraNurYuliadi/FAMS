
import { useEffect, useState } from 'react';
import Button from './Button';
import Icon from './Icon';

const links = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Tentang', href: '#tentang' },
    { label: 'Fitur', href: '#fitur' },
    { label: 'Katalog Aset', href: '#aset' },
    { label: 'Artikel', href: '#artikel' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
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

                <div className="hidden items-center gap-7 lg:flex">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-[13px] font-medium text-neutral-600 transition hover:text-black"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <div className="hidden lg:block">
                    <Button href="/splash-login">
                        Masuk<Icon name="arrow-up-right" size={16} />
                    </Button>
                </div>

                <button
                    type="button"
                    aria-label={open ? 'Tutup navigasi' : 'Buka navigasi'}
                    aria-expanded={open}
                    onClick={() => setOpen(!open)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 lg:hidden"
                >
                    <Icon name={open ? 'close' : 'menu'} />
                </button>
            </nav>

            {open && (
                <div className="border-t border-neutral-200 bg-white px-5 py-5 lg:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col gap-5">
                        {links.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="text-sm font-medium text-neutral-700"
                            >
                                {link.label}
                            </a>
                        ))}
                        <Button href="/login" onClick={() => setOpen(false)}>
                            Masuk ke Sistem <Icon name="arrow-up-right" size={16} />
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}
