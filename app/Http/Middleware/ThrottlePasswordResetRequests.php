<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Symfony\Component\HttpFoundation\Response;

class ThrottlePasswordResetRequests
{
    private const MAX_ATTEMPTS = 3;

    private const DECAY_SECONDS = 60;

    public function handle(Request $request, Closure $next): Response
    {
        $email = is_string($request->input('email'))
            ? mb_strtolower(trim($request->input('email')))
            : '';
        $ip = (string) $request->ip();
        $keys = [
            'password-reset:ip:'.hash('sha256', $ip),
            'password-reset:email:'.hash('sha256', $email),
        ];

        $retryAfter = max(array_map(
            static fn (string $key): int => RateLimiter::availableIn($key),
            $keys,
        ));

        if (collect($keys)->contains(
            static fn (string $key): bool => RateLimiter::tooManyAttempts($key, self::MAX_ATTEMPTS),
        )) {
            return back()->withErrors([
                'email' => "Terlalu banyak permintaan kode. Coba lagi dalam {$retryAfter} detik.",
            ]);
        }

        foreach ($keys as $key) {
            RateLimiter::hit($key, self::DECAY_SECONDS);
        }

        return $next($request);
    }
}
