import Icon from './Icon';

const groups = [
    {
        title: 'Navigasi',
        links: [
            { label: 'Beranda', href: '#beranda' },
            { label: 'Tentang FAMS', href: '#tentang' },
            { label: 'Fitur', href: '#fitur' },
            { label: 'Katalog Aset', href: '#aset' },
        ],
    },
    {
        title: 'Informasi',
        links: [
            { label: 'Cara Kerja', href: '#cara-kerja' },
            { label: 'Artikel', href: '#artikel' },
            { label: 'FAQ', href: '#faq' },
            { label: 'Kontak', href: '#kontak' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="landing-section landing-section--dark relative isolate overflow-hidden border-t border-orange-900/30 bg-charcoal-900 px-5 pt-16 pb-space-2xl text-white lg:px-space-2xl">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute -top-40 -right-40 -z-10 h-96 w-96 rounded-full bg-[#F97316]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-48 left-1/4 -z-10 h-96 w-96 rounded-full bg-orange-950/30 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1fr] lg:gap-10">
                    {/* BRAND */}
                    <div>
                        <a
                            href="#beranda"
                            className="inline-flex items-center gap-3"
                        >
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-400/30 bg-gradient-to-br from-[#F97316] to-[#EA580C] text-xl font-bold text-white shadow-lg shadow-orange-950/30">
                                F
                            </span>

                            <span className="text-card-title font-bold tracking-tight text-white">
                                FAMS<span className="text-[#F97316]">.</span>
                            </span>
                        </a>

                        <p className="mt-6 max-w-sm text-body leading-7 text-gray-400">
                            Faculty Asset Management System. Rancangan sistem
                            pengelolaan aset dan fasilitas fakultas yang
                            terstruktur dan terintegrasi.
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
                            <p className="text-caption font-medium text-gray-400">
                                Kelompok Noventra · Informatika 5A
                            </p>
                        </div>
                    </div>

                    {/* NAVIGATION GROUPS */}
                    {groups.map((group) => (
                        <div key={group.title}>
                            <h3 className="text-body font-bold text-white">
                                {group.title}
                            </h3>

                            <div className="mt-3 h-0.5 w-8 rounded-full bg-[#F97316]" />

                            <ul className="mt-6 space-y-4">
                                {group.links.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="group inline-flex items-center gap-2 text-body text-gray-400 transition hover:text-[#FB923C]"
                                        >
                                            <span className="h-1 w-1 rounded-full bg-gray-600 transition group-hover:bg-[#F97316]" />
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* CONTACT INFORMATION */}
                    <div>
                        <h3 className="text-body font-bold text-white">
                            Informasi Kontak
                        </h3>

                        <div className="mt-3 h-0.5 w-8 rounded-full bg-[#F97316]" />

                        <div className="mt-6 space-y-5">
                            <div className="flex items-start gap-3">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F97316]/10 text-[#F97316]">
                                    <Icon name="building" size={17} />
                                </span>

                                <p className="pt-1 text-body leading-6 text-gray-400">
                                    Faculty Asset Management System
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F97316]/10 text-[#F97316]">
                                    <Icon name="users" size={17} />
                                </span>

                                <p className="pt-1 text-body leading-6 text-gray-400">
                                    Kelompok Noventra
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#F97316]/10 text-[#F97316]">
                                    <Icon name="mail" size={17} />
                                </span>

                                <p className="pt-1 text-body leading-6 text-gray-400">
                                    Kontak resmi belum ditambahkan
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM FOOTER */}
                <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-caption leading-6 text-gray-500">
                        © {new Date().getFullYear()} FAMS
                        <span className="mx-2 text-[#F97316]">•</span>
                        Kelompok Noventra.
                    </p>

                    <a
                        href="#beranda"
                        className="group inline-flex items-center gap-2 text-caption font-semibold text-gray-400 transition hover:text-[#FB923C]"
                    >
                        Kembali ke beranda
                        <span className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] transition group-hover:border-orange-400/30 group-hover:bg-[#F97316] group-hover:text-white">
                            <Icon name="arrow-up" size={14} />
                        </span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
