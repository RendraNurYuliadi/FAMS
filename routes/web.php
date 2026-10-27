
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');

Route::get('/sign-in', function () {
    return Inertia::render('auth/sign-in');
})->name('sign-in');
