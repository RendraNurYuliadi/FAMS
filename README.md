# FAMS

FAMS adalah aplikasi web untuk mendukung pengelolaan aset dan alur peminjaman di lingkungan kampus atau organisasi. Aplikasi ini menyediakan antarmuka dashboard untuk aset, peminjaman, pengembalian, pengaduan, pemeliharaan, RFID, laporan, dan pengguna.

> **Status proyek:** aplikasi sedang dalam tahap pengembangan. Autentikasi, pendaftaran, reset password, pembatasan akses berdasarkan peran, dan sejumlah halaman dashboard sudah tersedia. Namun, sebagian besar data dan aktivitas operasional aset/peminjaman masih berupa antarmuka atau data demonstrasi; backend CRUD dan integrasi database untuk domain tersebut belum lengkap.

## Fitur saat ini

### Autentikasi dan akun

- Pendaftaran akun dengan validasi data peminjam, termasuk kategori peminjam dan informasi profil yang relevan.
- Password disimpan melalui mekanisme hashing Laravel. Akun yang mendaftar mendapat peran `peminjam`.
- Login menggunakan email dan password, opsi “ingat saya”, serta regenerasi sesi setelah login.
- Logout melalui POST mengakhiri sesi dan memperbarui token CSRF.
- Lupa password menggunakan kode verifikasi enam digit melalui email. Kode berlaku 10 menit dan percobaan verifikasi dibatasi.
- Form dan validasi autentikasi menggunakan Laravel, dengan halaman React yang dirender melalui Inertia.

Reset password lewat email memerlukan konfigurasi SMTP yang berfungsi. Detail pengaturan ada di bagian [Konfigurasi lingkungan](#konfigurasi-lingkungan).

### Peran dan akses dashboard

Route dashboard dilindungi middleware autentikasi dan pembatasan peran:

| Peran | Akses |
|---|---|
| `admin` | Seluruh route dashboard. |
| `pengelola` | Route dashboard kecuali manajemen pengguna (`/dashboard/pengguna` dan turunannya). |
| `peminjam` | Ringkasan dashboard, katalog aset, serta bagian peminjaman, pengembalian, dan pengaduan. Route dashboard lain ditolak. |

Pendaftaran publik hanya membuat akun `peminjam`. Akun `admin` dan `pengelola` perlu disiapkan atau ditetapkan melalui proses administrasi yang sesuai.

### Halaman dashboard dan modul

Route yang saat ini didefinisikan di `routes/web.php` mencakup:

- **Ringkasan:** `/dashboard`.
- **Aset:** `/dashboard/aset`, `/dashboard/aset/barang`, `/dashboard/aset/katalog`, `/dashboard/aset/ruangan`, dan `/dashboard/aset/lokasi`.
- **Peminjaman:** `/dashboard/peminjaman` dan `/dashboard/peminjaman/pengajuan`.
- **Pengembalian:** `/dashboard/pengembalian` dan `/dashboard/pengembalian/pemeriksaan`.
- **Pengaduan:** `/dashboard/pengaduan` dan `/dashboard/pengaduan/riwayat`.
- **Pemeliharaan:** `/dashboard/pemeliharaan` dan `/dashboard/pemeliharaan/jadwal`.
- **RFID:** `/dashboard/rfid` dan `/dashboard/rfid/pemindaian`.
- **Laporan:** `/dashboard/laporan/aset`, `/dashboard/laporan/peminjaman`, dan `/dashboard/laporan/kerusakan`.
- **Pengguna dan preferensi:** `/dashboard/pengguna`, `/dashboard/pengguna/organisasi`, `/dashboard/pengaturan`, dan `/dashboard/pengaturan/profil`.

Sebagian route tersebut saat ini hanya menampilkan halaman placeholder. Dashboard utama juga memakai angka, aktivitas, kategori, dan peminjaman demonstrasi yang ditulis di frontend, bukan ringkasan hasil query database. Halaman katalog dan form modul yang tersedia sebaiknya dipahami sebagai pekerjaan antarmuka sampai proses backend terkait benar-benar terhubung.

## Teknologi

- **Backend:** PHP 8.3+, Laravel 13.
- **Frontend:** React 19, TypeScript, Inertia.js 3.
- **Styling:** Tailwind CSS 4.
- **Bundler dan pemeriksaan frontend:** Vite Plus (`vp`).
- **Database:** dikonfigurasi melalui Laravel; `.env.example` saat ini menggunakan MySQL.
- **Pengujian backend:** PHPUnit melalui Laravel.

## Persyaratan

Pastikan lingkungan lokal memiliki:

- PHP versi 8.3 atau lebih baru beserta ekstensi yang dibutuhkan Laravel.
- Composer.
- Node.js dan npm.
- MySQL yang berjalan, atau database lain yang dikonfigurasi dan didukung oleh Laravel.

## Konfigurasi lingkungan

`.env.example` adalah template pengembangan. Setelah menyalinnya menjadi `.env`, sesuaikan setidaknya `APP_URL` dan pengaturan `DB_*` dengan lingkungan lokal. Template saat ini menggunakan MySQL (`DB_DATABASE=db_fams`, `DB_USERNAME=root`), sehingga database harus dibuat dan server MySQL harus berjalan sebelum migrasi.

Untuk mengaktifkan reset password lewat email, konfigurasikan `MAIL_MAILER`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, dan `MAIL_FROM_ADDRESS` sesuai penyedia SMTP. Fitur reset password tidak dapat mengirim kode jika kredensial SMTP belum tersedia. Gunakan kredensial pribadi/lokal dan jangan pernah commit `.env` atau rahasia ke Git.

## Menjalankan aplikasi secara lokal

1. Pasang dependensi PHP:

   ```bash
   composer install
   ```

2. Buat file lingkungan lokal dan kunci aplikasi:

   ```bash
   copy .env.example .env
   php artisan key:generate
   ```

   Pada PowerShell, perintah salin yang setara adalah:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Edit `.env` sesuai [konfigurasi lingkungan](#konfigurasi-lingkungan). Pastikan database sudah dibuat sebelum menjalankan migrasi.

4. Jalankan migrasi:

   ```bash
   php artisan migrate
   ```

5. Pasang dependensi frontend dan buat tautan penyimpanan publik untuk foto profil:

   ```bash
   npm install
   php artisan storage:link
   ```

6. Jalankan backend dan frontend di dua terminal:

   ```bash
   php artisan serve
   ```

   ```bash
   npm run dev
   ```

   Buka URL lokal yang ditampilkan oleh `php artisan serve` (biasanya `http://127.0.0.1:8000`).

## Perintah pengembangan dan pemeriksaan

| Perintah | Kegunaan |
|---|---|
| `npm run dev` | Menjalankan Vite Plus untuk pengembangan frontend. |
| `npm run build` | Membuat build frontend untuk produksi. |
| `npm run check` | Menjalankan pemeriksaan frontend melalui Vite Plus. |
| `npm run check:fix` | Menerapkan perbaikan otomatis yang tersedia dari pemeriksaan frontend. |
| `npm run types:check` | Memeriksa tipe TypeScript tanpa membuat output. |
| `php artisan test` | Menjalankan pengujian Laravel/PHPUnit. |
| `composer lint:check` | Memeriksa format kode PHP tanpa mengubah file. |
| `composer types:check` | Menjalankan analisis statis PHPStan/Larastan. |
| `composer test` | Menjalankan pemeriksaan format, analisis statis PHP, dan tes Laravel. |
| `composer ci:check` | Menjalankan pemeriksaan frontend, tipe TypeScript, dan tes Laravel yang dikonfigurasi untuk CI. |

## Struktur kode

```text
app/
  Http/Controllers/Auth/   Controller login, pendaftaran, dan reset password
  Http/Middleware/         Middleware Inertia dan pembatasan akses peran
  Models/User.php          Model akun pengguna
database/
  migrations/              Skema users, profil, dan kode reset password
  seeders/                 Seeder database
resources/js/
  components/              Komponen bersama dan komponen dashboard
  pages/auth/              Halaman autentikasi React
  pages/dashboard/         Halaman dashboard dan modul
  types/                   Tipe TypeScript
routes/web.php             Route halaman web dan dashboard
tests/Feature/             Tes fitur Laravel
```

## Data dan batasan implementasi

- Migrasi khusus aplikasi saat ini memperluas data pengguna dan membuat tabel kode reset password. Belum ada skema tabel khusus aset, peminjaman, pengembalian, pemeliharaan, pengaduan, atau organisasi.
- Controller backend saat ini berfokus pada autentikasi dan akun. Route dashboard umumnya mengembalikan halaman Inertia; route placeholder belum mewakili proses bisnis operasional.
- Statistik dan aktivitas di dashboard utama merupakan data demonstrasi, bukan data aktual.
- Opsi verifikasi email dan beberapa elemen antarmuka belum membentuk alur bisnis lengkap.
- Konfigurasi `.env.example` adalah contoh pengembangan, bukan konfigurasi siap produksi. Siapkan konfigurasi, kredensial, penyimpanan, dan pengamanan produksi secara terpisah.

Sebelum menganggap modul operasional siap digunakan, implementasikan dan uji model serta migrasi domain, validasi dan otorisasi operasi, endpoint/controller, integrasi halaman dengan database, dan pengujian alur bisnis terkait.

## Dokumentasi tambahan

- [DASHBOARD-CURRENT-STATE.md](./DASHBOARD-CURRENT-STATE.md) merangkum implementasi dashboard dan konteks pengembangannya.
