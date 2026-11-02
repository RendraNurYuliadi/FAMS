
import type { SVGProps, ReactNode } from 'react';

export type IconName =
    | 'arrow-up'
    | 'arrow-right'
    | 'arrow-left'
    | 'arrow-down'
    | 'arrow-up-right'
    | 'rotate-ccw'
    | 'trending-up'
    | 'menu'
    | 'close'
    | 'search'
    | 'filter'
    | 'box'
    | 'package'
    | 'building'
    | 'building-2'
    | 'calendar'
    | 'bell'
    | 'check'
    | 'check-circle'
    | 'clock'
    | 'map-pin'
    | 'mail'
    | 'phone'
    | 'message'
    | 'shield'
    | 'tag'
    | 'wrench'
    | 'chart'
    | 'users'
    | 'file'
    | 'chevron-left'
    | 'chevron-right'
    | 'external'
    | 'plus'
    | 'minus'
    | 'quote'
    | 'rfid'
    | 'instagram'
    | 'send'
    | 'book'
    | 'help-circle'
    | 'workflow'
    | 'activity'
    | 'settings'
    | 'info'
    | 'eye'
    | 'eye-off'
    | 'clipboard-list'
    | 'file-check'
    | 'upload'
    | 'upload-cloud'
    | 'user-round'
    | 'inbox'
    | 'save'
    | 'alert-circle'
    | 'x-circle'
    | 'check-check'
    | 'pencil'
    | 'trash-2'
    | 'image'
    | 'image-plus'
    | 'layers'
    | 'map'
    | 'x';

const paths: Record<IconName, ReactNode> = {
    'arrow-up': <path d="m5 12 7-7 7 7M12 5v14" />,
    'arrow-right': <path d="M5 12h14m-7-7 7 7-7 7" />,
    'arrow-left': <path d="M19 12H5m7 7-7-7 7-7" />,
    'arrow-down': <path d="M12 5v14m7-7-7 7-7-7" />,
    'arrow-up-right': <path d="M7 17 17 7M7 7h10v10" />,
    'rotate-ccw': (
        <>
            <path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" />
            <path d="M3 3v5h5" />
            <path d="M12 7v5l3 2" />
        </>
    ),
    'trending-up': (
        <>
            <path d="m22 7-8.5 8.5-5-5L2 17" />
            <path d="M16 7h6v6" />
        </>
    ),
    'image-plus': (
    <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
        <path d="M19 8v6" />
        <path d="M16 11h6" />
    </>
    ),
    'map': (
    <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
        <path d="M9 3v15M15 6v15" />
    </>
    ),
    'layers': (
        <>
            <path d="m12 2 9 5-9 5-9-5 9-5Z" />
            <path d="m3 12 9 5 9-5" />
            <path d="m3 17 9 5 9-5" />
        </>
    ),
    image: (
        <>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
        </>
    ),
    menu: (
        <>
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
        </>
    ),

    'clipboard-list': (
        <>
            <rect x="5" y="4" width="14" height="18" rx="2" />
            <path d="M9 4.5V3h6v1.5M9 10h6M9 14h6M9 18h3" />
        </>
    ),

    'file-check': (
        <>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <path d="M14 2v6h6m-12 5 2 2 4-4" />
        </>
    ),

    upload: (
        <>
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <path d="m17 8-5-5-5 5m5-5v12" />
        </>
    ),

    'upload-cloud': (
        <>
            <path d="M20 16.2A4.5 4.5 0 0 0 18 7.5h-1.3A7 7 0 1 0 4 14.3" />
            <path d="M12 12v9m-4-5 4-4 4 4" />
        </>
    ),

    'user-round': (
        <>
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 0 0-16 0" />
        </>
    ),

    inbox: (
        <>
            <path d="M4 4h16l2 11v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4L4 4Z" />
            <path d="M2 15h6l2 3h4l2-3h6" />
        </>
    ),

    save: (
        <>
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
            <path d="M17 21v-8H7v8M7 3v5h8" />
        </>
    ),

    'alert-circle': (
        <>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" />
        </>
    ),

    'x-circle': (
        <>
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6m0-6 6 6" />
        </>
    ),

    'check-check': (
        <>
            <path d="m18 6-7 7-3-3" />
            <path d="m22 11-7.5 7.5L12 16" />
            <path d="M2 12.5 5.5 16 12 9.5" />
        </>
    ),

    pencil: (
        <>
            <path d="m16 4 4 4M4 20l4-.8L19 8a2.8 2.8 0 0 0-4-4L4 15l-.8 4Z" />
        </>
    ),

    'trash-2': (
        <>
            <path d="M3 6h18m-2 0-.9 14H5.9L5 6m4 0V4h6v2m-5 4v6m4-6v6" />
        </>
    ),

    x: <path d="m18 6-12 12M6 6l12 12" />,

    'eye': (
        <>
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
        </>
    ),

    'eye-off': (
        <>
            <path d="m3 3 18 18" />
            <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
            <path d="M9.9 5.2A11 11 0 0 1 12 5c6.4 0 10 7 10 7a14 14 0 0 1-3 3.8" />
            <path d="M6.6 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7a10 10 0 0 0 4-.8" />
        </>
    ),

        activity: (
        <>
            <path d="M3 12h4l3-8 4 16 3-8h4" />
        </>
    ),

        settings: (
            <>
                <path d="m12 2.5 2 1.5 2.4-.2 1.1 2.2 2.2 1.1-.2 2.4 1.5 2-1.5 2 .2 2.4-2.2 1.1-1.1 2.2-2.4-.2-2 1.5-2-1.5-2.4.2-1.1-2.2-2.2-1.1.2-2.4-1.5-2 1.5-2-.2-2.4L8 5.9l1.1-2.2 2.4.2 2-1.4Z" />
                <circle cx="12" cy="12" r="3" />
            </>
        ),

        info: (
            <>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4m0-4h.01" />
            </>
        ),

    close: <path d="m18 6-12 12M6 6l12 12" />,

    search: (
        <>
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
        </>
    ),

    filter: <path d="M4 7h16M7 12h10m-7 5h4" />,

    box: (
        <>
            <path d="m12 3 9 5-9 5-9-5 9-5Z" />
            <path d="M3 8v9l9 5 9-5V8M12 13v9" />
        </>
    ),

    package: (
        <>
            <path d="m12 3 9 5-9 5-9-5 9-5Z" />
            <path d="M3 8v9l9 5 9-5V8" />
            <path d="M12 13v9M7.5 5.5l9 5" />
        </>
    ),

    building: (
        <>
            <rect x="4" y="3" width="16" height="18" rx="1" />
            <path d="M9 7h2m2 0h2M9 11h2m2 0h2M9 15h2m2 0h2M10 21v-3h4v3" />
        </>
    ),

    'building-2': (
        <>
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2m12-10h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
            <path d="M10 6h4m-4 4h4m-4 4h4m-4 4h4" />
        </>
    ),

    calendar: (
        <>
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 10h18" />
        </>
    ),

    bell: (
        <>
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
        </>
    ),

    check: <path d="m5 12 4 4L19 6" />,

    'check-circle': (
        <>
            <circle cx="12" cy="12" r="10" />
            <path d="m8 12 2.5 2.5L16 9" />
        </>
    ),

    clock: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </>
    ),

    'map-pin': (
        <>
            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
        </>
    ),

    mail: (
        <>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
        </>
    ),

    phone: (
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 2.8a2 2 0 0 1-.6 1.9L7.1 10a16 16 0 0 0 6 6l1.6-1.9a2 2 0 0 1 1.9-.6l2.8.5a2 2 0 0 1 1.6 1.9Z" />
    ),

    message: (
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
    ),

    shield: (
        <>
            <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
            <path d="m9 12 2 2 4-4" />
        </>
    ),

    tag: (
        <>
            <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-8.2-8.2A2 2 0 0 1 1.8 11V4a2 2 0 0 1 2-2h7a2 2 0 0 1 1.4.6l8.4 8a2 2 0 0 1 0 2.8Z" />
            <circle cx="7" cy="7" r="1" />
        </>
    ),

    wrench: (
        <path d="M14.7 6.3a5 5 0 0 0-6.4 6.4L2 19l3 3 6.3-6.3a5 5 0 0 0 6.4-6.4L14 13l-3-3 3.7-3.7Z" />
    ),

    chart: <path d="M3 3v18h18M18 17V9m-5 8V5m-5 12v-4" />,

    users: (
        <>
            <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="10" cy="7" r="4" />
            <path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
        </>
    ),

    file: (
        <>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
            <path d="M14 2v6h6M8 13h8m-8 4h8" />
        </>
    ),

    'chevron-left': <path d="m15 18-6-6 6-6" />,
    'chevron-right': <path d="m9 18 6-6-6-6" />,

    external: (
        <>
            <path d="M15 3h6v6m-11 5L21 3" />
            <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" />
        </>
    ),

    plus: <path d="M12 5v14m-7-7h14" />,
    minus: <path d="M5 12h14" />,

    quote: (
        <path d="M3 21c3 0 6-3 6-7V5H2v7h4c0 2-1 4-3 5v4Zm12 0c3 0 6-3 6-7V5h-7v7h4c0 2-1 4-3 5v4Z" />
    ),

    rfid: (
        <>
            <path d="M5 8a10 10 0 0 0 0 8m4-12a15 15 0 0 0 0 16m6-16a15 15 0 0 1 0 16m4-12a10 10 0 0 1 0 8" />
            <circle cx="12" cy="12" r="1" />
        </>
    ),

    instagram: (
        <>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <path d="M17.5 6.5h.01" />
        </>
    ),

    send: (
        <>
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
        </>
    ),

    book: (
        <>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
        </>
    ),

    'help-circle': (
        <>
            <circle cx="12" cy="12" r="10" />
            <path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.9.8-1.7 1.2-1.7 2.7" />
            <path d="M12 17h.01" />
        </>
    ),

    workflow: (
        <>
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <path d="M10 6.5h4M17.5 10v4M6.5 10v7.5h7.5" />
        </>
    ),
};

type IconProps = SVGProps<SVGSVGElement> & {
    name: IconName;
    size?: number;
};

export default function Icon({
    name,
    size = 20,
    className = '',
    ...props
}: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={className}
            {...props}
        >
            {paths[name]}
        </svg>
    );
}
