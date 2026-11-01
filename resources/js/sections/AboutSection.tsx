import Icon from '../components/Icon';

const principles = [
    { number: '01', title: 'Transparansi informasi', text: 'Status, lokasi, dan kondisi aset dirancang agar lebih mudah ditelusuri.' },
    { number: '02', title: 'Proses yang terstruktur', text: 'Peminjaman, pengembalian, dan perawatan memiliki alur yang jelas.' },
    { number: '03', title: 'Teknologi yang terintegrasi', text: 'RFID dipertimbangkan sebagai pendukung identifikasi aset sesuai kesiapan perangkat.' },
];

export default function AboutSection() {
    return (
        <section id="tentang" className="bg-neutral-50 px-5 py-24 sm:py-28 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
                <div className="relative overflow-hidden rounded-3xl bg-neutral-200">
                    <img
                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
                        alt="Ilustrasi ruang kerja dan fasilitas"
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover grayscale"
                    />
                    <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-white/95 p-5 backdrop-blur sm:inset-x-7 sm:bottom-7 sm:p-7">
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Proyek kolaboratif</p>
                        <p className="mt-2 text-xl font-semibold">Faculty Asset Management System</p>
                        <p className="mt-2 text-sm text-neutral-500">Kelompok Noventra · Informatika 5A</p>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Tentang FAMS</p>
                    <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                        Mengelola fasilitas dengan cara yang lebih terarah.
                    </h2>
                    <p className="mt-6 text-sm leading-8 text-neutral-500 sm:text-base">
                        FAMS dirancang untuk membantu fakultas mengelola barang dan ruangan, memantau proses peminjaman, mencatat pengembalian, serta menindaklanjuti kerusakan dan perawatan.
                    </p>

                    <div className="mt-9 space-y-6">
                        {principles.map((item) => (
                            <div key={item.number} className="flex gap-4 border-t border-neutral-200 pt-5">
                                <span className="text-xs font-semibold text-neutral-400">{item.number}</span>
                                <div>
                                    <h3 className="text-sm font-semibold">{item.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-neutral-500">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <a href="#fitur" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                        Kenali fitur FAMS <Icon name="arrow-right" size={17} />
                    </a>
                </div>
            </div>
        </section>
    );
}