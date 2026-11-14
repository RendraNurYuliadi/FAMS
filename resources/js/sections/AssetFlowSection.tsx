export default function AssetFlowSection() {
    return (
        <section className="landing-section landing-section--dark relative overflow-hidden bg-charcoal-900 py-space-section text-white md:py-space-section-xl">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute top-20 -right-40 h-96 w-96 rounded-full bg-[#F97316]/[0.07] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-white/[0.035] blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-space-xl lg:grid-cols-2 lg:gap-20">
                {/* LEFT: CONTENT */}
                <div>
                    <span className="mb-space-xl inline-flex items-center gap-space-sm rounded-full border border-orange-500/30 bg-white/[0.05] px-space-lg py-space-sm text-micro font-medium tracking-[0.2em] text-orange-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
                        SMART FACILITY MANAGEMENT
                    </span>

                    <h2 className="max-w-xl text-display-md leading-[1.15] font-semibold tracking-tight text-white md:text-display-lg lg:text-display-xl">
                        Membangun pengelolaan aset
                        <span className="mt-space-sm block text-[#F97316]">
                            yang lebih terarah.
                        </span>
                    </h2>

                    <p className="mt-7 max-w-lg text-body leading-8 text-gray-300 md:text-body">
                        FAMS menghadirkan sistem pengelolaan aset fakultas yang
                        terintegrasi. Mulai dari pendataan, peminjaman,
                        pengembalian, hingga pemeliharaan, seluruh proses
                        dirancang agar lebih terstruktur, transparan, dan
                        efisien.
                    </p>

                    <div className="mt-10 flex items-center gap-space-lg">
                        <div className="h-px w-12 bg-[#F97316]" />
                        <span className="text-micro tracking-[0.25em] text-gray-400">
                            ONE SYSTEM. BETTER MANAGEMENT.
                        </span>
                    </div>
                </div>

                {/* RIGHT: IMAGE */}
                <div className="mx-auto w-full max-w-xl">
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-charcoal-800 sm:rounded-3xl">
                        {/* Main Image */}
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxswbrO0G0uxCHIYkF-Ef03waC0Zv_x5GZMUJzy5zEW0GQ5uKCW_e0XolI&s=10"
                            alt="Ilustrasi pengelolaan aset dan fasilitas FAMS"
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85" />

                        {/* Top Labels - Inside Image */}
                        <div className="absolute top-5 right-5 left-5 z-10 flex items-center justify-between sm:top-7 sm:right-7 sm:left-7">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 backdrop-blur-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#F97316]" />
                                <span className="text-micro font-semibold tracking-[0.18em] text-white">
                                    FAMS SYSTEM
                                </span>
                            </div>

                            <span className="rounded-full border border-white/20 bg-black/40 px-3 py-2 text-micro tracking-widest text-white backdrop-blur-sm">
                                01 / 03
                            </span>
                        </div>

                        {/* Bottom Image Label */}
                        <div className="absolute right-0 bottom-0 left-0 z-10 p-6 sm:p-8">
                            <span className="text-micro font-semibold tracking-[0.22em] text-[#FB923C]">
                                FACULTY ASSET MANAGEMENT
                            </span>

                            <h3 className="mt-3 max-w-md text-heading leading-tight font-semibold text-white sm:text-display-sm">
                                Satu sistem untuk pengelolaan aset yang lebih
                                baik.
                            </h3>

                            <p className="mt-3 max-w-sm text-caption leading-6 text-white/75">
                                Mendukung pengelolaan fasilitas fakultas melalui
                                proses digital yang terstruktur.
                            </p>

                            <div className="mt-5 flex items-center gap-3">
                                <div className="h-[2px] w-9 bg-[#F97316]" />
                                <span className="text-micro tracking-[0.2em] text-white/70">
                                    MANAGE SMARTER
                                </span>
                            </div>
                        </div>

                        {/* Orange Bottom Accent */}
                        <div className="absolute bottom-0 left-0 z-20 h-1 w-full bg-[#F97316]" />
                    </div>

                    {/* Image Footer */}
                    <div className="mt-5 flex items-center justify-between px-1 text-micro tracking-[0.18em] text-gray-500">
                        <span>BUILDING BETTER FACILITIES</span>
                        <span>FAMS — 2026</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
