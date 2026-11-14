<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'rahma@gmail.com'],
            [
                'name' => 'Admin',
                'email' => 'rahma@gmail.com',
                'password' => Hash::make('1234567890'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );
    }
}