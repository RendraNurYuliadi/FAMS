<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['admin', 'pengelola', 'peminjam'])
                ->default('peminjam');
            $table->string('phone', 30)->nullable();
            $table->string('photo_path')->nullable();
            $table->text('address')->nullable();
            $table->enum('borrower_type', ['mahasiswa', 'dosen', 'staf', 'lainnya'])
                ->nullable();
            $table->string('identity_number', 50)->nullable()->unique();
            $table->string('faculty')->nullable();
            $table->string('study_program')->nullable();
            $table->unsignedSmallInteger('enrollment_year')->nullable();
            $table->string('unit_name')->nullable();
            $table->string('position')->nullable();
            $table->string('organization_name')->nullable();
            $table->enum('borrowing_context', ['pribadi', 'organisasi'])->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['identity_number']);
            $table->dropColumn([
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
            ]);
        });
    }
};
