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
        <footer className="border-t border-neutral-200 bg-white px-5 pb-8 pt-14 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1fr]">
                <div>
                    <a href="#beranda" className="inline-flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-black font-bold text-white">F</span>
                        <span className="text-xl font-semibold tracking-tight">FAMS.</span>
                    </a>
                    <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-500">
                        Faculty Asset Management System. Rancangan sistem pengelolaan aset dan fasilitas fakultas yang terstruktur dan terintegrasi.
                    </p>
                    <p className="mt-4 text-xs text-neutral-400">
                        Proyek kolaboratif Kelompok Noventra · Informatika 5A
                    </p>
                </div>

                {groups.map((group) => (
                    <div key={group.title}>
                        <h3 className="text-sm font-semibold">{group.title}</h3>
                        <ul className="mt-5 space-y-4">
                            {group.links.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-sm text-neutral-500 transition hover:text-black">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                <div>
                    <h3 className="text-sm font-semibold">Informasi Kontak</h3>
                    <div className="mt-5 space-y-4 text-sm text-neutral-500">
                        <p className="flex items-start gap-3">
                            <Icon name="building" size={17} className="mt-0.5 shrink-0" />
                            Faculty Asset Management System
                        </p>
                        <p className="flex items-start gap-3">
                            <Icon name="users" size={17} className="mt-0.5 shrink-0" />
                            Kelompok Noventra
                        </p>
                        <p className="flex items-start gap-3">
                            <Icon name="mail" size={17} className="mt-0.5 shrink-0" />
                            <span>Kontak resmi belum ditambahkan</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-neutral-400">
                    © {new Date().getFullYear()} FAMS · Kelompok Noventra.
                </p>
                <a href="#beranda" className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600 hover:text-black">
                    Kembali ke beranda <Icon name="arrow-up" size={14} />
                </a>
            </div>
        </footer>
    );
}