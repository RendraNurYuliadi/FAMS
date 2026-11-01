
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
            className="relative overflow-hidden bg-[#fafafa] py-20 sm:py-24 lg:py-28"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                {/* Section Heading */}
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-neutral-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
                            UNIVERSITAS SEBELAS APRIL
                        </span>

                        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
                            Mengenal Fakultas
                            <br />
                            <span className="text-neutral-400">
                                di lingkungan UNSAP.
                            </span>
                        </h2>

                        <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500 sm:text-[15px]">
                            Enam fakultas dengan bidang keilmuan yang beragam
                            sebagai bagian dari lingkungan akademik
                            Universitas Sebelas April.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-neutral-500">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-950">
                            <Icon name="building" size={19} />
                        </span>
                        <div>
                            <p className="text-lg font-semibold text-neutral-950">
                                06
                            </p>
                            <p className="text-xs">Fakultas</p>
                        </div>
                    </div>
                </div>

                {/* Faculty Cards */}
                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
                    {faculties.map((faculty) => (
                        <article
                            key={faculty.acronym}
                            className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)] sm:p-7"
                        >
                            {/* Card Header */}
                            <div className="flex items-start justify-between">
                                <span className="text-xs font-medium tracking-widest text-neutral-400">
                                    {faculty.number}
                                </span>

                                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-400 transition-all duration-300 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white">
                                    <Icon name="arrow-up-right" size={16} />
                                </span>
                            </div>

                            {/* Faculty Acronym */}
                            <div className="mt-9">
                                <p className="text-4xl font-bold tracking-tight text-neutral-950 transition-colors duration-300 group-hover:text-neutral-600 sm:text-5xl">
                                    {faculty.acronym}
                                    <span className="text-neutral-300">.</span>
                                </p>

                                <div className="mt-5 h-px w-full bg-neutral-100" />
                            </div>

                            {/* Faculty Information */}
                            <div className="mt-5">
                                <h3 className="min-h-[52px] text-base font-semibold leading-6 text-neutral-900">
                                    {faculty.name}
                                </h3>

                                <p className="mt-3 min-h-[72px] text-[13px] leading-6 text-neutral-500">
                                    {faculty.description}
                                </p>
                            </div>

                            {/* Card Footer */}
                            <div className="mt-7 flex items-center justify-between border-t border-neutral-100 pt-5">
                                <span className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400">
                                    UNIVERSITAS SEBELAS APRIL
                                </span>

                                <span className="text-neutral-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-neutral-950">
                                    <Icon name="arrow-right" size={17} />
                                </span>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bottom Information */}
                <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-6 sm:flex-row sm:items-center sm:p-8">
                    <div>
                        <p className="text-sm font-semibold text-neutral-950">
                            Satu universitas, beragam bidang keilmuan.
                        </p>
                        <p className="mt-1 text-xs leading-5 text-neutral-500">
                            Mengenal lebih dekat lingkungan akademik
                            Universitas Sebelas April.
                        </p>
                    </div>

                    <a
                        href="https://unsap.ac.id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex h-11 shrink-0 items-center gap-3 rounded-xl bg-neutral-950 px-5 text-xs font-semibold text-white transition-all duration-300 hover:bg-neutral-800"
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
