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
        primary: 'bg-primary-500 text-white hover:bg-primary-600',
        secondary:
            'border border-gray-300 bg-white text-text-primary hover:bg-gray-100',
        light: 'bg-white text-text-primary hover:bg-gray-200',
    };

    return (
        <a
            {...props}
            className={`inline-flex min-h-12 items-center justify-center gap-space-sm rounded-pill px-space-xl py-space-md text-body font-medium transition duration-200 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none ${styles[variant]} ${className}`}
        >
            {children}
        </a>
    );
}
