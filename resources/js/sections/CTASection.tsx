import Button from '../components/Button';

export default function CTASection() {
    return (
        <section className="bg-white px-5 py-20 lg:px-8">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-neutral-100 px-6 py-14 text-center sm:px-12 sm:py-20">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
                    Mulai dari sini
                </p>

                <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
                    Saatnya mengelola aset dengan lebih terstruktur.
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
                    Kenali sistem FAMS dan temukan cara yang lebih terorganisir
                    untuk mengelola aset serta fasilitas fakultas.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Button href="/login">
                        Masuk ke FAMS <span aria-hidden="true">↗</span>
                    </Button>

                    <Button href="#beranda" variant="secondary">
                        Kembali ke Atas ↑
                    </Button>
                </div>
            </div>
        </section>
    );
}