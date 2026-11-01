import { Head } from '@inertiajs/react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

type PlaceholderProps = {
    title: string;
};

export default function Placeholder({ title }: PlaceholderProps) {
    return (
        <DashboardLayout>
            <Head title={`${title} | FAMS`} />

            <section className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Dashboard FAMS
                </p>
                <h1 className="mt-2 text-2xl font-semibold text-neutral-950">
                    {title}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
                    Halaman ini sudah terhubung, tetapi kontennya belum dibuat.
                </p>
            </section>
        </DashboardLayout>
    );
}
