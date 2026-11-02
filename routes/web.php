<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\PasswordResetCodeController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/splash-login', function () {
    return Inertia::render('auth/splash');
})->name('splash');

Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store'])->middleware('throttle:5,1');

Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store'])->middleware('throttle:5,1');

Route::get('/forgot-password', [PasswordResetCodeController::class, 'create'])->name('password.request');
Route::post('/forgot-password', [PasswordResetCodeController::class, 'send'])
    ->middleware('throttle.password-reset');
Route::get('/forgot-password/verify', function () {
    return Inertia::render('auth/password-reset-sent', [
        'email' => request()->query('email', ''),
        'status' => session('status'),
    ]);
})->name('password.email.verify');
Route::post('/forgot-password/verify', [PasswordResetCodeController::class, 'verify'])
    ->middleware('throttle:10,1');

Route::get('/reset-password', [PasswordResetCodeController::class, 'edit'])->name('password.reset');
Route::post('/reset-password', [PasswordResetCodeController::class, 'update'])->middleware('throttle:5,1');

Route::get('/verify-email', function () {
    return Inertia::render('auth/verify-email');
})->name('verification.notice');

Route::post('/email/verification-notification', function () {
    return redirect()->route('verification.notice');
});

Route::get('/logout', fn () => redirect()->route('login'));
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth');

Route::middleware(['auth', 'role.access'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard/index');
    })->name('dashboard');

    Route::get('/dashboard/aset', function () {
        return Inertia::render('dashboard/aset/index');
    })->name('dashboard.aset');

    Route::get('/dashboard/aset/barang', function () {
        return Inertia::render('dashboard/aset/barang');
    })->name('dashboard.aset.barang');

    Route::get('/dashboard/aset/katalog', function () {
        return Inertia::render('dashboard/aset/katalog');
    })->name('dashboard.aset.katalog');

    Route::get('/dashboard/aset/ruangan', function () {
        return Inertia::render('dashboard/aset/ruangan');
    })->name('dashboard.aset.ruangan');

    Route::get('/dashboard/aset/lokasi', function () {
        return Inertia::render('dashboard/aset/lokasi');
    })->name('dashboard.aset.lokasi');

    Route::get('/dashboard/peminjaman', function () {
        return Inertia::render('dashboard/peminjaman/index');
    })->name('dashboard.peminjaman');

    Route::get('/dashboard/peminjaman/pengajuan', function () {
        return Inertia::render('dashboard/peminjaman/pengajuan');
    })->name('dashboard.peminjaman.pengajuan');

    Route::get('/dashboard/pengembalian', function () {
        return Inertia::render('dashboard/Placeholder', ['title' => 'Data Pengembalian']);
    })->name('dashboard.pengembalian');

    Route::get('/dashboard/pengembalian/pemeriksaan', function () {
        return Inertia::render('dashboard/Placeholder', ['title' => 'Pemeriksaan Aset']);
    })->name('dashboard.pengembalian.pemeriksaan');

    Route::get('/dashboard/pengaduan', function () {
        return Inertia::render('dashboard/Placeholder', ['title' => 'Laporan Kerusakan']);
    })->name('dashboard.pengaduan');

    Route::get('/dashboard/pengaduan/riwayat', function () {
        return Inertia::render('dashboard/Placeholder', ['title' => 'Riwayat Pengaduan']);
    })->name('dashboard.pengaduan.riwayat');

    Route::get('/dashboard/pemeliharaan', function () {
        return Inertia::render('dashboard/Placeholder', ['title' => 'Data Pemeliharaan']);
    })->name('dashboard.pemeliharaan');

    Route::get('/dashboard/pemeliharaan/jadwal', function () {
        return Inertia::render('dashboard/Placeholder', ['title' => 'Jadwal Pemeliharaan']);
    })->name('dashboard.pemeliharaan.jadwal');

    Route::get('/dashboard/rfid', function () {
        return Inertia::render('dashboard/Placeholder', ['title' => 'Perangkat RFID']);
    })->name('dashboard.rfid');

    Route::get('/dashboard/rfid/pemindaian', function () {
        return Inertia::render('dashboard/Placeholder', ['title' => 'Riwayat Pemindaian']);
    })->name('dashboard.rfid.pemindaian');

    Route::get('/dashboard/laporan/aset', function () {
        return Inertia::render('dashboard/Placeholder', ['title' => 'Laporan Aset']);
    })->name('dashboard.laporan.aset');

    Route::get('/dashboard/laporan/peminjaman', function () {
        return Inertia::render('dashboard/Placeholder', ['title' => 'Laporan Peminjaman']);
    })->name('dashboard.laporan.peminjaman');

    Route::get('/dashboard/laporan/kerusakan', function () {
        return Inertia::render('dashboard/Placeholder', ['title' => 'Laporan Kerusakan']);
    })->name('dashboard.laporan.kerusakan');

    Route::get('/dashboard/pengguna', function () {
        return Inertia::render('dashboard/Placeholder', ['title' => 'Manajemen Pengguna']);
    })->name('dashboard.pengguna');

    Route::get('/dashboard/pengguna/organisasi', function () {
        return Inertia::render('dashboard/Placeholder', ['title' => 'Data Organisasi']);
    })->name('dashboard.pengguna.organisasi');

    Route::get('/dashboard/pengaturan', function () {
        return Inertia::render('dashboard/Placeholder', ['title' => 'Pengaturan Sistem']);
    })->name('dashboard.pengaturan');

    Route::get('/dashboard/pengaturan/profil', function () {
        return Inertia::render('dashboard/Placeholder', ['title' => 'Profil Saya']);
    })->name('dashboard.pengaturan.profil');
});
