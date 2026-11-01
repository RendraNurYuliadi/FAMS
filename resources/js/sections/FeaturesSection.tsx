import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';

const features = [
    { icon: 'box' as const, title: 'Manajemen Aset', text: 'Kelola identitas, kategori, lokasi, foto, kondisi, dan riwayat aset.' },
    { icon: 'calendar' as const, title: 'Peminjaman Terstruktur', text: 'Atur tujuan, jadwal, penanggung jawab, dan persetujuan peminjaman.' },
    { icon: 'check' as const, title: 'Pengembalian', text: 'Catat pengembalian dan verifikasi kondisi aset.' },
    { icon: 'rfid' as const, title: 'Identifikasi RFID', text: 'Dukung identifikasi aset pada proses pengambilan dan pengembalian.' },
    { icon: 'wrench' as const, title: 'Perawatan Aset', text: 'Catat pengaduan, tindak lanjut, dan riwayat maintenance.' },
    { icon: 'chart' as const, title: 'Laporan Pengelolaan', text: 'Siapkan ringkasan aset, transaksi, keterlambatan, dan perawatan.' },
];

export default function FeaturesSection() {
    return (
        <section id="fitur" className="bg-white px-5 py-24 sm:py-28 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <SectionHeading
                    eyebrow="Fitur Sistem"
                    title="Dirancang mengikuti kebutuhan pengelolaan aset."
                    description="Fungsi utama FAMS disusun berdasarkan alur kerja pengelola dan peminjam, bukan sekadar kumpulan menu."
                />

                <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <article key={feature.title} className="bg-white p-7 transition hover:bg-neutral-50 sm:p-8">
                            <div className="flex items-center justify-between">
                                <Icon name={feature.icon} size={23} />
                                <span className="text-xs text-neutral-300">0{index + 1}</span>
                            </div>
                            <h3 className="mt-8 text-lg font-semibold">{feature.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-neutral-500">{feature.text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}