<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\PasswordResetCodeNotification;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;

class PasswordResetCodeController extends Controller
{
    private const CODE_LIFETIME_MINUTES = 10;

    private const MAX_CODE_ATTEMPTS = 5;

    public function create(Request $request): Response
    {
        return Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]);
    }

    public function send(Request $request): RedirectResponse
    {
        if (is_string($request->input('email'))) {
            $request->merge(['email' => mb_strtolower(trim($request->input('email')))]);
        }

        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
        ]);

        if (! filled(config('mail.mailers.smtp.username')) || ! filled(config('mail.mailers.smtp.password'))) {
            return back()->withErrors([
                'email' => 'Kode belum dapat dikirim karena SMTP belum dikonfigurasi. Silakan hubungi administrator.',
            ]);
        }

        $email = $validated['email'];
        $user = User::query()->where('email', $email)->first();

        if ($user) {
            $code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);
            $now = now();

            DB::table('password_reset_codes')
                ->where('expires_at', '<=', $now)
                ->delete();

            DB::table('password_reset_codes')->updateOrInsert(
                ['email' => $email],
                [
                    'code_hash' => Hash::make($code),
                    'attempts' => 0,
                    'expires_at' => $now->copy()->addMinutes(self::CODE_LIFETIME_MINUTES),
                    'created_at' => $now,
                ],
            );

            try {
                $user->notify(new PasswordResetCodeNotification($code, self::CODE_LIFETIME_MINUTES));
            } catch (TransportExceptionInterface $exception) {
                DB::table('password_reset_codes')->where('email', $email)->delete();
                report($exception);

                return back()->withErrors([
                    'email' => 'Email verifikasi gagal dikirim. Periksa konfigurasi SMTP atau hubungi administrator.',
                ]);
            }
        }

        return redirect()->route('password.email.verify', ['email' => $email])
            ->with('status', 'Jika email terdaftar, kode verifikasi telah dikirim dan berlaku selama 10 menit.');
    }

    public function verify(Request $request): RedirectResponse
    {
        if (is_string($request->input('email'))) {
            $request->merge(['email' => mb_strtolower(trim($request->input('email')))]);
        }

        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'code' => ['required', 'digits:6'],
        ]);
        $email = $validated['email'];
        $record = DB::table('password_reset_codes')->where('email', $email)->first();

        if (
            ! $record
            || $record->attempts >= self::MAX_CODE_ATTEMPTS
            || Carbon::parse($record->expires_at)->isPast()
            || ! Hash::check($validated['code'], $record->code_hash)
        ) {
            if ($record && $record->attempts < self::MAX_CODE_ATTEMPTS) {
                DB::table('password_reset_codes')->where('email', $email)->increment('attempts');
            }

            return back()->withErrors([
                'code' => 'Kode tidak valid atau sudah kedaluwarsa. Periksa email atau minta kode baru.',
            ]);
        }

        $request->session()->put([
            'password_reset_email' => $email,
            'password_reset_verified_at' => now()->timestamp,
        ]);

        return redirect()->route('password.reset');
    }

    public function edit(Request $request): Response|RedirectResponse
    {
        $email = $request->session()->get('password_reset_email');
        $verifiedAt = $request->session()->get('password_reset_verified_at');

        if (! $email || ! $verifiedAt || now()->timestamp - $verifiedAt > self::CODE_LIFETIME_MINUTES * 60) {
            $request->session()->forget(['password_reset_email', 'password_reset_verified_at']);

            return redirect()->route('password.request')
                ->with('status', 'Sesi verifikasi berakhir. Silakan minta kode reset password baru.');
        }

        return Inertia::render('auth/reset-password', ['email' => $email]);
    }

    public function update(Request $request): RedirectResponse
    {
        $email = $request->session()->get('password_reset_email');
        $verifiedAt = $request->session()->get('password_reset_verified_at');

        if (! $email || ! $verifiedAt || now()->timestamp - $verifiedAt > self::CODE_LIFETIME_MINUTES * 60) {
            $request->session()->forget(['password_reset_email', 'password_reset_verified_at']);

            return redirect()->route('password.request')
                ->with('status', 'Sesi verifikasi berakhir. Silakan minta kode reset password baru.');
        }

        $validated = $request->validate([
            'email' => ['required', 'email', Rule::in([$email])],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $updated = DB::transaction(function () use ($email, $validated): bool {
            $record = DB::table('password_reset_codes')
                ->where('email', $email)
                ->lockForUpdate()
                ->first();

            if (
                ! $record
                || $record->attempts >= self::MAX_CODE_ATTEMPTS
                || Carbon::parse($record->expires_at)->isPast()
            ) {
                return false;
            }

            $user = User::query()->where('email', $email)->first();
            if (! $user) {
                return false;
            }

            $user->forceFill([
                'password' => $validated['password'],
                'remember_token' => Str::random(60),
            ])->save();

            DB::table('password_reset_codes')->where('email', $email)->delete();

            return true;
        });

        if (! $updated) {
            $request->session()->forget(['password_reset_email', 'password_reset_verified_at']);

            return redirect()->route('password.request')
                ->with('status', 'Kode reset tidak lagi berlaku. Silakan minta kode baru.');
        }

        $request->session()->forget(['password_reset_email', 'password_reset_verified_at']);

        return redirect()->route('login')->with('status', 'Password berhasil diperbarui. Silakan masuk dengan password baru.');
    }
}
