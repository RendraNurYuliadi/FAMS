
import type { ReactNode } from 'react';

type AuthLayoutProps = {
    children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main className="flex min-h-screen items-center justify-center
                        bg-gray-50 px-6 py-10">
            <div className="w-full max-w-md rounded-2xl bg-white
                            p-8 shadow-sm ring-1 ring-gray-200">
                {children}
            </div>
        </main>
    );
}
