import Icon from '../components/Icon';

const faculties = [
    {
        number: '01',
        acronym: 'FKIP',
        name: 'Fakultas Keguruan dan Ilmu Pendidikan',
        description:
            'Mengembangkan kompetensi pendidikan, pengajaran, dan tenaga pendidik profesional.',
    },
    {
        number: '02',
        acronym: 'FIB',
        name: 'Fakultas Ilmu Budaya',
        description:
            'Mendorong pengembangan ilmu bahasa, sastra, budaya, dan wawasan global.',
    },
    {
        number: '03',
        acronym: 'FEB',
        name: 'Fakultas Ekonomi dan Bisnis',
        description:
            'Mempelajari bidang ekonomi, manajemen, akuntansi, dan kewirausahaan.',
    },
    {
        number: '04',
        acronym: 'FISIP',
        name: 'Fakultas Ilmu Sosial dan Ilmu Politik',
        description:
            'Berfokus pada ilmu sosial, administrasi publik, dan tata kelola pemerintahan.',
    },
    {
        number: '05',
        acronym: 'FIKES',
        name: 'Fakultas Ilmu Kesehatan',
        description:
            'Mengembangkan keilmuan dan kompetensi di bidang kesehatan masyarakat dan keperawatan.',
    },
    {
        number: '06',
        acronym: 'FTI',
        name: 'Fakultas Teknologi Informasi',
        description:
            'Mengembangkan kompetensi informatika, sistem informasi, dan teknologi digital.',
    },
];

export default function FacultiesSection() {
    return (
        <section
            id="fakultas"
            className="landing-section relative overflow-hidden bg-surface-warm py-space-section-sm sm:py-space-section lg:py-space-section-lg"
        >
            {/* Soft Background Accent */}
            <div className="pointer-events-none absolute -top-32 -right-32 size-[420px] rounded-full bg-orange-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-32 size-[420px] rounded-full bg-white/80 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-space-2xl lg:px-10">
                {/* Section Heading */}
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-sm">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F97316] text-white">
                                <Icon name="building" size={14} />
                            </span>

                            <span className="text-micro font-semibold tracking-[0.16em] text-gray-600">
                                UNIVERSITAS SEBELAS APRIL
                            </span>
                        </div>

                        <h2 className="mt-6 text-display-sm leading-tight font-semibold tracking-tight text-[#171717] sm:text-display-md lg:text-display-lg">
                            Mengenal Fakultas
                            <br />
                            <span className="text-[#F97316]">
                                di lingkungan UNSAP.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-xl text-body leading-7 text-gray-600">
                            Enam fakultas dengan bidang keilmuan yang beragam
                            sebagai bagian dari lingkungan akademik Universitas
                            Sebelas April.
                        </p>
                    </div>

                    {/* Faculty Count */}
                    <div className="flex items-center gap-4 self-start rounded-2xl border border-orange-100 bg-white px-6 py-4 shadow-sm lg:self-auto">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0E3] text-[#EA580C]">
                            <Icon name="building" size={23} />
                        </div>

                        <div>
                            <p className="text-2xl font-bold tracking-tight text-[#171717]">
                                06
                            </p>
                            <p className="text-caption text-gray-500">
                                Fakultas
                            </p>
                        </div>
                    </div>
                </div>

                {/* Faculty Cards */}
                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
                    {faculties.map((faculty, index) => {
                        const isFTI = faculty.acronym === 'FTI';

                        return (
                            <article
                                key={faculty.acronym}
                                className={`group relative flex min-h-[310px] flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7 ${
                                    isFTI
                                        ? 'border-[#EA580C] bg-[#F97316] text-white shadow-[0_15px_35px_rgba(234,88,12,0.16)]'
                                        : 'border-orange-100 bg-white text-[#171717] shadow-[0_8px_25px_rgba(23,23,23,0.04)] hover:border-orange-300 hover:shadow-[0_16px_35px_rgba(249,115,22,0.10)]'
                                }`}
                            >
                                {/* Card Header */}
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`text-caption font-semibold tracking-widest ${
                                            isFTI
                                                ? 'text-white/70'
                                                : 'text-gray-400'
                                        }`}
                                    >
                                        {faculty.number}
                                    </span>

                                    <span
                                        className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                                            isFTI
                                                ? 'bg-white/15 text-white group-hover:bg-white group-hover:text-[#EA580C]'
                                                : 'bg-[#FFF3E8] text-[#EA580C] group-hover:bg-[#F97316] group-hover:text-white'
                                        }`}
                                    >
                                        <Icon name="arrow-up-right" size={17} />
                                    </span>
                                </div>

                                {/* Faculty Acronym */}
                                <div className="mt-8">
                                    <h3
                                        className={`text-display-md font-bold tracking-tight sm:text-display-lg ${
                                            isFTI
                                                ? 'text-white'
                                                : 'text-[#171717]'
                                        }`}
                                    >
                                        {faculty.acronym}
                                        <span
                                            className={
                                                isFTI
                                                    ? 'text-orange-200'
                                                    : 'text-[#F97316]'
                                            }
                                        >
                                            .
                                        </span>
                                    </h3>

                                    <div
                                        className={`mt-4 h-1 w-10 rounded-full transition-all duration-300 group-hover:w-16 ${
                                            isFTI ? 'bg-white' : 'bg-[#F97316]'
                                        }`}
                                    />
                                </div>

                                {/* Faculty Information */}
                                <div className="mt-5 flex-1">
                                    <p
                                        className={`text-body leading-6 font-semibold ${
                                            isFTI
                                                ? 'text-white'
                                                : 'text-gray-900'
                                        }`}
                                    >
                                        {faculty.name}
                                    </p>

                                    <p
                                        className={`mt-3 text-caption leading-6 ${
                                            isFTI
                                                ? 'text-white/80'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        {faculty.description}
                                    </p>
                                </div>

                                {/* Card Footer */}
                                <div
                                    className={`mt-7 flex items-center justify-between border-t pt-4 ${
                                        isFTI
                                            ? 'border-white/25 text-white/75'
                                            : 'border-gray-100 text-gray-400'
                                    }`}
                                >
                                    <span className="text-[10px] font-semibold tracking-[0.12em]">
                                        UNIVERSITAS SEBELAS APRIL
                                    </span>

                                    <Icon
                                        name="arrow-right"
                                        size={16}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Bottom Information */}
                <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl bg-charcoal-900 p-6 text-white sm:flex-row sm:items-center sm:p-8">
                    <div>
                        <p className="text-body font-semibold">
                            Satu universitas, beragam bidang keilmuan.
                        </p>

                        <p className="mt-2 max-w-xl text-caption leading-6 text-gray-400">
                            Mengenal lebih dekat lingkungan akademik Universitas
                            Sebelas April.
                        </p>
                    </div>

                    <a
                        href="https://unsap.ac.id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex h-11 shrink-0 items-center gap-3 rounded-xl bg-[#F97316] px-5 text-caption font-semibold text-white transition-all duration-300 hover:bg-[#EA580C]"
                    >
                        <span>Website UNSAP</span>

                        <Icon
                            name="arrow-up-right"
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </a>
                </div>
            </div>
        </section>
    );
}
