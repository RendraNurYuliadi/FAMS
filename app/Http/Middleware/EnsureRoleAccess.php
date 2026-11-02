<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureRoleAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        $path = '/'.trim($request->path(), '/');

        if (! $user) {
            abort(403);
        }

        if ($user->role === 'admin') {
            return $next($request);
        }

        if ($user->role === 'pengelola') {
            abort_if(
                $path === '/dashboard/pengguna' || str_starts_with($path, '/dashboard/pengguna/'),
                403,
            );

            return $next($request);
        }

        if ($user->role === 'peminjam') {
            $allowed = $path === '/dashboard'
                || $path === '/dashboard/aset/katalog'
                || $this->matchesSection($path, '/dashboard/peminjaman')
                || $this->matchesSection($path, '/dashboard/pengembalian')
                || $this->matchesSection($path, '/dashboard/pengaduan');

            abort_unless($allowed, 403);

            return $next($request);
        }

        abort(403);
    }

    private function matchesSection(string $path, string $section): bool
    {
        return $path === $section || str_starts_with($path, $section.'/');
    }
}
