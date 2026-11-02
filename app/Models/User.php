<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $role
 * @property string|null $phone
 * @property string|null $photo_path
 * @property string|null $address
 * @property string|null $borrower_type
 * @property string|null $identity_number
 * @property string|null $faculty
 * @property string|null $study_program
 * @property int|null $enrollment_year
 * @property string|null $unit_name
 * @property string|null $position
 * @property string|null $organization_name
 * @property string|null $borrowing_context
 * @property Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'name',
    'email',
    'password',
    'role',
    'phone',
    'photo_path',
    'address',
    'borrower_type',
    'identity_number',
    'faculty',
    'study_program',
    'enrollment_year',
    'unit_name',
    'position',
    'organization_name',
    'borrowing_context',
])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'enrollment_year' => 'integer',
            'password' => 'hashed',
        ];
    }
}
