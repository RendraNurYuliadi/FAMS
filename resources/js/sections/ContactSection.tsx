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

    const handleChange = (field: keyof typeof initialForm, value: string) => {
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
            className="landing-section relative isolate overflow-hidden bg-surface-warm px-space-lg py-space-section sm:py-space-section-lg lg:px-space-2xl"
        >
            {/* Background Decoration */}
            <div className="pointer-events-none absolute top-20 -left-32 -z-10 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
            <div className="pointer-events-none absolute right-0 -bottom-32 -z-10 h-96 w-96 rounded-full bg-[#F97316]/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                {/* Section Heading */}
                <div className="mb-12 max-w-2xl">
                    <SectionHeading
                        eyebrow="Hubungi Kami"
                        title="Butuh informasi tentang pengelolaan aset?"
                        description="Gunakan kanal informasi FAMS untuk menanyakan prosedur peminjaman, ketersediaan fasilitas, atau menyampaikan pertanyaan dan masukan kepada pengelola."
                        centered={false}
                    />
                </div>

                <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
                    {/* LEFT: CONTACT INFORMATION */}
                    <div className="relative isolate overflow-hidden rounded-3xl bg-charcoal-900 p-space-xl text-white shadow-xl shadow-orange-950/10 sm:p-space-2xl">
                        {/* Decorative Elements */}
                        <div className="pointer-events-none absolute -top-20 -right-20 -z-10 h-64 w-64 rounded-full border border-white/10" />
                        <div className="pointer-events-none absolute -top-10 -right-10 -z-10 h-44 w-44 rounded-full border border-[#F97316]/20" />
                        <div className="pointer-events-none absolute -bottom-24 -left-20 -z-10 h-64 w-64 rounded-full bg-[#F97316]/10 blur-3xl" />

                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-[#F97316]/10 px-3 py-2 text-micro font-semibold tracking-[0.16em] text-orange-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
                                CONTACT INFORMATION
                            </span>

                            <h3 className="mt-7 text-heading font-bold text-white">
                                Informasi Kontak
                            </h3>

                            <p className="mt-3 max-w-sm text-body leading-7 text-gray-400">
                                Informasi mengenai pengelolaan dan layanan
                                fasilitas fakultas melalui sistem FAMS.
                            </p>
                        </div>

                        {/* Contact List */}
                        <div className="mt-10 space-y-7">
                            {contacts.map((contact, index) => (
                                <div
                                    key={contact.title}
                                    className="flex items-start gap-4"
                                >
                                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-orange-400/20 bg-[#F97316]/10 text-[#F97316]">
                                        <Icon name={contact.icon} size={20} />
                                    </span>

                                    <div className="min-w-0 pt-1">
                                        <h4 className="text-body font-semibold text-white">
                                            {contact.title}
                                        </h4>

                                        <p className="mt-1 text-body leading-6 text-gray-400">
                                            {contact.detail}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* FAQ Card */}
                        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.06] p-6">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-[#F97316] text-white">
                                <Icon name="help-circle" size={21} />
                            </div>

                            <h3 className="mt-5 text-subheading font-bold text-white">
                                Punya pertanyaan umum?
                            </h3>

                            <p className="mt-2 text-body leading-7 text-gray-400">
                                Temukan jawaban dari pertanyaan yang sering
                                diajukan seputar penggunaan dan layanan FAMS.
                            </p>

                            <a
                                href="#faq"
                                className="mt-5 inline-flex items-center gap-2 text-body font-semibold text-[#FB923C] transition hover:gap-3 hover:text-orange-300"
                            >
                                Lihat FAQ
                                <Icon name="arrow-right" size={16} />
                            </a>
                        </div>

                        {/* Bottom Accent */}
                        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#EA580C] via-[#F97316] to-orange-300" />
                    </div>

                    {/* RIGHT: QUESTION FORM */}
                    <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-lg shadow-orange-950/[0.04] sm:p-8 lg:p-9">
                        {/* Form Header */}
                        <div className="mb-8 flex items-start gap-4">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E3] text-[#EA580C]">
                                <Icon name="message" size={22} />
                            </div>

                            <div>
                                <h3 className="text-heading font-bold tracking-tight text-[#171717]">
                                    Ask a Question
                                </h3>

                                <p className="mt-2 text-body leading-7 text-gray-500">
                                    Sampaikan pertanyaan, kendala, atau masukan
                                    terkait pengelolaan aset melalui formulir
                                    berikut.
                                </p>
                            </div>
                        </div>

                        {submitted ? (
                            /* SUCCESS STATE */
                            <div className="rounded-2xl border border-green-200 bg-green-50/70 p-7 text-center sm:p-10">
                                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-green-600 text-white">
                                    <Icon name="check" size={26} />
                                </div>

                                <h4 className="mt-5 text-subheading font-bold text-[#171717]">
                                    Formulir berhasil disubmit!
                                </h4>

                                <p className="mx-auto mt-2 max-w-sm text-body leading-7 text-gray-600">
                                    Terima kasih telah mengirimkan pertanyaan.
                                    Formulir ini masih dalam mode demo dan belum
                                    dikirim ke pengelola FAMS.
                                </p>

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#F97316] px-6 py-3 text-body font-semibold text-white transition hover:bg-[#EA580C]"
                                >
                                    Kirim pertanyaan lainnya
                                    <Icon name="arrow-right" size={16} />
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name and Email */}
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="contact-name"
                                            className="mb-2 block text-body font-semibold text-gray-800"
                                        >
                                            Nama Lengkap
                                            <span className="ml-1 text-[#EA580C]">
                                                *
                                            </span>
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
                                                handleChange(
                                                    'name',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-gray-200 bg-[#FFFCF9] px-4 py-3 text-body text-gray-900 transition outline-none placeholder:text-gray-400 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/15"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="contact-email"
                                            className="mb-2 block text-body font-semibold text-gray-800"
                                        >
                                            Alamat Email
                                            <span className="ml-1 text-[#EA580C]">
                                                *
                                            </span>
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
                                                handleChange(
                                                    'email',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl border border-gray-200 bg-[#FFFCF9] px-4 py-3 text-body text-gray-900 transition outline-none placeholder:text-gray-400 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/15"
                                        />
                                    </div>
                                </div>

                                {/* Category */}
                                <div>
                                    <label
                                        htmlFor="contact-category"
                                        className="mb-2 block text-body font-semibold text-gray-800"
                                    >
                                        Kategori Pertanyaan
                                        <span className="ml-1 text-[#EA580C]">
                                            *
                                        </span>
                                    </label>

                                    <select
                                        id="contact-category"
                                        required
                                        value={form.category}
                                        onChange={(e) =>
                                            handleChange(
                                                'category',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-xl border border-gray-200 bg-[#FFFCF9] px-4 py-3 text-body text-gray-800 transition outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/15"
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
                                        className="mb-2 block text-body font-semibold text-gray-800"
                                    >
                                        Subjek Pertanyaan
                                        <span className="ml-1 text-[#EA580C]">
                                            *
                                        </span>
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
                                            handleChange(
                                                'subject',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded-xl border border-gray-200 bg-[#FFFCF9] px-4 py-3 text-body text-gray-900 transition outline-none placeholder:text-gray-400 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/15"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <div className="mb-2 flex items-center justify-between gap-2">
                                        <label
                                            htmlFor="contact-message"
                                            className="block text-body font-semibold text-gray-800"
                                        >
                                            Pertanyaan atau Pesan
                                            <span className="ml-1 text-[#EA580C]">
                                                *
                                            </span>
                                        </label>

                                        <span className="text-caption text-gray-400 tabular-nums">
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
                                            handleChange(
                                                'message',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full resize-y rounded-xl border border-gray-200 bg-[#FFFCF9] px-4 py-3 text-body leading-7 text-gray-900 transition outline-none placeholder:text-gray-400 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/15"
                                    />
                                </div>

                                {/* Submit */}
                                <div className="flex flex-col gap-4 border-t border-orange-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-caption leading-5 text-gray-400">
                                        <span className="text-[#EA580C]">
                                            *
                                        </span>{' '}
                                        Wajib diisi.
                                    </p>

                                    <div className="flex flex-col-reverse gap-3 sm:flex-row">
                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="rounded-full border border-gray-200 bg-white px-6 py-3 text-body font-semibold text-gray-600 transition hover:border-gray-400 hover:bg-gray-50"
                                        >
                                            Reset
                                        </button>

                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F97316] px-7 py-3 text-body font-semibold text-white transition hover:bg-[#EA580C]"
                                        >
                                            Kirim Pertanyaan
                                            <Icon
                                                name="arrow-right"
                                                size={16}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-10 border-t border-orange-200/70 pt-6">
                    <p className="text-caption leading-6 text-gray-500">
                        Informasi kontak pada halaman demo perlu disesuaikan
                        dengan informasi resmi institusi. Formulir pertanyaan
                        saat ini masih berupa simulasi frontend.
                    </p>
                </div>
            </div>
        </section>
    );
}
