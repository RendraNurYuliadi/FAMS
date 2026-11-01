import { useEffect, useState } from 'react';
import Icon from './Icon';

const WHATSAPP_NUMBER = ''; // Isi dengan nomor resmi, format 62xxxxxxxxxx

export default function FloatingActions() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowTop(window.scrollY > 400);

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const whatsappUrl = WHATSAPP_NUMBER
        ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo, saya ingin bertanya mengenai FAMS.')}`
        : '#kontak';

    return (
        <>
            <a
                href={whatsappUrl}
                target={WHATSAPP_NUMBER ? '_blank' : undefined}
                rel={WHATSAPP_NUMBER ? 'noreferrer' : undefined}
                aria-label="Hubungi pengelola melalui WhatsApp"
                title={WHATSAPP_NUMBER ? 'Chat WhatsApp' : 'Atur nomor WhatsApp di FloatingActions.tsx'}
                className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-950 text-white shadow-xl transition hover:scale-105 hover:bg-neutral-700 sm:bottom-7 sm:right-7"
            >
                <Icon name="message" size={24} />
            </a>

            {showTop && (
                <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Kembali ke bagian Hero"
                    title="Kembali ke atas"
                    className="fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-950 shadow-lg transition hover:-translate-y-1 sm:bottom-7 sm:left-7"
                >
                    <Icon name="arrow-up" size={21} />
                </button>
            )}
        </>
    );
}