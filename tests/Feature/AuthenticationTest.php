<?php

namespace Tests\Feature;

use App\Models\User;
use App\Notifications\PasswordResetCodeNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_saves_profile_photo_and_redirects_to_login_without_authenticating(): void
    {
        Storage::fake('public');

        $response = $this->post('/register', [
            'name' => 'Test Borrower',
            'email' => 'borrower@example.test',
            'phone' => '08123456789',
            'borrower_type' => 'mahasiswa',
            'identity_number' => 'NIM-001',
            'faculty' => 'Fakultas Teknologi Informasi',
            'study_program' => 'Informatika',
            'enrollment_year' => 2024,
            'borrowing_context' => 'pribadi',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'admin',
            'photo' => UploadedFile::fake()->image('profile.png'),
        ]);

        $user = User::query()->where('email', 'borrower@example.test')->firstOrFail();

        $response->assertRedirect('/login');
        $this->assertGuest();
        $this->assertSame('peminjam', $user->role);
        $this->assertTrue(Hash::check('password123', $user->password));
        $this->assertNotNull($user->photo_path);
        $this->assertStringStartsWith('profile-photos/', $user->photo_path);
        $this->assertStringNotContainsString('/storage/', $user->photo_path);
        Storage::disk('public')->assertExists($user->photo_path);
    }

    public function test_registration_shows_clear_errors_for_duplicate_email_and_identity_number(): void
    {
        User::factory()->create([
            'email' => 'taken@example.test',
            'identity_number' => 'NIM-TAKEN',
        ]);
        $validData = [
            'name' => 'New Borrower',
            'email' => 'taken@example.test',
            'phone' => '08123456789',
            'borrower_type' => 'mahasiswa',
            'identity_number' => 'NIM-TAKEN',
            'faculty' => 'Fakultas Teknologi Informasi',
            'study_program' => 'Informatika',
            'enrollment_year' => 2024,
            'borrowing_context' => 'pribadi',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $this->from('/register')
            ->post('/register', $validData)
            ->assertRedirect('/register')
            ->assertSessionHasErrors([
                'email' => 'Email sudah digunakan. Gunakan nilai lain.',
                'identity_number' => 'NIM/NIP/NIK sudah digunakan. Gunakan nilai lain.',
            ]);
    }

    public function test_registration_explains_missing_required_profile_fields(): void
    {
        $this->from('/register')
            ->post('/register', [
                'name' => 'New Borrower',
                'email' => 'new@example.test',
                'phone' => '08123456789',
                'borrower_type' => 'mahasiswa',
                'identity_number' => 'NIM-NEW',
                'faculty' => 'Fakultas Teknologi Informasi',
                'enrollment_year' => 2024,
                'borrowing_context' => 'pribadi',
                'password' => 'password123',
                'password_confirmation' => 'password123',
            ])
            ->assertRedirect('/register')
            ->assertSessionHasErrors([
                'study_program' => 'Program studi wajib diisi.',
            ]);
    }

    public function test_all_three_roles_can_log_in(): void
    {
        foreach (['admin', 'pengelola', 'peminjam'] as $role) {
            $user = User::factory()->create([
                'email' => "{$role}@example.test",
                'role' => $role,
            ]);

            $this->post('/login', [
                'email' => $user->email,
                'password' => 'password',
                'remember' => true,
            ])->assertRedirect('/dashboard');

            $this->assertAuthenticatedAs($user);
            $this->post('/logout')->assertRedirect('/login');
        }
    }

    public function test_dashboard_routes_are_restricted_by_role(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin)->get('/dashboard/aset/barang')->assertOk();
        $this->actingAs($admin)->get('/dashboard/pengguna')->assertOk();

        $manager = User::factory()->create(['role' => 'pengelola']);
        $this->actingAs($manager)->get('/dashboard/aset/barang')->assertOk();
        $this->actingAs($manager)->get('/dashboard/pengguna')->assertForbidden();

        $borrower = User::factory()->create(['role' => 'peminjam']);
        $this->actingAs($borrower)->get('/dashboard')->assertOk();
        $this->actingAs($borrower)->get('/dashboard/aset/katalog')->assertOk();
        $this->actingAs($borrower)->get('/dashboard/peminjaman/pengajuan')->assertOk();
        $this->actingAs($borrower)->get('/dashboard/pengembalian')->assertOk();
        $this->actingAs($borrower)->get('/dashboard/pengaduan')->assertOk();
        $this->actingAs($borrower)->get('/dashboard/aset/barang')->assertForbidden();
        $this->actingAs($borrower)->get('/dashboard/pengaturan')->assertForbidden();
    }

    public function test_password_reset_code_updates_the_password(): void
    {
        Notification::fake();
        config([
            'mail.mailers.smtp.username' => 'smtp-test-user',
            'mail.mailers.smtp.password' => 'smtp-test-password',
        ]);
        $user = User::factory()->create([
            'email' => 'reset@example.test',
            'password' => 'old-password',
        ]);

        $this->post('/forgot-password', ['email' => $user->email])
            ->assertRedirect(route('password.email.verify', ['email' => $user->email]));

        Notification::assertSentTo($user, PasswordResetCodeNotification::class);
        $notification = Notification::sent($user, PasswordResetCodeNotification::class)->first();

        $this->post('/forgot-password/verify', [
            'email' => $user->email,
            'code' => $notification->code,
        ])->assertRedirect('/reset-password');

        $this->get('/reset-password')->assertOk();

        $this->post('/reset-password', [
            'email' => $user->email,
            'password' => 'new-password123',
            'password_confirmation' => 'new-password123',
        ])->assertRedirect('/login');

        $this->assertTrue(Hash::check('new-password123', $user->fresh()->password));
        $this->assertDatabaseMissing('password_reset_codes', ['email' => $user->email]);
    }

    public function test_password_reset_email_uses_the_branded_message_view(): void
    {
        $user = User::factory()->create();
        $message = (new PasswordResetCodeNotification('012345', 10))->toMail($user);
        $html = view($message->view['html'], $message->viewData)->render();

        $this->assertSame('Kode verifikasi reset password — FAMS', $message->subject);
        $this->assertStringContainsString('012345', $html);
        $this->assertStringContainsString('Halo, '.$user->name, $html);
        $this->assertStringContainsString('10 menit', $html);
    }

    public function test_password_reset_explains_when_smtp_credentials_are_missing(): void
    {
        config([
            'mail.mailers.smtp.username' => null,
            'mail.mailers.smtp.password' => null,
        ]);
        Notification::fake();
        $user = User::factory()->create(['email' => 'reset@example.test']);

        $this->from('/forgot-password')
            ->post('/forgot-password', ['email' => $user->email])
            ->assertRedirect('/forgot-password')
            ->assertSessionHasErrors([
                'email' => 'Kode belum dapat dikirim karena SMTP belum dikonfigurasi. Silakan hubungi administrator.',
            ]);

        Notification::assertNothingSent();
        $this->assertDatabaseMissing('password_reset_codes', ['email' => $user->email]);
    }

    public function test_password_reset_rate_limit_returns_a_form_error_instead_of_http_429(): void
    {
        RateLimiter::clear('password-reset:ip:'.hash('sha256', '127.0.0.1'));
        RateLimiter::clear('password-reset:email:'.hash('sha256', 'ratelimit@example.test'));
        config([
            'mail.mailers.smtp.username' => null,
            'mail.mailers.smtp.password' => null,
        ]);

        for ($attempt = 0; $attempt < 3; $attempt++) {
            $this->from('/forgot-password')
                ->post('/forgot-password', ['email' => 'ratelimit@example.test'])
                ->assertRedirect('/forgot-password');
        }

        $this->from('/forgot-password')
            ->post('/forgot-password', ['email' => 'ratelimit@example.test'])
            ->assertRedirect('/forgot-password')
            ->assertSessionHasErrors([
                'email' => 'Terlalu banyak permintaan kode. Coba lagi dalam 60 detik.',
            ]);
    }
}
