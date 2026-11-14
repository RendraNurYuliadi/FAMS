import Button from '../components/Button';

export default function CTASection() {
    return (
        <section className="landing-section bg-white px-space-lg py-space-section-sm lg:px-space-2xl">
            <div className="mx-auto max-w-7xl overflow-hidden rounded-panel bg-gray-100 px-space-xl py-14 text-center sm:px-12 sm:py-20">
                <p className="text-caption font-bold tracking-[0.25em] text-gray-500 uppercase">
                    Mulai dari sini
                </p>

                <h2 className="mx-auto mt-5 max-w-3xl text-display-sm font-semibold tracking-tight text-gray-950 sm:text-display-md lg:text-display-lg">
                    Saatnya mengelola aset dengan lebih terstruktur.
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-body leading-7 text-gray-500 sm:text-body">
                    Kenali sistem FAMS dan temukan cara yang lebih terorganisir
                    untuk mengelola aset serta fasilitas fakultas.
                </p>

                <div className="mt-space-2xl flex flex-wrap justify-center gap-space-md">
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
