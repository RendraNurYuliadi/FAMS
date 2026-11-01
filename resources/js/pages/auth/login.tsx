
import { Head, Link, useForm } from '@inertiajs/react';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import Icon from '../../components/Icon';
import AuthVisualPanel from '../../components/auth/AuthVisualPanel';

type Props = {
    status?: string;
};

export default function Login({ status }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        next_url: '/dashboard',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post('/login', {
            onFinish: () => reset('password'),
        });
    }

    return (
        <>
            <Head title="Masuk — FAMS" />

            <main className="auth-page-enter relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafafa] px-4 py-6 font-sans text-neutral-950 sm:px-6">
                {/* Background */}
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

                {/* Main Container */}
                <section className="relative z-10 grid w-full max-w-[1100px] animate-[fadeIn_0.6s_ease-out] overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.07)] lg:min-h-[680px] lg:grid-cols-[0.9fr_1.1fr]">

                    {/* LEFT: Login Form */}
                    <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-14 lg:py-12">
                        {/* Brand */}
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

                        {/* Heading */}
                        <div className="mb-8 mt-12">
                            <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-[9px] font-semibold tracking-[0.18em] text-neutral-500">
                                FACULTY ACCESS
                            </span>

                            <h1 className="mt-5 text-[28px] font-semibold tracking-tight text-neutral-950 sm:text-[32px]">
                                Selamat datang kembali
                            </h1>

                            <p className="mt-2 max-w-[350px] text-[13px] leading-6 text-neutral-500">
                                Masuk ke akun Anda untuk melanjutkan pengelolaan dan peminjaman aset fakultas.
                            </p>
                        </div>

                        {status && (
                            <div className="mb-5 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-xs leading-5 text-neutral-700">
                                {status}
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={submit} className="space-y-5">
                            <AuthInput
                                label="EMAIL"
                                name="email"
                                type="email"
                                placeholder="nama@email.com"
                                autoComplete="username"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                error={errors.email}
                                required
                            />

                            <PasswordInput
                                label="PASSWORD"
                                name="password"
                                placeholder="Masukkan password"
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                error={errors.password}
                                required
                            />

                            {/* Remember & Forgot */}
                            <div className="flex items-center justify-between gap-3 pt-1">
                                <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-500 transition hover:text-neutral-900">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData('remember', e.target.checked)
                                        }
                                        className="h-4 w-4 cursor-pointer rounded border-neutral-300 accent-neutral-950"
                                    />
                                    Ingat saya
                                </label>

                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-medium text-neutral-600 transition hover:text-neutral-950 hover:underline"
                                >
                                    Lupa password?
                                </Link>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="group flex h-[50px] w-full items-center justify-between rounded-xl bg-neutral-950 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span>
                                    {processing ? 'Memproses...' : 'Masuk'}
                                </span>

                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-white/20">
                                    {processing ? (
                                        <Icon name="clock" size={16} />
                                    ) : (
                                        <Icon name="arrow-right" size={16} />
                                    )}
                                </span>
                            </button>
                        </form>

                        {/* Register */}
                        <div className="mt-7 border-t border-neutral-100 pt-6">
                            <p className="text-center text-[13px] text-neutral-500">
                                Belum memiliki akun?
                            </p>

                            <Link
                                href="/register"
                                className="group mx-auto mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white text-sm font-semibold text-neutral-800 transition-all duration-300 hover:border-neutral-950 hover:bg-neutral-50"
                            >
                                <span>Daftar sekarang</span>

                                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-neutral-200">
                                    <Icon name="arrow-up-right" size={14} />
                                </span>
                            </Link>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 flex flex-col items-center gap-2">
                            <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                                <Icon name="shield" size={13} />
                                <span>Secure Access</span>
                                <span className="text-neutral-300">•</span>
                                <span>FAMS</span>
                            </div>

                            <p className="text-center text-[10px] text-neutral-400">
                                © {new Date().getFullYear()} Faculty Asset Management System
                            </p>
                        </div>
                    </div>

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
