import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Icon from '../../components/Icon';
import AuthVisualPanel from '../../components/auth/AuthVisualPanel';

type Props = {
    email: string;
    status?: string;
};

export default function PasswordResetSent({ email, status }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        email,
        code: '',
    });

    const [codeFocused, setCodeFocused] = useState(false);

    function continueToReset() {
        post('/forgot-password/verify');
    }

    function resendCode() {
        post('/forgot-password', {
            preserveScroll: true,
            onSuccess: () => setData('code', ''),
        });
    }

    return (
        <>
            <Head title="Verifikasi Reset Password — FAMS" />

            <main className="auth-page-enter relative flex min-h-screen items-center justify-center overflow-hidden bg-surface-warm px-4 py-6 font-sans text-text-primary sm:px-6">
                {/* Background */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 -left-32 h-[420px] w-[420px] rounded-full bg-orange-200/40 blur-[110px]" />
                    <div className="absolute right-0 -bottom-32 h-[460px] w-[460px] rounded-full bg-orange-100/70 blur-[120px]" />

                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage:
                                'radial-gradient(#FDBA74 0.8px, transparent 0.8px)',
                            backgroundSize: '24px 24px',
                        }}
                    />
                </div>

                {/* Main Container */}
                <section className="relative z-10 grid w-full max-w-[1100px] animate-[fadeIn_0.6s_ease-out] overflow-hidden rounded-[28px] border border-orange-200/80 bg-white shadow-[0_20px_70px_rgba(23,23,23,0.09)] lg:min-h-[680px] lg:grid-cols-[0.9fr_1.1fr]">
                    {/* LEFT: Verification Form */}
                    <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-14 lg:py-12">
                        {/* Brand */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500 text-lg font-bold text-white shadow-sm">
                                F
                            </div>

                            <div>
                                <span className="block text-xl font-semibold tracking-tight text-text-primary">
                                    FAMS
                                    <span className="text-primary-500">.</span>
                                </span>
                                <span className="block text-[9px] font-medium tracking-[0.16em] text-gray-500">
                                    FACULTY ASSET MANAGEMENT
                                </span>
                            </div>
                        </div>

                        {/* Heading */}
                        <div className="mt-10 mb-7">
                            <span className="inline-flex rounded-full border border-primary-200 bg-primary-soft px-3 py-1.5 text-[9px] font-semibold tracking-[0.18em] text-primary-600">
                                ACCOUNT RECOVERY
                            </span>

                            <h1 className="mt-5 text-[28px] font-semibold tracking-tight text-text-primary sm:text-[32px]">
                                Masukkan kode verifikasi
                            </h1>

                            <p className="mt-2 max-w-[350px] text-[13px] leading-6 text-gray-500">
                                Masukkan 6 digit kode yang dikirim ke email Anda
                                untuk melanjutkan reset password.
                            </p>
                        </div>

                        {/* Email Information */}
                        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-primary-200/80 bg-surface-warm p-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-500 text-white">
                                <Icon name="mail" size={20} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-text-primary">
                                    Kode verifikasi dikirim ke
                                </p>
                                <p className="mt-1 text-xs leading-5 break-all text-gray-500">
                                    {data.email || 'Email belum diisi'}
                                </p>
                            </div>
                        </div>

                        {/* Status */}
                        {status && (
                            <div
                                role="status"
                                className="mb-5 flex items-start gap-2.5 rounded-xl border border-primary-200 bg-primary-soft p-4 text-xs leading-5 text-primary-800"
                            >
                                <Icon
                                    name="info"
                                    size={16}
                                    className="mt-0.5 shrink-0 text-primary-600"
                                />
                                <span>{status}</span>
                            </div>
                        )}

                        {/* Verification Form */}
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                continueToReset();
                            }}
                        >
                            <div className="mb-5">
                                <label
                                    htmlFor="verification-code"
                                    className="mb-3 block text-xs font-semibold tracking-wide text-gray-700"
                                >
                                    Kode verifikasi
                                </label>

                                <div
                                    className={`relative flex h-[60px] items-center justify-center rounded-xl border bg-white transition ${
                                        codeFocused
                                            ? 'border-primary-500 ring-2 ring-primary-500/10'
                                            : 'border-orange-200'
                                    }`}
                                >
                                    <div
                                        aria-hidden="true"
                                        className="flex gap-2.5 sm:gap-3"
                                    >
                                        {Array.from(
                                            { length: 6 },
                                            (_, index) => (
                                                <span
                                                    key={index}
                                                    className={`flex h-10 w-9 items-center justify-center rounded-lg border text-lg font-semibold transition sm:w-10 ${
                                                        data.code[index]
                                                            ? 'border-primary-300 bg-primary-soft text-primary-600'
                                                            : 'border-orange-100 bg-white text-orange-200'
                                                    }`}
                                                >
                                                    {data.code[index] || '•'}
                                                </span>
                                            ),
                                        )}
                                    </div>

                                    <input
                                        id="verification-code"
                                        aria-label="Masukkan kode verifikasi 6 digit"
                                        autoComplete="one-time-code"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={6}
                                        value={data.code}
                                        onChange={(event) =>
                                            setData(
                                                'code',
                                                event.target.value
                                                    .replace(/\D/g, '')
                                                    .slice(0, 6),
                                            )
                                        }
                                        onFocus={() => setCodeFocused(true)}
                                        onBlur={() => setCodeFocused(false)}
                                        className="absolute inset-0 h-full w-full cursor-text opacity-0"
                                    />
                                </div>

                                <div className="mt-3 flex items-center justify-between gap-3 text-[10px]">
                                    <span className="text-gray-400">
                                        Masukkan kode 6 digit
                                    </span>

                                    <button
                                        type="button"
                                        onClick={resendCode}
                                        disabled={processing}
                                        className="font-semibold text-primary-600 underline underline-offset-2 transition hover:text-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Kirim ulang kode
                                    </button>
                                </div>

                                {errors.code && (
                                    <p className="mt-2 text-xs text-red-600">
                                        {errors.code}
                                    </p>
                                )}
                            </div>

                            {/* Information */}
                            <div className="mb-5 flex items-start gap-2 rounded-xl border border-primary-200/80 bg-surface-warm p-3 text-[10px] leading-4 text-gray-600">
                                <Icon
                                    name="info"
                                    size={14}
                                    className="mt-0.5 shrink-0 text-primary-600"
                                />
                                <span>
                                    Kode hanya berlaku selama 10 menit dan
                                    maksimal 5 kali percobaan.
                                </span>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={data.code.length !== 6 || processing}
                                className="group flex h-[50px] w-full items-center justify-between rounded-input bg-primary-500 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                            >
                                <span>
                                    {processing
                                        ? 'Memverifikasi...'
                                        : 'Verifikasi & Lanjutkan'}
                                </span>

                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/20">
                                    <Icon name="arrow-right" size={16} />
                                </span>
                            </button>
                        </form>

                        {/* Back to Email */}
                        <div className="mt-7 border-t border-orange-100 pt-6">
                            <Link
                                href="/forgot-password"
                                className="group mx-auto flex h-11 w-full items-center justify-center gap-2 rounded-input border border-primary-200 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-primary-500 hover:bg-surface-warm hover:text-primary-600"
                            >
                                <Icon name="arrow-left" size={15} />
                                <span>Ganti alamat email</span>
                            </Link>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 flex flex-col items-center gap-2">
                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                <Icon name="shield" size={13} />
                                <span>Secure Access</span>
                                <span className="text-orange-200">•</span>
                                <span>FAMS</span>
                            </div>

                            <p className="text-center text-[10px] text-gray-400">
                                © {new Date().getFullYear()} Faculty Asset
                                Management System
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: Visual Panel */}
                    <AuthVisualPanel />
                </section>

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
