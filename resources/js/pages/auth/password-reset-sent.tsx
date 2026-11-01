import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Icon from '../../components/Icon';
import AuthVisualPanel from '../../components/auth/AuthVisualPanel';

type Props = {
    email: string;
};

export default function PasswordResetSent({ email }: Props) {
    const resetUrl = `/reset-password/demo-token?email=${encodeURIComponent(email)}`;
    const [code, setCode] = useState('');
    const [codeFocused, setCodeFocused] = useState(false);
    const [notice, setNotice] = useState('');

    function continueToReset() {
        if (code.length !== 6) return;
        router.visit(resetUrl);
    }

    return (
        <>
            <Head title="Verifikasi Reset Password — FAMS" />

            <main className="auth-page-enter relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafafa] px-4 py-6 font-sans text-neutral-950 sm:px-6">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-1/4 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-200/40 blur-[110px]" />
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage:
                                'radial-gradient(#d4d4d4 0.7px, transparent 0.7px)',
                            backgroundSize: '22px 22px',
                        }}
                    />
                </div>

                <section className="relative z-10 grid w-full max-w-[1100px] animate-[fadeIn_0.6s_ease-out] overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.07)] lg:min-h-[680px] lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-14 lg:py-12">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-950 text-lg font-bold text-white shadow-sm">
                                F
                            </div>
                            <div>
                                <span className="block text-xl font-semibold tracking-tight text-neutral-950">
                                    FAMS<span className="text-neutral-400">.</span>
                                </span>
                                <span className="block text-[9px] font-medium tracking-[0.16em] text-neutral-500">
                                    FACULTY ASSET MANAGEMENT
                                </span>
                            </div>
                        </div>

                        <div className="mb-7 mt-10">
                            <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[9px] font-semibold tracking-[0.18em] text-neutral-500">
                                ACCOUNT RECOVERY
                            </span>
                            <h1 className="mt-5 text-[28px] font-semibold tracking-tight text-neutral-950 sm:text-[32px]">
                                Masukkan kode verifikasi
                            </h1>
                            <p className="mt-2 max-w-[350px] text-[13px] leading-6 text-neutral-500">
                                Masukkan 6 digit kode yang dikirim ke email Anda
                                untuk melanjutkan reset password.
                            </p>
                        </div>

                        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-white">
                                <Icon name="mail" size={20} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-neutral-900">
                                    Kode verifikasi dikirim ke
                                </p>
                                <p className="mt-1 break-all text-xs leading-5 text-neutral-500">
                                    {email || 'Email belum diisi'}
                                </p>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label
                                htmlFor="verification-code"
                                className="mb-3 block text-xs font-semibold tracking-wide text-neutral-700"
                            >
                                Kode verifikasi
                            </label>
                            <div
                                className={`relative flex h-[60px] items-center justify-center rounded-xl border bg-white transition ${
                                    codeFocused
                                        ? 'border-neutral-950 ring-2 ring-neutral-950/5'
                                        : 'border-neutral-200'
                                }`}
                            >
                                <div aria-hidden="true" className="flex gap-2.5 sm:gap-3">
                                    {Array.from({ length: 6 }, (_, index) => (
                                        <span
                                            key={index}
                                            className={`flex h-10 w-9 items-center justify-center rounded-lg border text-lg font-semibold transition sm:w-10 ${
                                                code[index]
                                                    ? 'border-neutral-400 bg-neutral-50 text-neutral-950'
                                                    : 'border-neutral-200 bg-white text-neutral-300'
                                            }`}
                                        >
                                            {code[index] || '•'}
                                        </span>
                                    ))}
                                </div>
                                <input
                                    id="verification-code"
                                    aria-label="Masukkan kode verifikasi 6 digit"
                                    autoComplete="one-time-code"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={6}
                                    value={code}
                                    onChange={(event) =>
                                        setCode(event.target.value.replace(/\D/g, '').slice(0, 6))
                                    }
                                    onFocus={() => setCodeFocused(true)}
                                    onBlur={() => setCodeFocused(false)}
                                    className="absolute inset-0 h-full w-full cursor-text opacity-0"
                                />
                            </div>
                            <div className="mt-3 flex items-center justify-between gap-3 text-[10px]">
                                <span className="text-neutral-400">
                                    Masukkan kode 6 digit
                                </span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setNotice('Mode pratinjau: kode tidak benar-benar dikirim melalui email.')
                                    }
                                    className="font-semibold text-neutral-800 underline underline-offset-2 transition hover:text-neutral-500"
                                >
                                    Kirim ulang kode
                                </button>
                            </div>
                        </div>

                        <div className="mb-5 flex items-start gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-[10px] leading-4 text-neutral-500">
                            <Icon name="info" size={14} className="mt-0.5 shrink-0" />
                            <span>
                                Mode pratinjau: pengiriman dan pemeriksaan kode belum diaktifkan.
                            </span>
                        </div>

                        {notice && (
                            <p role="status" className="mb-4 text-xs text-neutral-600">
                                {notice}
                            </p>
                        )}

                        <button
                            type="button"
                            onClick={continueToReset}
                            disabled={code.length !== 6}
                            className="group flex h-[50px] w-full items-center justify-between rounded-xl bg-neutral-950 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500"
                        >
                            <span>Verifikasi &amp; Lanjutkan</span>
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/20">
                                <Icon name="arrow-right" size={16} />
                            </span>
                        </button>

                        <div className="mt-7 border-t border-neutral-100 pt-6">
                            <Link
                                href="/forgot-password"
                                className="group mx-auto flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white text-sm font-semibold text-neutral-800 transition-all duration-300 hover:border-neutral-950 hover:bg-neutral-50"
                            >
                                <Icon name="arrow-left" size={15} />
                                <span>Ganti alamat email</span>
                            </Link>
                        </div>

                        <div className="mt-8 flex flex-col items-center gap-2">
                            <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                                <Icon name="shield" size={13} />
                                <span>Secure Access</span>
                                <span className="text-neutral-300">•</span>
                                <span>FAMS</span>
                            </div>
                            <p className="text-center text-[10px] text-neutral-400">
                                © {new Date().getFullYear()} Faculty Asset
                                Management System
                            </p>
                        </div>
                    </div>

                    <AuthVisualPanel />
                </section>

                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(14px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    @media (prefers-reduced-motion: reduce) {
                        section { animation: none !important; }
                    }
                `}</style>
            </main>
        </>
    );
}
