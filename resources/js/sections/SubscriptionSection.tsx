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

        setMessage('Form demo berhasil divalidasi. Fitur subscription belum terhubung ke server.');
    }

    return (
        <section className="bg-neutral-950 px-5 py-20 text-white lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-9 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                        Informasi FAMS
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Dapatkan informasi dan pembaruan.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-neutral-400">
                        Formulir ini merupakan contoh tampilan subscription untuk informasi FAMS.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full max-w-lg">
                    <label htmlFor="subscription-email" className="mb-3 block text-xs text-neutral-400">
                        Alamat email
                    </label>
                    <div className="flex gap-2 rounded-full border border-white/20 bg-white/5 p-1.5">
                        <input
                            id="subscription-email"
                            type="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="nama@email.com"
                            className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-neutral-500"
                        />
                        <button
                            type="submit"
                            className="flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
                        >
                            Berlangganan <Icon name="arrow-right" size={16} />
                        </button>
                    </div>
                    {message && (
                        <p aria-live="polite" className="mt-3 text-xs leading-6 text-neutral-300">
                            {message}
                        </p>
                    )}
                    <p className="mt-3 text-[10px] leading-5 text-neutral-500">
                        Belum ada email yang disimpan atau dikirim.
                    </p>
                </form>
            </div>
        </section>
    );
}