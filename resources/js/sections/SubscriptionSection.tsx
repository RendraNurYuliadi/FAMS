import { useState } from 'react';
import Icon from '../components/Icon';

export default function SubscriptionSection() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage('Masukkan alamat email yang valid.');
            return;
        }

        setMessage(
            'Form demo berhasil divalidasi. Fitur subscription belum terhubung ke server.',
        );
    }

    return (
        <section className="landing-section relative overflow-hidden bg-surface-warm px-space-lg py-space-section-sm lg:px-space-2xl">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute top-10 -left-32 h-72 w-72 rounded-full bg-[#F97316]/10 blur-3xl" />
            <div className="pointer-events-none absolute right-0 -bottom-32 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-3xl bg-[#171717] px-7 py-12 shadow-xl shadow-orange-950/10 sm:px-12 sm:py-16 lg:px-16">
                    {/* Orange Decoration */}
                    <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-[#F97316]/15 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />

                    <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* LEFT: CONTENT */}
                        <div className="max-w-xl">
                            <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-[#F97316]/10 px-4 py-2 text-micro font-semibold tracking-[0.18em] text-orange-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
                                INFORMASI FAMS
                            </span>

                            <h2 className="mt-6 text-display-sm leading-tight font-semibold tracking-tight text-white sm:text-display-md">
                                Dapatkan informasi dan
                                <span className="block text-[#F97316]">
                                    pembaruan terbaru.
                                </span>
                            </h2>

                            <p className="mt-5 max-w-lg text-body leading-8 text-gray-400">
                                Formulir ini merupakan contoh tampilan
                                subscription untuk mendapatkan informasi seputar
                                pengelolaan aset dan fasilitas FAMS.
                            </p>

                            <div className="mt-8 flex items-center gap-3">
                                <div className="h-[2px] w-10 bg-[#F97316]" />
                                <span className="text-micro tracking-[0.18em] text-gray-500">
                                    STAY CONNECTED WITH FAMS
                                </span>
                            </div>
                        </div>

                        {/* RIGHT: SUBSCRIPTION FORM */}
                        <div className="relative rounded-2xl border border-white/10 bg-white/[0.05] p-6 sm:p-8">
                            <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F97316]/15 text-[#F97316]">
                                <Icon name="mail" size={23} />
                            </div>

                            <h3 className="text-heading font-semibold text-white">
                                Berlangganan Informasi
                            </h3>

                            <p className="mt-2 text-caption leading-6 text-gray-400">
                                Masukkan email untuk mencoba formulir
                                subscription FAMS.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-7">
                                <label
                                    htmlFor="subscription-email"
                                    className="mb-3 block text-caption font-medium text-gray-300"
                                >
                                    Alamat email
                                </label>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <input
                                        id="subscription-email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        placeholder="nama@email.com"
                                        className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-body text-white transition outline-none placeholder:text-gray-500 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20"
                                    />

                                    <button
                                        type="submit"
                                        className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#F97316] px-6 py-3.5 text-body font-semibold text-white transition hover:bg-[#EA580C]"
                                    >
                                        Berlangganan
                                        <Icon name="arrow-right" size={16} />
                                    </button>
                                </div>

                                {message && (
                                    <p
                                        aria-live="polite"
                                        className="mt-4 text-caption leading-6 text-orange-300"
                                    >
                                        {message}
                                    </p>
                                )}

                                <p className="mt-4 text-micro leading-5 text-gray-500">
                                    Belum ada email yang disimpan atau dikirim.
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#EA580C] via-[#F97316] to-orange-300" />
                </div>
            </div>
        </section>
    );
}
