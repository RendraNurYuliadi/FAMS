
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

const facultyTones = [
    {
        card: 'from-white via-neutral-50 to-neutral-200',
        foreground: 'text-neutral-950',
        number: 'text-neutral-500',
        arrow: 'border-neutral-300 text-neutral-500 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white',
        acronym: 'text-neutral-950',
        divider: 'bg-neutral-300',
        name: 'text-neutral-900',
        description: 'text-neutral-600',
        footer: 'border-neutral-300 text-neutral-500',
        footerArrow: 'text-neutral-500 group-hover:text-neutral-950',
    },
    {
        card: 'from-neutral-100 via-neutral-200 to-neutral-400',
        foreground: 'text-neutral-950',
        number: 'text-neutral-600',
        arrow: 'border-neutral-400 text-neutral-700 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white',
        acronym: 'text-neutral-900',
        divider: 'bg-neutral-400',
        name: 'text-neutral-900',
        description: 'text-neutral-700',
        footer: 'border-neutral-400 text-neutral-600',
        footerArrow: 'text-neutral-600 group-hover:text-neutral-950',
    },
    {
        card: 'from-neutral-950 via-neutral-800 to-neutral-600',
        foreground: 'text-white',
        number: 'text-white/60',
        arrow: 'border-white/25 text-white/70 group-hover:border-white group-hover:bg-white group-hover:text-neutral-950',
        acronym: 'text-white',
        divider: 'bg-white/25',
        name: 'text-white',
        description: 'text-white/70',
        footer: 'border-white/20 text-white/60',
        footerArrow: 'text-white/60 group-hover:text-white',
    },
    {
        card: 'from-neutral-200 via-neutral-100 to-white',
        foreground: 'text-neutral-950',
        number: 'text-neutral-500',
        arrow: 'border-neutral-300 text-neutral-500 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white',
        acronym: 'text-neutral-950',
        divider: 'bg-neutral-300',
        name: 'text-neutral-900',
        description: 'text-neutral-600',
        footer: 'border-neutral-300 text-neutral-500',
        footerArrow: 'text-neutral-500 group-hover:text-neutral-950',
    },
    {
        card: 'from-neutral-800 via-neutral-700 to-neutral-500',
        foreground: 'text-white',
        number: 'text-white/60',
        arrow: 'border-white/25 text-white/70 group-hover:border-white group-hover:bg-white group-hover:text-neutral-950',
        acronym: 'text-white',
        divider: 'bg-white/25',
        name: 'text-white',
        description: 'text-white/70',
        footer: 'border-white/20 text-white/60',
        footerArrow: 'text-white/60 group-hover:text-white',
    },
    {
        card: 'from-neutral-50 via-neutral-100 to-neutral-300',
        foreground: 'text-neutral-950',
        number: 'text-neutral-500',
        arrow: 'border-neutral-300 text-neutral-500 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white',
        acronym: 'text-neutral-950',
        divider: 'bg-neutral-300',
        name: 'text-neutral-900',
        description: 'text-neutral-600',
        footer: 'border-neutral-300 text-neutral-500',
        footerArrow: 'text-neutral-500 group-hover:text-neutral-950',
    },
];

export default function FacultiesSection() {
    return (
        <section
            id="fakultas"
            className="relative isolate overflow-hidden bg-neutral-100 py-20 sm:py-24 lg:py-28"
        >
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(23,23,23,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.045) 1px, transparent 1px)',
                        backgroundSize: '36px 36px',
                        maskImage:
                            'radial-gradient(ellipse at center, black 10%, transparent 75%)',
                    }}
                />
                <div className="absolute -left-40 top-20 size-96 rounded-full bg-white/80 blur-3xl" />
                <div className="absolute -right-36 bottom-0 size-96 rounded-full bg-neutral-300/70 blur-3xl" />
            </div>
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
                    {faculties.map((faculty, index) => {
                        const tone = facultyTones[index];

                        return (
                        <article
                            key={faculty.acronym}
                            className={`group relative isolate overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br ${tone.card} ${tone.foreground} p-6 shadow-[0_12px_35px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-neutral-400 hover:shadow-[0_22px_55px_rgba(0,0,0,0.14)] sm:p-7`}
                        >
                            <div
                                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] transition-opacity duration-300 group-hover:opacity-25"
                                style={{
                                    backgroundImage:
                                        'repeating-linear-gradient(135deg, currentColor 0, currentColor 1px, transparent 1px, transparent 12px)',
                                    maskImage:
                                        'linear-gradient(135deg, black, transparent 55%)',
                                }}
                            />
                            <div className="pointer-events-none absolute -right-12 -top-14 -z-10 size-44 rounded-full border border-current opacity-10 transition-transform duration-500 group-hover:scale-125" />
                            <div className="pointer-events-none absolute -right-5 -top-7 -z-10 size-28 rounded-full border border-current opacity-10" />
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-neutral-950/10 via-neutral-950/50 to-white/70" />

                            {/* Card Header */}
                            <div className="flex items-start justify-between">
                                <span className={`text-xs font-medium tracking-widest ${tone.number}`}>
                                    {faculty.number}
                                </span>

                                <span className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300 ${tone.arrow}`}>
                                    <Icon name="arrow-up-right" size={16} />
                                </span>
                            </div>

                            {/* Faculty Acronym */}
                            <div className="mt-9">
                                <p className={`text-4xl font-bold tracking-tight ${tone.acronym} transition-colors duration-300 sm:text-5xl`}>
                                    {faculty.acronym}
                                    <span className={tone.number}>.</span>
                                </p>

                                <div className={`mt-5 h-px w-full ${tone.divider}`} />
                            </div>

                            {/* Faculty Information */}
                            <div className="mt-5">
                                <h3 className={`min-h-[52px] text-base font-semibold leading-6 ${tone.name}`}>
                                    {faculty.name}
                                </h3>

                                <p className={`mt-3 min-h-[72px] text-[13px] leading-6 ${tone.description}`}>
                                    {faculty.description}
                                </p>
                            </div>

                            {/* Card Footer */}
                            <div className={`mt-7 flex items-center justify-between border-t pt-5 ${tone.footer}`}>
                                <span className="text-[10px] font-semibold tracking-[0.14em]">
                                    UNIVERSITAS SEBELAS APRIL
                                </span>

                                <span className={`transition-all duration-300 group-hover:translate-x-1 ${tone.footerArrow}`}>
                                    <Icon name="arrow-right" size={17} />
                                </span>
                            </div>
                        </article>
                        );
                    })}
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
