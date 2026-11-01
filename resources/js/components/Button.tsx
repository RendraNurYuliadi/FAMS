import type { AnchorHTMLAttributes, ReactNode } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'light';
};

export default function Button({
    children,
    variant = 'primary',
    className = '',
    ...props
}: Props) {
    const styles = {
        primary: 'bg-neutral-950 text-white hover:bg-neutral-700',
        secondary: 'border border-neutral-300 bg-white text-neutral-950 hover:bg-neutral-100',
        light: 'bg-white text-neutral-950 hover:bg-neutral-200',
    };

    return (
        <a
            {...props}
            className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 ${styles[variant]} ${className}`}
        >
            {children}
        </a>
    );
}