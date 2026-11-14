import { Head, Link, useForm } from '@inertiajs/react';
import AuthInput from '../../components/auth/AuthInput';
import Icon from '../../components/Icon';
import AuthVisualPanel from '../../components/auth/AuthVisualPanel';

type Props = {
    status?: string;
};

export default function ForgotPassword({ status }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post('/forgot-password');
    }

    return (
        <>
            <Head title="Lupa Password — FAMS" />

            <main className="auth-page-enter relative flex min-h-screen items-center justify-center overflow-hidden bg-surface-warm px-4 py-8 font-sans text-text-primary sm:px-6">
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
                    {/* LEFT: Forgot Password Form */}
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
                        <div className="mt-12 mb-8">
                            <span className="inline-flex rounded-full border border-primary-200 bg-primary-soft px-3 py-1.5 text-[9px] font-semibold tracking-[0.18em] text-primary-600">
                                ACCOUNT RECOVERY
                            </span>

                            <h1 className="mt-5 text-[28px] font-semibold tracking-tight text-text-primary sm:text-[32px]">
                                Lupa password?
                            </h1>

                            <p className="mt-2 max-w-[350px] text-[13px] leading-6 text-gray-500">
                                Masukkan email akun Anda. Setelah kode berhasil
                                dikirim, Anda langsung diarahkan ke halaman
                                verifikasi untuk memasukkan kode 6 digit.
                            </p>
                        </div>

                        {/* Status */}
                        {status && (
                            <div
                                role="status"
                                className="mb-5 rounded-xl border border-primary-200 bg-primary-soft p-4 text-xs leading-5 text-primary-800"
                            >
                                {status}
                            </div>
                        )}

                        {/* Forgot Password Form */}
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

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="group flex h-[50px] w-full items-center justify-between rounded-input bg-primary-500 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <span>
                                    {processing
                                        ? 'Mengirim kode...'
                                        : 'Kirim Kode Verifikasi'}
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
                            <p className="text-center text-[13px] text-gray-500">
                                Ingat password Anda?
                            </p>

                            <Link
                                href="/login"
                                className="group mx-auto mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-input border border-primary-200 bg-white text-sm font-semibold text-gray-800 transition-all duration-300 hover:border-primary-500 hover:bg-surface-warm hover:text-primary-600"
                            >
                                <Icon name="arrow-left" size={15} />
                                <span>Kembali ke halaman login</span>
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
                            opacity: 0                            ;
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
