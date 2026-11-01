import type { ReactNode } from 'react';
import AuthLogo from './AuthLogo';

type AuthLayoutProps = {
    children: ReactNode;
    title: string;
    description: string;
    footer?: ReactNode;
};

export default function AuthLayout({
    children,
    title,
    description,
    footer,
}: AuthLayoutProps) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-10">
            <div className="w-full max-w-[440px]">
                <div className="mb-8">
                    <AuthLogo />
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-9">
                    <div className="mb-7">
                        <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
                            {title}
                        </h1>
                        <p className="mt-2 text-sm leading-6 text-neutral-500">
                            {description}
                        </p>
                    </div>

                    {children}

                    {footer && (
                        <div className="mt-7 border-t border-neutral-100 pt-6 text-center text-sm text-neutral-500">
                            {footer}
                        </div>
                    )}
                </div>

                <p className="mt-7 text-center text-xs text-neutral-400">
                    © {new Date().getFullYear()} FAMS. All rights reserved.
                </p>
            </div>
        </main>
    );
}