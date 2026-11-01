
export type Asset = {
    id: number;
    name: string;
    category: 'Elektronik' | 'Ruangan' | 'Peralatan';
    location: string;
    status: 'Tersedia' | 'Perlu Pemeriksaan' | 'Maintenance';
    description: string;
    image: string;
    code: string;
};

export const assets: Asset[] = [
    {
        id: 1,
        name: 'Proyektor Multimedia',
        category: 'Elektronik',
        location: 'Ruang Kuliah',
        status: 'Tersedia',
        description: 'Perangkat presentasi untuk kegiatan perkuliahan, seminar, dan rapat.',
        image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=85',
        code: 'DEMO-EL-001',
    },
    {
        id: 2,
        name: 'Ruang Diskusi',
        category: 'Ruangan',
        location: 'Gedung Fakultas',
        status: 'Tersedia',
        description: 'Ruang untuk diskusi kelompok, koordinasi organisasi, dan kegiatan akademik.',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
        code: 'DEMO-RG-002',
    },
    {
        id: 3,
        name: 'Laptop Presentasi',
        category: 'Elektronik',
        location: 'Laboratorium',
        status: 'Tersedia',
        description: 'Perangkat komputasi untuk demonstrasi dan kegiatan akademik.',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85',
        code: 'DEMO-EL-003',
    },
    {
        id: 4,
        name: 'Kamera Dokumentasi',
        category: 'Elektronik',
        location: 'Ruang Administrasi',
        status: 'Perlu Pemeriksaan',
        description: 'Kamera untuk dokumentasi kegiatan fakultas. Status ini merupakan data simulasi.',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85',
        code: 'DEMO-EL-004',
    },
    {
        id: 5,
        name: 'Ruang Seminar',
        category: 'Ruangan',
        location: 'Gedung Fakultas',
        status: 'Tersedia',
        description: 'Ruang kegiatan presentasi, seminar, dan pertemuan dengan kapasitas sesuai ketentuan.',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85',
        code: 'DEMO-RG-005',
    },
    {
        id: 6,
        name: 'Perangkat Audio',
        category: 'Peralatan',
        location: 'Ruang Serbaguna',
        status: 'Maintenance',
        description: 'Perangkat pendukung audio untuk acara dan kegiatan fakultas.',
        image: 'https://images.unsplash.com/photo-1593078166031-9e8e9c4e3a9e?auto=format&fit=crop&w=900&q=85',
        code: 'DEMO-PR-006',
    },
    {
        id: 7,
        name: 'Monitor Presentasi',
        category: 'Elektronik',
        location: 'Laboratorium',
        status: 'Tersedia',
        description: 'Monitor untuk menunjang kegiatan praktik, demonstrasi, dan presentasi.',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=85',
        code: 'DEMO-EL-007',
    },
    {
        id: 8,
        name: 'Ruang Rapat',
        category: 'Ruangan',
        location: 'Gedung Fakultas',
        status: 'Tersedia',
        description: 'Ruang koordinasi dan rapat untuk kebutuhan akademik maupun organisasi.',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85',
        code: 'DEMO-RG-008',
    },
];

export const articles = [
    {
        id: 1,
        category: 'Manajemen Aset',
        title: 'Pentingnya Inventarisasi Aset di Lingkungan Fakultas',
        description: `Inventarisasi aset merupakan langkah penting untuk memastikan seluruh barang dan fasilitas fakultas tercatat dengan baik.

        Melalui pencatatan yang terstruktur, pengelola dapat mengetahui jumlah, lokasi, kondisi, serta status kepemilikan setiap aset. Data inventaris yang akurat juga membantu mengurangi risiko kehilangan dan kesalahan pencatatan.

        Pengelolaan inventaris yang baik menjadi dasar dalam pengambilan keputusan terkait pemeliharaan, pengadaan, dan pemanfaatan fasilitas fakultas.`,
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200',
        href: '#',
    },
    {
        id: 2,
        category: 'Peminjaman',
        title: 'Panduan Peminjaman Fasilitas untuk Kegiatan Akademik',
        description: `Fasilitas fakultas sering digunakan untuk mendukung kegiatan perkuliahan, organisasi mahasiswa, maupun kegiatan akademik lainnya.

        Agar penggunaan fasilitas berjalan tertib, proses peminjaman perlu memperhatikan ketersediaan barang, jadwal penggunaan, identitas peminjam, dan tujuan peminjaman.

        Komunikasi yang jelas antara peminjam dan pengelola membantu memastikan fasilitas dapat digunakan sesuai kebutuhan.`,
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200',
        href: '#',
    },
    {
        id: 3,
        category: 'Pemeliharaan',
        title: 'Menjaga Kondisi Aset melalui Pemeliharaan Berkala',
        description: `Setiap aset membutuhkan perhatian agar tetap berfungsi dengan baik dan memiliki masa penggunaan yang optimal.

        Pemeliharaan berkala dapat dilakukan melalui pemeriksaan kondisi fisik, pengujian fungsi, pembersihan, serta perbaikan apabila ditemukan kerusakan.

        Dengan jadwal pemeliharaan yang terencana, potensi kerusakan lebih serius dapat diketahui lebih awal sehingga biaya perbaikan dapat dikendalikan.`,
        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1200',
        href: '#',
    },
    {
        id: 4,
        category: 'Teknologi',
        title: 'Pemanfaatan RFID untuk Identifikasi dan Pelacakan Aset',
        description: `Radio Frequency Identification (RFID) merupakan teknologi yang memungkinkan identifikasi objek menggunakan gelombang radio.

        Dalam pengelolaan aset, RFID dapat digunakan untuk membantu proses identifikasi barang secara lebih praktis melalui tag dan perangkat pembaca.

        Penerapan teknologi ini berpotensi mendukung pencatatan inventaris, mempercepat pemeriksaan aset, dan meningkatkan keteraturan pengelolaan fasilitas.`,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
        href: '#',
    },
    {
        id: 5,
        category: 'Tata Kelola',
        title: 'Membangun Pengelolaan Fasilitas yang Transparan dan Teratur',
        description: `Pengelolaan fasilitas yang baik tidak hanya berkaitan dengan pencatatan barang, tetapi juga bagaimana informasi aset dapat dikelola secara transparan.

        Data yang tersusun dengan baik membantu pengelola memantau penggunaan fasilitas, mengetahui kondisi aset, dan mengevaluasi kebutuhan pemeliharaan.

        Dukungan sistem informasi dapat membantu menyatukan berbagai informasi tersebut sehingga proses pengelolaan menjadi lebih mudah dipantau dan dipertanggungjawabkan.`,
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200',
        href: '#',
    },
];

export const testimonials = [
    {
        quote: 'Informasi aset yang terpusat dapat membantu proses pencarian dan pemantauan menjadi lebih terarah.',
        name: 'Perspektif Pengelola',
        role: 'Contoh kebutuhan pengguna',
        initials: 'PG',
    },
    {
        quote: 'Alur pengajuan dan jadwal pengembalian yang jelas membantu peminjam memahami tahapan yang perlu dilakukan.',
        name: 'Perspektif Peminjam',
        role: 'Contoh kebutuhan pengguna',
        initials: 'PM',
    },
    {
        quote: 'Catatan kondisi dan riwayat perawatan memudahkan penelusuran aset yang perlu diperiksa lebih lanjut.',
        name: 'Perspektif Pemeliharaan',
        role: 'Contoh kebutuhan pengguna',
        initials: 'MT',
    },
];

export const faqs = [
    {
        question: 'Apa itu FAMS?',
        answer: 'Faculty Asset Management System adalah rancangan aplikasi berbasis web untuk mendukung pengelolaan aset dan fasilitas fakultas, termasuk peminjaman, pengembalian, pemantauan kondisi, dan perawatan.',
    },
    {
        question: 'Siapa yang dapat menggunakan FAMS?',
        answer: 'Sistem dirancang untuk pengelola aset serta peminjam, seperti mahasiswa, dosen, dan organisasi yang menggunakan fasilitas sesuai kebijakan fakultas.',
    },
    {
        question: 'Aset apa saja yang dapat dikelola?',
        answer: 'Rancangan FAMS mencakup barang dan fasilitas ruangan. Jenis aset yang benar-benar tersedia bergantung pada inventaris resmi yang dimasukkan oleh pengelola.',
    },
    {
        question: 'Bagaimana cara mengajukan peminjaman?',
        answer: 'Secara konsep, pengguna memilih aset, memeriksa ketersediaan, mengisi tujuan dan jadwal, lalu mengirim pengajuan untuk diproses sesuai kebijakan fakultas.',
    },
    {
        question: 'Apakah semua pengajuan langsung disetujui?',
        answer: 'Tidak. Pengajuan dapat menunggu persetujuan, disetujui, atau ditolak sesuai ketersediaan aset dan kebijakan pengelola.',
    },
    {
        question: 'Apakah FAMS mendukung peminjaman ruangan?',
        answer: 'Ya, pengelolaan barang dan ruangan termasuk dalam rancangan sistem. Detail aturan jadwal, kapasitas, dan persetujuan perlu ditetapkan oleh fakultas.',
    },
    {
        question: 'Apa fungsi RFID di FAMS?',
        answer: 'RFID direncanakan untuk membantu identifikasi aset pada proses pengambilan dan pengembalian. Fungsinya memerlukan perangkat RFID serta integrasi teknis yang sesuai.',
    },
    {
        question: 'Bagaimana jika aset mengalami kerusakan?',
        answer: 'Rancangan sistem menyediakan proses pelaporan masalah, dokumentasi kerusakan, tindak lanjut, dan pencatatan riwayat perawatan.',
    },
    {
        question: 'Apakah katalog aset ini sudah menampilkan data resmi?',
        answer: 'Belum. Katalog pada halaman demo menggunakan data simulasi untuk memperlihatkan desain. Informasi aset aktual harus bersumber dari inventaris resmi fakultas.',
    },
    {
        question: 'Bagaimana cara mendapatkan bantuan atau informasi lebih lanjut?',
        answer: 'Gunakan bagian kontak pada halaman ini. Informasi kontak dan tautan WhatsApp perlu disesuaikan dengan kontak resmi pengelola FAMS.',
    },
];
