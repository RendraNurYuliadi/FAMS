
import { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import Icon from '../../components/Icon';
import type { IconName } from '../../components/Icon';
import AuthVisualPanel from '../../components/auth/AuthVisualPanel';

type BorrowerType = 'mahasiswa' | 'dosen' | 'staf' | 'eksternal';

function SectionHeading({
    icon,
    title,
    description,
}: {
    icon: IconName;
    title: string;
    description: string;
}) {
    return (
        <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100">
                <Icon name={icon} size={16} />
            </div>
            <div>
                <h2 className="text-xs font-semibold tracking-wide text-neutral-900">
                    {title}
                </h2>
                <p className="mt-0.5 text-[10px] text-neutral-400">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        borrower_type: 'mahasiswa' as BorrowerType,
        identity_number: '',
        faculty: '',
        study_program: '',
        enrollment_year: '',
        unit_name: '',
        position: '',
        organization_name: '',
        borrowing_context: 'pribadi',
        address: '',
        photo: null as File | null,
        password: '',
        password_confirmation: '',
    });

    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [showPhotoModal, setShowPhotoModal] = useState(false);

    // Generate preview URL
    useEffect(() => {
        if (!data.photo) {
            setPhotoPreview(null);
            setShowPhotoModal(false);
            return;
        }

        const objectUrl = URL.createObjectURL(data.photo);
        setPhotoPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [data.photo]);

    // Close modal with Escape
    useEffect(() => {
        if (!showPhotoModal) return;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setShowPhotoModal(false);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [showPhotoModal]);

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post('/register', {
            forceFormData: true,
            onError: () => {
                document.getElementById('register-errors')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            },
            onFinish: () => reset('password', 'password_confirmation'),
        });
    }

    const errorLabels: Record<string, string> = {
        name: 'Nama lengkap',
        email: 'Email',
        phone: 'Nomor handphone',
        borrower_type: 'Kategori peminjam',
        identity_number: 'NIM / NIP / NIK',
        faculty: 'Fakultas',
        study_program: 'Program studi',
        enrollment_year: 'Angkatan',
        unit_name: 'Unit kerja',
        position: 'Jabatan',
        organization_name: 'Nama organisasi / instansi',
        borrowing_context: 'Konteks peminjaman',
        address: 'Alamat',
        photo: 'Foto profil',
        password: 'Password / konfirmasi password',
        password_confirmation: 'Konfirmasi password',
    };

    function removePhoto() {
        setData('photo', null);
        setShowPhotoModal(false);

        const input = document.getElementById('photo') as HTMLInputElement | null;
        if (input) input.value = '';
    }

    function changeBorrowerType(type: BorrowerType) {
        setData((current) => ({
            ...current,
            borrower_type: type,
            identity_number: '',
            faculty: '',
            study_program: '',
            enrollment_year: '',
            unit_name: '',
            position: '',
            organization_name: '',
            borrowing_context: 'pribadi',
        }));
    }

    const borrowerOptions = [
        { value: 'mahasiswa', label: 'Mahasiswa', description: 'Mahasiswa aktif' },
        { value: 'dosen', label: 'Dosen', description: 'Tenaga pengajar' },
        { value: 'staf', label: 'Tenaga Kependidikan', description: 'Staf dan pegawai kampus' },
        { value: 'eksternal', label: 'Pihak Eksternal', description: 'Tamu, mitra, atau umum' },
    ];

    const identityTitle =
        data.borrower_type === 'mahasiswa'
            ? 'IDENTITAS MAHASISWA'
            : data.borrower_type === 'dosen'
              ? 'IDENTITAS DOSEN'
              : data.borrower_type === 'staf'
                ? 'IDENTITAS TENAGA KEPENDIDIKAN'
                : 'IDENTITAS PIHAK EKSTERNAL';

    return (
        <>
            <Head title="Daftar Akun — FAMS" />

            <main className="auth-page-enter relative flex min-h-screen items-center justify-center overflow-x-hidden bg-[#fafafa] px-3 py-3 font-sans text-neutral-950 sm:px-5 sm:py-5">
                {/* Background */}
                <div className="pointer-events-none fixed inset-0">
                    <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-200/40 blur-[110px]" />
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage:
                                'radial-gradient(#d4d4d4 0.7px, transparent 0.7px)',
                            backgroundSize: '22px 22px',
                        }}
                    />
                </div>

                {/* Main Container */}
                <section className="relative z-10 flex min-h-[calc(100vh-24px)] w-full max-w-[1440px] animate-[fadeIn_0.6s_ease-out] flex-col overflow-hidden rounded-[24px] border border-neutral-200 bg-white shadow-[0_16px_60px_rgba(0,0,0,0.07)] md:h-[min(920px,calc(100vh-40px))] md:min-h-[700px] md:flex-row">

                    {/* LEFT - Register Form */}
                    <div className="flex min-h-0 w-full flex-col bg-white md:w-[45%]">

                        {/* Header */}
                        <div className="shrink-0 px-6 pb-5 pt-7 sm:px-9 sm:pt-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-950 text-lg font-bold text-white shadow-sm">
                                    F
                                </div>

                                <div>
                                    <span className="block text-lg font-semibold tracking-tight text-neutral-950">
                                        FAMS<span className="text-neutral-400">.</span>
                                    </span>
                                    <span className="block text-[8px] font-medium tracking-[0.15em] text-neutral-500">
                                        FACULTY ASSET MANAGEMENT
                                    </span>
                                </div>

                                <span className="ml-auto rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[9px] font-semibold tracking-[0.15em] text-neutral-500">
                                    REGISTER
                                </span>
                            </div>

                            <div className="mt-6">
                                <h1 className="text-[25px] font-semibold tracking-tight text-neutral-950">
                                    Buat akun baru
                                </h1>
                                <p className="mt-1.5 text-[12px] leading-5 text-neutral-500">
                                    Lengkapi informasi berikut untuk mulai menggunakan layanan FAMS.
                                </p>
                            </div>
                        </div>

                        {/* Scrollable Form Area */}
                        <div className="min-h-0 flex-1 border-y border-neutral-100 px-6 py-6 md:overflow-y-auto md:overscroll-contain sm:px-9">
                            <form
                                id="register-form"
                                onSubmit={submit}
                                className="space-y-7"
                            >
                                {Object.keys(errors).length > 0 && (
                                    <div
                                        id="register-errors"
                                        role="alert"
                                        aria-live="assertive"
                                        className="scroll-mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-900"
                                    >
                                        <p className="text-sm font-semibold">
                                            Pendaftaran belum berhasil. Periksa {Object.keys(errors).length} bagian berikut:
                                        </p>
                                        <ul className="mt-2 space-y-1.5">
                                            {Object.entries(errors).map(([field, message]) => (
                                                <li key={field}>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const input = document.getElementById(field);
                                                            input?.scrollIntoView({
                                                                behavior: 'smooth',
                                                                block: 'center',
                                                            });
                                                            input?.focus({ preventScroll: true });
                                                        }}
                                                        className="text-left text-xs leading-5 underline decoration-red-300 underline-offset-2 hover:decoration-red-700"
                                                    >
                                                        <span className="font-semibold">
                                                            {errorLabels[field] ?? field}:
                                                        </span>{' '}
                                                        {message}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Foto Profil */}
                                <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:flex-row sm:items-center">
                                    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-white">
                                        {photoPreview ? (
                                            <button
                                                type="button"
                                                onClick={() => setShowPhotoModal(true)}
                                                className="group relative h-full w-full cursor-zoom-in"
                                                title="Lihat foto profil"
                                            >
                                                <img
                                                    src={photoPreview}
                                                    alt="Preview foto profil"
                                                    className="h-full w-full object-cover"
                                                />

                                                <span className="absolute inset-0 flex items-center justify-center bg-neutral-950/0 text-white opacity-0 transition-all duration-200 group-hover:bg-neutral-950/35 group-hover:opacity-100">
                                                    <Icon name="eye" size={22} />
                                                </span>
                                            </button>
                                        ) : (
                                            <Icon
                                                name="users"
                                                size={32}
                                                className="text-neutral-300"
                                            />
                                        )}
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-neutral-900">
                                            Foto Profil
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-neutral-500">
                                            Unggah foto agar akun Anda mudah dikenali.
                                        </p>

                                        <div className="mt-3 flex flex-wrap items-center gap-3">
                                            <label
                                                htmlFor="photo"
                                                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
                                            >
                                                <Icon name="plus" size={14} />
                                                {data.photo ? 'Ganti Foto' : 'Pilih Foto'}
                                            </label>

                                            {data.photo && (
                                                <button
                                                    type="button"
                                                    onClick={removePhoto}
                                                    className="text-xs font-medium text-neutral-500 transition hover:text-neutral-950"
                                                >
                                                    Hapus foto
                                                </button>
                                            )}
                                        </div>

                                        <input
                                            id="photo"
                                            name="photo"
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            className="sr-only"
                                            onChange={(e) =>
                                                setData('photo', e.target.files?.[0] ?? null)
                                            }
                                        />

                                        <p className="mt-2 text-[10px] text-neutral-400">
                                            JPG, PNG, atau WEBP.
                                        </p>

                                        {data.photo && (
                                            <p className="mt-1 truncate text-[11px] text-neutral-600">
                                                {data.photo.name}
                                            </p>
                                        )}

                                        {errors.photo && (
                                            <p className="mt-1 text-xs text-neutral-600">
                                                {errors.photo}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Informasi Pribadi */}
                                <div>
                                    <SectionHeading
                                        icon="users"
                                        title="INFORMASI PRIBADI"
                                        description="Informasi dasar pemilik akun"
                                    />

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <AuthInput
                                            label="NAMA LENGKAP"
                                            name="name"
                                            placeholder="Masukkan nama lengkap"
                                            autoComplete="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            error={errors.name}
                                            required
                                        />

                                        <AuthInput
                                            label="EMAIL"
                                            name="email"
                                            type="email"
                                            placeholder="nama@email.com"
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            error={errors.email}
                                            required
                                        />

                                        <AuthInput
                                            label="NOMOR HANDPHONE"
                                            name="phone"
                                            type="tel"
                                            placeholder="08xxxxxxxxxx"
                                            autoComplete="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            error={errors.phone}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Kategori Peminjam */}
                                <div>
                                    <SectionHeading
                                        icon="building"
                                        title="KATEGORI PEMINJAM"
                                        description="Pilih kategori sesuai status Anda"
                                    />

                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        {borrowerOptions.map((option) => (
                                            <button
                                                key={option.value}
                                                id={option.value === 'mahasiswa' ? 'borrower_type' : undefined}
                                                type="button"
                                                onClick={() =>
                                                    changeBorrowerType(option.value as BorrowerType)
                                                }
                                                className={`rounded-xl border p-3 text-left transition ${
                                                    data.borrower_type === option.value
                                                        ? 'border-neutral-950 bg-neutral-50 ring-1 ring-neutral-950'
                                                        : 'border-neutral-200 bg-white hover:border-neutral-400'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-sm font-semibold text-neutral-900">
                                                        {option.label}
                                                    </span>

                                                    <span
                                                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                                                            data.borrower_type === option.value
                                                                ? 'border-neutral-950 bg-neutral-950 text-white'
                                                                : 'border-neutral-300'
                                                        }`}
                                                    >
                                                        {data.borrower_type === option.value && (
                                                            <Icon name="check" size={12} />
                                                        )}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-xs text-neutral-500">
                                                    {option.description}
                                                </p>
                                            </button>
                                        ))}
                                    </div>

                                    {errors.borrower_type && (
                                        <p className="mt-2 text-xs text-neutral-600">
                                            {errors.borrower_type}
                                        </p>
                                    )}
                                </div>

                                {/* Identitas Berdasarkan Kategori */}
                                <div>
                                    <SectionHeading
                                        icon="building"
                                        title={identityTitle}
                                        description="Informasi identitas sesuai kategori peminjam"
                                    />

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {data.borrower_type === 'mahasiswa' && (
                                            <>
                                                <AuthInput
                                                    label="NIM"
                                                    name="identity_number"
                                                    placeholder="Masukkan NIM"
                                                    value={data.identity_number}
                                                    onChange={(e) => setData('identity_number', e.target.value)}
                                                    error={errors.identity_number}
                                                />
                                                <AuthInput
                                                    label="FAKULTAS"
                                                    name="faculty"
                                                    placeholder="Masukkan nama fakultas"
                                                    value={data.faculty}
                                                    onChange={(e) => setData('faculty', e.target.value)}
                                                    error={errors.faculty}
                                                />
                                                <AuthInput
                                                    label="PROGRAM STUDI"
                                                    name="study_program"
                                                    placeholder="Masukkan program studi"
                                                    value={data.study_program}
                                                    onChange={(e) => setData('study_program', e.target.value)}
                                                    error={errors.study_program}
                                                />
                                                <AuthInput
                                                    label="ANGKATAN"
                                                    name="enrollment_year"
                                                    type="number"
                                                    placeholder="Contoh: 2024"
                                                    value={data.enrollment_year}
                                                    onChange={(e) => setData('enrollment_year', e.target.value)}
                                                    error={errors.enrollment_year}
                                                />
                                            </>
                                        )}

                                        {data.borrower_type === 'dosen' && (
                                            <>
                                                <AuthInput
                                                    label="NIP / NIDN"
                                                    name="identity_number"
                                                    placeholder="Masukkan NIP atau NIDN"
                                                    value={data.identity_number}
                                                    onChange={(e) => setData('identity_number', e.target.value)}
                                                    error={errors.identity_number}
                                                />
                                                <AuthInput
                                                    label="FAKULTAS"
                                                    name="faculty"
                                                    placeholder="Masukkan nama fakultas"
                                                    value={data.faculty}
                                                    onChange={(e) => setData('faculty', e.target.value)}
                                                    error={errors.faculty}
                                                />
                                                <AuthInput
                                                    label="PROGRAM STUDI"
                                                    name="study_program"
                                                    placeholder="Masukkan program studi"
                                                    value={data.study_program}
                                                    onChange={(e) => setData('study_program', e.target.value)}
                                                    error={errors.study_program}
                                                />
                                                <AuthInput
                                                    label="JABATAN"
                                                    name="position"
                                                    placeholder="Contoh: Dosen, Kaprodi"
                                                    value={data.position}
                                                    onChange={(e) => setData('position', e.target.value)}
                                                    error={errors.position}
                                                />
                                            </>
                                        )}

                                        {data.borrower_type === 'staf' && (
                                            <>
                                                <AuthInput
                                                    label="NIP / NIK"
                                                    name="identity_number"
                                                    placeholder="Masukkan NIP atau NIK"
                                                    value={data.identity_number}
                                                    onChange={(e) => setData('identity_number', e.target.value)}
                                                    error={errors.identity_number}
                                                />
                                                <AuthInput
                                                    label="UNIT KERJA"
                                                    name="unit_name"
                                                    placeholder="Contoh: Tata Usaha FTI"
                                                    value={data.unit_name}
                                                    onChange={(e) => setData('unit_name', e.target.value)}
                                                    error={errors.unit_name}
                                                />
                                                <AuthInput
                                                    label="JABATAN"
                                                    name="position"
                                                    placeholder="Masukkan jabatan"
                                                    value={data.position}
                                                    onChange={(e) => setData('position', e.target.value)}
                                                    error={errors.position}
                                                />
                                            </>
                                        )}

                                        {data.borrower_type === 'eksternal' && (
                                            <>
                                                <AuthInput
                                                    label="NIK"
                                                    name="identity_number"
                                                    placeholder="Masukkan NIK (opsional)"
                                                    value={data.identity_number}
                                                    onChange={(e) => setData('identity_number', e.target.value)}
                                                    error={errors.identity_number}
                                                />
                                                <AuthInput
                                                    label="INSTANSI / ORGANISASI"
                                                    name="organization_name"
                                                    placeholder="Nama instansi atau organisasi"
                                                    value={data.organization_name}
                                                    onChange={(e) => setData('organization_name', e.target.value)}
                                                    error={errors.organization_name}
                                                />
                                                <AuthInput
                                                    label="JABATAN / PERAN"
                                                    name="position"
                                                    placeholder="Masukkan jabatan atau peran"
                                                    value={data.position}
                                                    onChange={(e) => setData('position', e.target.value)}
                                                    error={errors.position}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Konteks Peminjaman Mahasiswa */}
                                {data.borrower_type === 'mahasiswa' && (
                                    <div>
                                        <SectionHeading
                                            icon="users"
                                            title="KONTEKS PEMINJAMAN"
                                            description="Pilih tujuan peminjaman aset"
                                        />

                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setData('borrowing_context', 'pribadi');
                                                    setData('organization_name', '');
                                                }}
                                                className={`rounded-xl border p-4 text-left transition ${
                                                    data.borrowing_context === 'pribadi'
                                                        ? 'border-neutral-950 bg-neutral-50 ring-1 ring-neutral-950'
                                                        : 'border-neutral-200 hover:border-neutral-400'
                                                }`}
                                            >
                                                <p className="text-sm font-semibold">Pribadi</p>
                                                <p className="mt-1 text-xs text-neutral-500">
                                                    Meminjam untuk kebutuhan pribadi
                                                </p>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setData('borrowing_context', 'organisasi')}
                                                className={`rounded-xl border p-4 text-left transition ${
                                                    data.borrowing_context === 'organisasi'
                                                        ? 'border-neutral-950 bg-neutral-50 ring-1 ring-neutral-950'
                                                        : 'border-neutral-200 hover:border-neutral-400'
                                                }`}
                                            >
                                                <p className="text-sm font-semibold">Organisasi</p>
                                                <p className="mt-1 text-xs text-neutral-500">
                                                    Mewakili UKM, Himpunan, BEM, atau organisasi lain
                                                </p>
                                            </button>
                                        </div>

                                        {data.borrowing_context === 'organisasi' && (
                                            <div className="mt-4">
                                                <AuthInput
                                                    label="NAMA ORGANISASI"
                                                    name="organization_name"
                                                    placeholder="Contoh: Himpunan Mahasiswa Informatika"
                                                    value={data.organization_name}
                                                    onChange={(e) => setData('organization_name', e.target.value)}
                                                    error={errors.organization_name}
                                                />
                                            </div>
                                        )}

                                        {errors.borrowing_context && (
                                            <p className="mt-2 text-xs text-neutral-600">
                                                {errors.borrowing_context}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Alamat */}
                                <div>
                                    <label
                                        htmlFor="address"
                                        className="mb-2 block text-[11px] font-semibold tracking-[0.12em] text-neutral-700"
                                    >
                                        ALAMAT{' '}
                                        <span className="font-normal tracking-normal text-neutral-400">
                                            (OPSIONAL)
                                        </span>
                                    </label>

                                    <textarea
                                        id="address"
                                        name="address"
                                        rows={3}
                                        placeholder="Masukkan alamat tempat tinggal"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="w-full resize-y rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/5"
                                    />

                                    {errors.address && (
                                        <p className="mt-1 text-xs text-neutral-600">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                {/* Keamanan Akun */}
                                <div>
                                    <SectionHeading
                                        icon="shield"
                                        title="KEAMANAN AKUN"
                                        description="Buat password untuk melindungi akun"
                                    />

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <PasswordInput
                                            label="PASSWORD"
                                            name="password"
                                            placeholder="Minimal 8 karakter"
                                            autoComplete="new-password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            error={errors.password}
                                            required
                                        />

                                        <PasswordInput
                                            label="KONFIRMASI PASSWORD"
                                            name="password_confirmation"
                                            placeholder="Ulangi password"
                                            autoComplete="new-password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            error={errors.password_confirmation}
                                            required
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Fixed Footer */}
                        <div className="shrink-0 px-6 py-5 sm:px-9">
                            <button
                                type="submit"
                                form="register-form"
                                disabled={processing}
                                className="group flex h-[50px] w-full items-center justify-between rounded-xl bg-neutral-950 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span>
                                    {processing ? 'Memproses...' : 'Buat Akun FAMS'}
                                </span>
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/20">
                                    {processing ? (
                                        <Icon name="clock" size={16} />
                                    ) : (
                                        <Icon name="arrow-right" size={16} />
                                    )}
                                </span>
                            </button>

                            <div className="mt-4 flex items-center justify-center gap-1.5 text-[12px] text-neutral-500">
                                Sudah memiliki akun?
                                <Link
                                    href="/login"
                                    className="font-semibold text-neutral-900 transition hover:underline"
                                >
                                    Masuk sekarang
                                </Link>
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-2 border-t border-neutral-100 pt-4 text-[10px] text-neutral-400">
                                <Icon name="shield" size={13} />
                                <span>Secure Access</span>
                                <span className="text-neutral-300">•</span>
                                <span>© {new Date().getFullYear()} FAMS</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT - Visual Panel */}
                    <AuthVisualPanel
                        badgeLabel="SMART FACILITY MANAGEMENT"
                        className="md:flex md:w-[55%] md:flex-col md:justify-between md:p-9"
                    />
                </section>

                {/* Photo Preview Modal */}
                {showPhotoModal && photoPreview && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/80 p-4 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
                        onMouseDown={(e) => {
                            if (e.target === e.currentTarget) {
                                setShowPhotoModal(false);
                            }
                        }}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Preview foto profil"
                    >
                        <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white p-3 shadow-2xl sm:p-4">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-1 pb-3">
                                <div>
                                    <h2 className="text-sm font-semibold text-neutral-950">
                                        Preview Foto Profil
                                    </h2>
                                    <p className="mt-0.5 text-[11px] text-neutral-500">
                                        {data.photo?.name}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowPhotoModal(false)}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition hover:bg-neutral-200 hover:text-neutral-950"
                                    aria-label="Tutup preview"
                                >
                                    <Icon name="close" size={18} />
                                </button>
                            </div>

                            {/* Image */}
                            <div className="flex max-h-[75vh] min-h-[200px] items-center justify-center overflow-hidden rounded-xl bg-neutral-100">
                                <img
                                    src={photoPreview}
                                    alt="Foto profil ukuran besar"
                                    className="max-h-[75vh] max-w-full object-contain"
                                />
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center gap-3 px-1 pt-3">
                                <p className="min-w-0 truncate text-[11px] text-neutral-400">
                                    Foto profil yang akan digunakan pada akun FAMS.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Animation */}
                <style>{`
                    @keyframes fadeIn {
                        from {
                            opacity: 0;
                            transform: translateY(14px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        section {
                            animation: none !important;
                        }
                    }
                `}</style>
            </main>
        </>
    );
}
