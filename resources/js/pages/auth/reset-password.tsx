import { Head, Link, useForm } from '@inertiajs/react';
import PasswordInput from '../../components/auth/PasswordInput';
import AuthInput from '../../components/auth/AuthInput';
import Icon from '../../components/Icon';
import AuthVisualPanel from '../../components/auth/AuthVisualPanel';

type Props = {
    email: string;
};

export default function ResetPassword({ email }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email,
        password: '',
        password_confirmation: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post('/reset-password', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    }

    return (
        <>
            <Head title="Reset Password — FAMS" />

            <main className="auth-page-enter relative flex min-h-screen items-center justify-center overflow-hidden bg-surface-warm px-4 py-6 font-sans text-text-primary sm:px-6">
                {/* Background */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-1/2 left-1/4 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-200/40 blur-[110px]" />

                    <div className="absolute top-0 right-0 h-[380px] w-[380px] rounded-full bg-orange-100/50 blur-[100px]" />

                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage:
                                'radial-gradient(#FDBA74 0.7px, transparent 0.7px)',
                            backgroundSize: '22px 22px',
                        }}
                    />
                </div>

                {/* Main Container */}
                <section className="relative z-10 grid w-full max-w-[1100px] animate-[fadeIn_0.6s_ease-out] overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-[0_20px_70px_rgba(23,23,23,0.08)] lg:min-h-[680px] lg:grid-cols-[0.9fr_1.1fr]">
                    {/* LEFT: Reset Password Form */}
                    <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-14 lg:py-12">
                        {/* Brand */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500 text-lg font-bold text-white shadow-sm">
                                <span className="text-orange-400">F</span>
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
                        <div className="mt-12 mb-8">
                            <span className="inline-flex rounded-full border border-primary-200 bg-primary-soft px-3 py-1.5 text-[9px] font-semibold tracking-[0.18em] text-primary-600">
                                ACCOUNT RECOVERY
                            </span>

                            <h1 className="mt-5 text-[28px] font-semibold tracking-tight text-text-primary sm:text-[32px]">
                                Buat password baru
                            </h1>

                            <p className="mt-2 max-w-[350px] text-[13px] leading-6 text-gray-500">
                                Buat password baru yang kuat untuk mengamankan
                                akun FAMS Anda.
                            </p>
                        </div>

                        {/* Reset Form */}
                        <form onSubmit={submit} className="space-y-5">
                            <AuthInput
                                label="EMAIL"
                                name="email"
                                type="email"
                                placeholder="nama@email.com"
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                error={errors.email}
                                required
                            />

                            <PasswordInput
                                label="PASSWORD BARU"
                                name="password"
                                placeholder="Masukkan password baru"
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                error={errors.password}
                                required
                            />

                            <PasswordInput
                                label="KONFIRMASI PASSWORD"
                                name="password_confirmation"
                                placeholder="Ulangi password baru"
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                error={errors.password_confirmation}
                                required
                            />

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="group flex h-[50px] w-full items-center justify-between rounded-input bg-primary-500 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span>
                                    {processing
                                        ? 'Memproses...'
                                        : 'Ubah Password'}
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

                        {/* Back to Login */}
                        <div className="mt-7 border-t border-orange-100 pt-6">
                            <Link
                                href="/login"
                                className="group mx-auto flex h-11 w-full items-center justify-center gap-2 rounded-input border border-primary-200 bg-white text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-primary-500 hover:bg-surface-warm hover:text-primary-600"
                            >
                                <Icon name="arrow-left" size={15} />
                                <span>Kembali ke login</span>
                            </Link>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 flex flex-col items-center gap-2">
                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                <Icon name="shield" size={13} />
                                <span>Secure Access</span>
                                <span className="text-orange-300">•</span>
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
