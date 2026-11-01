
import Icon from './Icon';

type Props = {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Navigasi halaman katalog" className="mt-10 flex items-center justify-center gap-2">
            <button
                type="button"
                disabled={page === 1}
                onClick={() => onChange(page - 1)}
                aria-label="Halaman sebelumnya"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 disabled:cursor-not-allowed disabled:opacity-30"
            >
                <Icon name="chevron-left" size={17} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                <button
                    key={number}
                    type="button"
                    aria-current={page === number ? 'page' : undefined}
                    onClick={() => onChange(number)}
                    className={`h-10 min-w-10 rounded-full px-3 text-sm transition ${
                        page === number
                            ? 'bg-black text-white'
                            : 'border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                    }`}
                >
                    {number}
                </button>
            ))}

            <button
                type="button"
                disabled={page === totalPages}
                onClick={() => onChange(page + 1)}
                aria-label="Halaman berikutnya"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 disabled:cursor-not-allowed disabled:opacity-30"
            >
                <Icon name="chevron-right" size={17} />
            </button>
        </nav>
    );
}
