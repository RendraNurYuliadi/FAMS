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
        <main className="flex min-h-screen items-center justify-center bg-surface-warm px-4 py-10 text-text-primary">
            <div className="w-full max-w-[440px]">
                <div className="mb-8">
                    <AuthLogo />
                </div>

                <div className="rounded-card border border-primary-200/80 bg-white p-6 shadow-sm sm:p-9">
                    <div className="mb-7">
                        <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
                            {title}
                        </h1>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            {description}
                        </p>
                    </div>

                    {children}

                    {footer && (
                        <div className="mt-7 border-t border-primary-100 pt-6 text-center text-sm text-gray-500">
                            {footer}
                        </div>
                    )}
                </div>

                <p className="mt-7 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} FAMS. All rights reserved.
                </p>
            </div>
        </main>
    );
}
