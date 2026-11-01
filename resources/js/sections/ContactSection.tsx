
import { useState, type FormEvent } from 'react';
import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';

const contacts = [
    {
        icon: 'building' as const,
        title: 'Pengelola FAMS',
        detail: 'Informasi pengelolaan aset fakultas',
    },
    {
        icon: 'mail' as const,
        title: 'Email',
        detail: 'Alamat email resmi belum ditetapkan',
    },
    {
        icon: 'map-pin' as const,
        title: 'Lokasi',
        detail: 'Fakultas / institusi terkait',
    },
];

const categories = [
    'Informasi Umum',
    'Peminjaman Aset',
    'Pengembalian Aset',
    'Ketersediaan Aset',
    'Kondisi dan Kerusakan Aset',
    'Maintenance',
    'Lainnya',
];

const initialForm = {
    name: '',
    email: '',
    category: 'Informasi Umum',
    subject: '',
    message: '',
};

export default function ContactSection() {
    const [form, setForm] = useState(initialForm);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Simulasi submit frontend.
        // Nantinya dapat dihubungkan ke API Laravel.
        setSubmitted(true);
    };

    const handleChange = (
        field: keyof typeof initialForm,
        value: string,
    ) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));

        if (submitted) {
            setSubmitted(false);
        }
    };

    const handleReset = () => {
        setForm(initialForm);
        setSubmitted(false);
    };

    return (
        <section
            id="kontak"
            className="relative isolate overflow-hidden bg-gradient-to-br from-neutral-100 via-white to-neutral-200 px-5 py-24 sm:py-28 lg:px-8"
        >
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(23,23,23,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        maskImage:
                            'radial-gradient(ellipse at 30% 45%, black 5%, transparent 72%)',
                    }}
                />
            </div>
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mb-12 max-w-2xl">
                    <SectionHeading
                        eyebrow="Hubungi Kami"
                        title="Butuh informasi tentang pengelolaan aset?"
                        description="Gunakan kanal informasi FAMS untuk menanyakan prosedur peminjaman, ketersediaan fasilitas, atau menyampaikan pertanyaan dan masukan kepada pengelola."
                        centered={false}
                    />
                </div>

                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">

                    {/* Left: Contact Information */}
                    <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-700 p-6 text-white shadow-[0_20px_55px_rgba(0,0,0,0.18)] sm:p-8">
                        <div
                            className="pointer-events-none absolute inset-0 -z-10 opacity-15"
                            style={{
                                backgroundImage:
                                    'repeating-linear-gradient(135deg, white 0, white 1px, transparent 1px, transparent 14px)',
                                maskImage:
                                    'linear-gradient(135deg, black, transparent 60%)',
                            }}
                        />
                        <div className="pointer-events-none absolute -right-12 -top-16 -z-10 size-48 rounded-full border border-white/15" />
                        <div className="pointer-events-none absolute -right-4 -top-8 -z-10 size-32 rounded-full border border-white/10" />
                        <div>
                            <h3 className="text-lg font-bold text-white">
                                Informasi Kontak
                            </h3>

                            <p className="mt-2 text-sm leading-7 text-white/65">
                                Informasi mengenai pengelolaan dan layanan
                                fasilitas fakultas melalui sistem FAMS.
                            </p>
                        </div>

                        <div className="mt-8 space-y-6">
                            {contacts.map((contact) => (
                                <div
                                    key={contact.title}
                                    className="group flex items-start gap-4"
                                >
                                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white transition group-hover:bg-white group-hover:text-neutral-950">
                                        <Icon
                                            name={contact.icon}
                                            size={20}
                                        />
                                    </span>

                                    <div className="pt-1">
                                        <h4 className="text-sm font-semibold text-white">
                                            {contact.title}
                                        </h4>

                                        <p className="mt-1 text-sm leading-6 text-white/60">
                                            {contact.detail}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* FAQ Card */}
                        <div className="mt-8 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm sm:p-7">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-white text-neutral-950">
                                <Icon name="help-circle" size={21} />
                            </div>

                            <h3 className="mt-5 text-lg font-bold text-white">
                                Punya pertanyaan umum?
                            </h3>

                            <p className="mt-2 text-sm leading-7 text-white/65">
                                Temukan jawaban dari pertanyaan yang sering
                                diajukan seputar penggunaan dan layanan FAMS.
                            </p>

                            <a
                                href="#faq"
                                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:gap-3 hover:text-white/70"
                            >
                                Lihat FAQ
                                <Icon name="arrow-right" size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Right: Ask a Question Form */}
                    <div className="rounded-3xl border border-white bg-gradient-to-br from-white via-white to-neutral-100 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-8 lg:p-9">

                        {/* Form Header */}
                        <div className="mb-8">
                            <div className="flex size-12 items-center justify-center rounded-2xl bg-neutral-950 text-white">
                                <Icon name="message" size={22} />
                            </div>

                            <h3 className="mt-5 text-2xl font-bold tracking-tight text-neutral-950">
                                Ask a Question
                            </h3>

                            <p className="mt-2 text-sm leading-7 text-neutral-500">
                                Sampaikan pertanyaan, kendala, atau masukan
                                terkait pengelolaan aset melalui formulir berikut.
                            </p>
                        </div>

                        {submitted ? (
                            /* Success State */
                            <div className="rounded-2xl border border-neutral-200 bg-white p-7 text-center sm:p-10">
                                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-neutral-950 text-white">
                                    <Icon name="check" size={26} />
                                </div>

                                <h4 className="mt-5 text-lg font-bold text-neutral-950">
                                    Formulir berhasil disubmit!
                                </h4>

                                <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-neutral-500">
                                    Terima kasih telah mengirimkan pertanyaan.
                                    Formulir ini masih dalam mode demo dan
                                    belum dikirim ke pengelola FAMS.
                                </p>

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
                                >
                                    Kirim pertanyaan lainnya
                                    <Icon name="arrow-right" size={16} />
                                </button>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                {/* Name and Email */}
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="contact-name"
                                            className="mb-2 block text-sm font-semibold text-neutral-800"
                                        >
                                            Nama Lengkap
                                            <span className="ml-1 text-neutral-600">*</span>
                                        </label>

                                        <input
                                            id="contact-name"
                                            type="text"
                                            required
                                            minLength={3}
                                            maxLength={100}
                                            autoComplete="name"
                                            placeholder="Masukkan nama lengkap"
                                            value={form.name}
                                            onChange={(e) =>
                                                handleChange('name', e.target.value)
                                            }
                                            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/5"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="contact-email"
                                            className="mb-2 block text-sm font-semibold text-neutral-800"
                                        >
                                            Alamat Email
                                            <span className="ml-1 text-neutral-600">*</span>
                                        </label>

                                        <input
                                            id="contact-email"
                                            type="email"
                                            required
                                            maxLength={150}
                                            autoComplete="email"
                                            placeholder="nama@email.com"
                                            value={form.email}
                                            onChange={(e) =>
                                                handleChange('email', e.target.value)
                                            }
                                            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/5"
                                        />
                                    </div>
                                </div>

                                {/* Category */}
                                <div>
                                    <label
                                        htmlFor="contact-category"
                                        className="mb-2 block text-sm font-semibold text-neutral-800"
                                    >
                                        Kategori Pertanyaan
                                        <span className="ml-1 text-neutral-600">*</span>
                                    </label>

                                    <select
                                        id="contact-category"
                                        required
                                        value={form.category}
                                        onChange={(e) =>
                                            handleChange('category', e.target.value)
                                        }
                                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/5"
                                    >
                                        {categories.map((category) => (
                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label
                                        htmlFor="contact-subject"
                                        className="mb-2 block text-sm font-semibold text-neutral-800"
                                    >
                                        Subjek Pertanyaan
                                        <span className="ml-1 text-neutral-600">*</span>
                                    </label>

                                    <input
                                        id="contact-subject"
                                        type="text"
                                        required
                                        minLength={3}
                                        maxLength={150}
                                        placeholder="Contoh: Informasi peminjaman proyektor"
                                        value={form.subject}
                                        onChange={(e) =>
                                            handleChange('subject', e.target.value)
                                        }
                                        className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/5"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <div className="mb-2 flex items-center justify-between gap-2">
                                        <label
                                            htmlFor="contact-message"
                                            className="block text-sm font-semibold text-neutral-800"
                                        >
                                            Pertanyaan atau Pesan
                                            <span className="ml-1 text-neutral-600">*</span>
                                        </label>

                                        <span className="text-xs text-neutral-400">
                                            {form.message.length}/1000
                                        </span>
                                    </div>

                                    <textarea
                                        id="contact-message"
                                        required
                                        minLength={10}
                                        maxLength={1000}
                                        rows={5}
                                        placeholder="Tuliskan pertanyaan atau pesan yang ingin disampaikan..."
                                        value={form.message}
                                        onChange={(e) =>
                                            handleChange('message', e.target.value)
                                        }
                                        className="w-full resize-y rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm leading-7 text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/5"
                                    />
                                </div>

                                {/* Submit */}
                                <div className="flex flex-col gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs leading-5 text-neutral-400">
                                        <span className="text-neutral-600">*</span>
                                        {' '}Wajib diisi.
                                    </p>

                                    <div className="flex flex-col-reverse gap-3 sm:flex-row">
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-100"
                                        >
                                            Reset
                                        </button>

                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-7 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700"
                                        >
                                            Kirim Pertanyaan
                                            <Icon name="arrow-right" size={16} />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-10 border-t border-neutral-100 pt-6">
                    <p className="text-xs leading-6 text-neutral-400">
                        Informasi kontak pada halaman demo perlu disesuaikan
                        dengan informasi resmi institusi. Formulir pertanyaan
                        saat ini masih berupa simulasi frontend.
                    </p>
                </div>
            </div>
        </section>
    );
}
