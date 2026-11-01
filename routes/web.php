<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/splash-login', function () {
    return Inertia::render('auth/splash');
})->name('splash');

Route::get('/login', function () {
    return Inertia::render('auth/login', [
        'status' => session('status'),
    ]);
})->name('login');

Route::post('/login', function (\Illuminate\Http\Request $request) {
    $dashboardUrl = route('dashboard', absolute: false);
    $nextUrl = $request->input('next_url');

    if ($nextUrl !== $dashboardUrl) {
        $nextUrl = $dashboardUrl;
    }

    return redirect()->to($nextUrl);
});

Route::get('/register', function () {
    return Inertia::render('auth/register');
})->name('register');

Route::post('/register', function () {
    return redirect()->route('register');
});

Route::get('/forgot-password', function () {
    return Inertia::render('auth/forgot-password');
})->name('password.request');

Route::post('/forgot-password', function (\Illuminate\Http\Request $request) {
    return redirect()->route('password.email.verify', [
        'email' => $request->input('email'),
    ]);
});

Route::get('/forgot-password/verify', function () {
    return Inertia::render('auth/password-reset-sent', [
        'email' => request()->query('email', ''),
    ]);
})->name('password.email.verify');

Route::post('/reset-password', function () {
    return redirect()->route('login')->with(
        'status',
        'Mode tampilan: password belum disimpan karena backend reset belum diaktifkan.',
    );
});

Route::get('/reset-password/{token}', function (string $token) {
    return Inertia::render('auth/reset-password', [
        'token' => $token,
        'email' => request()->query('email', ''),
    ]);
})->name('password.reset');

Route::get('/verify-email', function () {
    return Inertia::render('auth/verify-email');
})->name('verification.notice');

Route::post('/email/verification-notification', function () {
    return redirect()->route('verification.notice');
});

Route::get('/logout', function () {
    return redirect()->route('login');
});

Route::post('/logout', function () {
    return redirect()->route('login');
});

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

Route::get('/dashboard/aset/barang', function () {
    return Inertia::render('dashboard/aset/barang');
})->name('dashboard.aset.barang');

Route::get('/dashboard/aset/lokasi', function () {
    return Inertia::render('dashboard/aset/lokasi');
})->name('dashboard.aset.lokasi');