<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;
use Throwable;

class RegisteredUserController extends Controller
{
    public function create(Request $request): Response|RedirectResponse
    {
        if ($request->user()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('auth/register');
    }

    public function store(Request $request): RedirectResponse
    {
        if (is_string($request->input('email'))) {
            $request->merge(['email' => mb_strtolower(trim($request->input('email')))]);
        }

        $borrowerType = $request->input('borrower_type');
        $isExternal = in_array($borrowerType, ['eksternal', 'lainnya'], true);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')],
            'phone' => ['required', 'string', 'max:30'],
            'borrower_type' => ['required', Rule::in(['mahasiswa', 'dosen', 'staf', 'eksternal', 'lainnya'])],
            'identity_number' => [
                Rule::requiredIf(! $isExternal),
                'nullable',
                'string',
                'max:50',
                Rule::unique('users', 'identity_number'),
            ],
            'faculty' => [
                Rule::requiredIf(in_array($borrowerType, ['mahasiswa', 'dosen'], true)),
                'nullable',
                'string',
                'max:255',
            ],
            'study_program' => [
                Rule::requiredIf(in_array($borrowerType, ['mahasiswa', 'dosen'], true)),
                'nullable',
                'string',
                'max:255',
            ],
            'enrollment_year' => [
                Rule::requiredIf($borrowerType === 'mahasiswa'),
                'nullable',
                'integer',
                'between:1900,'.(now()->year + 1),
            ],
            'unit_name' => [
                Rule::requiredIf($borrowerType === 'staf'),
                'nullable',
                'string',
                'max:255',
            ],
            'position' => [
                Rule::requiredIf(in_array($borrowerType, ['dosen', 'staf'], true) || $isExternal),
                'nullable',
                'string',
                'max:255',
            ],
            'organization_name' => [
                Rule::requiredIf(
                    $isExternal
                    || ($borrowerType === 'mahasiswa' && $request->input('borrowing_context') === 'organisasi'),
                ),
                'nullable',
                'string',
                'max:255',
            ],
            'borrowing_context' => [
                Rule::requiredIf($borrowerType === 'mahasiswa'),
                'nullable',
                Rule::in(['pribadi', 'organisasi']),
            ],
            'address' => ['nullable', 'string', 'max:2000'],
            'photo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ], [
            'required' => ':attribute wajib diisi.',
            'email' => ':attribute harus berupa alamat email yang valid.',
            'unique' => ':attribute sudah digunakan. Gunakan nilai lain.',
            'in' => 'Pilihan :attribute tidak valid.',
            'string' => ':attribute harus berupa teks.',
            'max' => ':attribute maksimal :max karakter.',
            'integer' => ':attribute harus berupa angka bulat.',
            'between' => ':attribute harus berada di antara :min dan :max.',
            'image' => ':attribute harus berupa file gambar.',
            'mimes' => ':attribute harus berformat JPG, JPEG, PNG, atau WEBP.',
            'photo.max' => 'Ukuran foto maksimal 5 MB.',
            'min' => ':attribute minimal :min karakter.',
            'confirmed' => 'Konfirmasi password tidak sama.',
        ], [
            'name' => 'Nama lengkap',
            'email' => 'Email',
            'phone' => 'Nomor handphone',
            'borrower_type' => 'Kategori peminjam',
            'identity_number' => 'NIM/NIP/NIK',
            'faculty' => 'Fakultas',
            'study_program' => 'Program studi',
            'enrollment_year' => 'Angkatan',
            'unit_name' => 'Unit kerja',
            'position' => 'Jabatan',
            'organization_name' => 'Nama organisasi/instansi',
            'borrowing_context' => 'Konteks peminjaman',
            'address' => 'Alamat',
            'photo' => 'Foto profil',
            'password' => 'Password',
        ]);

        if (! in_array($borrowerType, ['mahasiswa', 'dosen', 'staf', 'eksternal', 'lainnya'], true)) {
            throw ValidationException::withMessages([
                'borrower_type' => 'Kategori peminjam tidak valid.',
            ]);
        }

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('profile-photos', 'public');

            if ($photoPath === false) {
                throw new RuntimeException('Foto profil gagal disimpan.');
            }
        }

        try {
            User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'role' => 'peminjam',
                'borrower_type' => $isExternal ? 'lainnya' : $borrowerType,
                'identity_number' => $validated['identity_number'] ?? null,
                'faculty' => $validated['faculty'] ?? null,
                'study_program' => $validated['study_program'] ?? null,
                'enrollment_year' => $validated['enrollment_year'] ?? null,
                'unit_name' => $validated['unit_name'] ?? null,
                'position' => $validated['position'] ?? null,
                'organization_name' => $validated['organization_name'] ?? null,
                'borrowing_context' => $validated['borrowing_context'] ?? null,
                'address' => $validated['address'] ?? null,
                'photo_path' => $photoPath,
                'password' => $validated['password'],
            ]);
        } catch (Throwable $exception) {
            if ($photoPath !== null) {
                Storage::disk('public')->delete($photoPath);
            }

            throw $exception;
        }

        return redirect()->route('login')->with('status', 'Akun berhasil dibuat. Silakan masuk dengan email dan password Anda.');
    }
}
