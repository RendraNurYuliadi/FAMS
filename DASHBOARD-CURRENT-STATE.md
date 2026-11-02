# FAMS Dashboard: Kondisi Project Saat Ini

Dokumen ini merangkum implementasi dashboard yang saat ini ada di project lokal FAMS. Isi source code di repository adalah sumber utama jika ada perubahan setelah dokumen ini dibuat.

## Stack dan cara halaman dirender

- Backend: Laravel.
- Frontend: React + TypeScript.
- Navigasi halaman: Inertia.
- Styling: Tailwind CSS.
- Route web berada di `routes/web.php`.
- File frontend berada di `resources/js`.

Laravel memilih halaman Inertia berdasarkan nama component. Contoh route dashboard saat ini:

```php
Route::get('/dashboard', function () {
    return Inertia::render('dashboard/index');
})->name('dashboard');
```

Halaman tersebut berasal dari `resources/js/pages/dashboard/index.tsx`.

## Alur login menuju dashboard saat ini

1. Halaman login ada di `resources/js/pages/auth/login.tsx`.
2. Form mengirim POST ke `/login`, dengan payload `email`, `password`, `remember`, dan `next_url: "/dashboard"`.
3. Route POST `/login` di `routes/web.php` hanya mengizinkan `next_url` jika nilainya sama dengan URL route dashboard; jika tidak, tujuan diganti menjadi `/dashboard`.
4. Route kemudian melakukan redirect ke `/dashboard`.
5. GET `/dashboard` merender halaman Inertia `dashboard/index`.

Potongan mekanisme saat ini:

```tsx
const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
    next_url: '/dashboard',
});

function submit(e: React.FormEvent) {
    e.preventDefault();

    post('/login', {
        onFinish: () => reset('password'),
    });
}
```

Handler route login saat ini:

```php
Route::post('/login', function (\Illuminate\Http\Request $request) {
    $dashboardUrl = route('dashboard', absolute: false);
    $nextUrl = $request->input('next_url');

    if ($nextUrl !== $dashboardUrl) {
        $nextUrl = $dashboardUrl;
    }

    return redirect()->to($nextUrl);
});
```

**Penting:** login masih berupa mock untuk alur tampilan. Route belum memeriksa email/password, belum membuat sesi autentikasi, dan tidak memakai middleware `auth`. Karena itu dashboard saat ini juga dapat dibuka langsung tanpa login. Jangan menganggap mekanisme ini aman/siap produksi.

## Struktur file dashboard

### Halaman dashboard

Route yang saat ini terdaftar untuk dashboard hanya:

- `GET /dashboard` → `resources/js/pages/dashboard/index.tsx`.

File halaman lain sudah tersedia di frontend, tetapi belum memiliki route Laravel khusus di `routes/web.php`:

```text
resources/js/pages/dashboard/
├── index.tsx
├── aset/
│   ├── index.tsx
│   ├── katalog.tsx
│   ├── kategori.tsx
│   ├── lokasi.tsx
│   └── ruangan.tsx
├── laporan/
│   ├── aset.tsx
│   ├── index.tsx
│   ├── kerusakan.tsx
│   └── peminjaman.tsx
├── pemeliharaan/
│   ├── index.tsx
│   └── jadwal.tsx
├── peminjaman/
│   ├── index.tsx
│   └── pengajuan.tsx
├── pengaduan/
│   ├── index.tsx
│   └── riwayat.tsx
├── pengembalian/
│   ├── index.tsx
│   └── pemeriksaan.tsx
├── pengaturan/
│   ├── index.tsx
│   └── profil.tsx
├── pengguna/
│   ├── index.tsx
│   ├── create.tsx
│   ├── edit.tsx
│   └── organisasi/
│       └── index.tsx
└── rfid/
    ├── index.tsx
    └── pemindaian.tsx
```

Dengan demikian, submenu sidebar yang mengarah ke halaman-halaman selain `/dashboard` belum didukung route Laravel saat ini dan dapat menghasilkan 404.

### Komponen dan konfigurasi

```text
resources/js/
├── components/
│   ├── Icon.tsx
│   ├── config/
│   │   └── dashboard-menu.ts
│   ├── dashboard/
│   │   ├── AssetStatusChart.tsx
│   │   ├── BorrowingChart.tsx
│   │   ├── Breadcrumb.tsx
│   │   ├── Header.tsx
│   │   ├── MaintenanceOverview.tsx
│   │   ├── NotificationDropdown.tsx
│   │   ├── PageHeader.tsx
│   │   ├── PendingRequests.tsx
│   │   ├── RecentActivities.tsx
│   │   ├── SearchCommand.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SidebarMenu.tsx
│   │   ├── StatCard.tsx
│   │   └── UserDropdown.tsx
│   ├── layouts/
│   │   └── DashboardLayout.tsx
│   └── ...
└── types/
    └── dashboard.ts
```

## Mekanisme layout dan sidebar

Halaman `dashboard/index.tsx` membungkus konten dengan `DashboardLayout`.

`DashboardLayout.tsx`:

- Menyimpan state `collapsed` untuk ciut/perluas sidebar desktop.
- Menyimpan state `mobileOpen` untuk membuka/menutup sidebar di layar kecil.
- Menyusun `Sidebar`, tombol navigasi mobile, `Header`, konten halaman, dan footer.
- Mengirim `onOpenSidebar` ke `Header`.

Susunan utamanya:

```tsx
<div className="min-h-screen bg-neutral-50 text-neutral-950">
    <div className="flex min-h-screen items-start">
        <Sidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed((current) => !current)}
            mobileOpen={mobileOpen}
            onCloseMobile={() => setMobileOpen(false)}
        />
        <div className="min-w-0 flex-1">
            <Header onOpenSidebar={() => setMobileOpen(true)} />
            <main>{children}</main>
            <footer>...</footer>
        </div>
    </div>
</div>
```

`Sidebar.tsx` membaca `dashboardMenu` dan `settingsMenu` dari `components/config/dashboard-menu.ts`, lalu membuat item menggunakan `SidebarMenu.tsx`. Sidebar desktop dapat diciutkan; pada layar kecil, sidebar menjadi panel geser dengan overlay.

`SidebarMenu.tsx`:

- Membandingkan URL Inertia sekarang dengan `href` item untuk menandai menu aktif.
- Membuka submenu ketika salah satu child aktif.
- Merender item dan submenu sebagai link Inertia.
- Menggunakan `IconName` untuk tipe ikon.

Menu utama yang dikonfigurasi: Dashboard, Manajemen Aset, Peminjaman, Pengembalian, Pengaduan, Pemeliharaan, RFID & IoT, Laporan, dan Manajemen Pengguna. Menu preferensi: Pengaturan Sistem dan Profil Saya. Sumbernya adalah `resources/js/components/config/dashboard-menu.ts`.

## Isi dashboard saat ini

`resources/js/pages/dashboard/index.tsx` adalah halaman ringkasan dengan:

- Heading Dashboard dan tanggal lokal Indonesia.
- Empat kartu statistik: Total Aset (120), Aset Tersedia (82), Sedang Dipinjam (25), Perlu Pemeriksaan (8).
- Distribusi empat kategori aset.
- Ringkasan angka aktivitas/peminjaman.
- Daftar empat aktivitas terbaru.
- Informasi tindak lanjut di bagian bawah.

Angka, kategori, dan aktivitas ditulis statis di file frontend; halaman belum membaca database atau API. Halaman memberi label “Data ilustrasi”.

`Header.tsx` menampilkan breadcrumb, pencarian UI, `NotificationDropdown`, dan `UserDropdown`.

- `Breadcrumb.tsx` mencari jalur halaman di konfigurasi menu. Jika tidak ditemukan, breadcrumb memakai nama segmen URL.
- `NotificationDropdown.tsx` memakai tiga notifikasi statis dan dapat menandai semuanya dibaca hanya di state browser.
- `UserDropdown.tsx` memakai data auth jika tersedia; jika tidak, menampilkan fallback “Admin FAMS” dan `admin@fams.ac.id`. Menu keluar mengirim POST ke `/logout`, tetapi route logout saat ini hanya mengarahkan ke login dan tidak menghapus sesi.
- Pencarian header masih tampilan UI; belum ada proses pencarian yang terhubung.

Komponen lain seperti `AssetStatusChart.tsx`, `BorrowingChart.tsx`, `RecentActivities.tsx`, `PendingRequests.tsx`, `MaintenanceOverview.tsx`, `StatCard.tsx`, `PageHeader.tsx`, dan `SearchCommand.tsx` tersedia di folder, tetapi halaman `dashboard/index.tsx` saat ini mengimplementasikan sebagian kontennya sendiri dan tidak mengimpor semua komponen tersebut.

## Tipe TypeScript dashboard

`resources/js/types/dashboard.ts` mendefinisikan:

- `UserRole`: `admin | pengelola | peminjam`.
- `DashboardUser`: id opsional, nama, email, role, dan avatar opsional.
- `DashboardMenuItem`: judul, href, ikon bertipe `IconName`, dan children opsional.
- `DashboardNotification`: data notifikasi.
- `DashboardStat`: data kartu statistik dengan ikon bertipe `IconName`.

Ikon yang valid didefinisikan oleh `resources/js/components/Icon.tsx`.

## Kondisi dan batasan yang perlu diketahui sebelum melanjutkan

1. Backend dashboard belum terhubung ke database/API; datanya contoh statis.
2. Login hanya redirect demo; belum ada validasi kredensial atau autentikasi.
3. Tidak ada middleware autentikasi/otorisasi pada route `/dashboard`.
4. Hanya `/dashboard` yang terdaftar; sebagian besar URL submenu belum punya route.
5. Notifikasi, pencarian, dan data profil masih simulasi/fallback.
6. Komponen dashboard reusable yang sudah ada belum semuanya dipakai oleh halaman dashboard utama.

## Catatan validasi terakhir

Setelah perbaikan import komponen dashboard dan nama ikon sidebar, `npm run types:check` berhasil. `php artisan test` terakhir melaporkan 2 tes lulus. Route dashboard yang terdaftar saat itu adalah `GET /dashboard`.
