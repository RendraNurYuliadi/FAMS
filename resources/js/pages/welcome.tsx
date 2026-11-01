
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import SplashScreen from '../components/SplashScreen';

import HeroSection from '../sections/HeroSection';
import OverviewSection from '../sections/OverviewSection';
import AboutSection from '../sections/AboutSection';
import FeaturesSection from '../sections/FeaturesSection';
import HowItWorksSection from '../sections/HowItWorksSection';
import BookingCalendarSection from '../sections/BookingCalendarSection';
import AssetCatalogSection from '../sections/AssetCatalogSection';
import ArticlesSection from '../sections/ArticlesSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import FAQSection from '../sections/FAQSection';
import SubscriptionSection from '../sections/SubscriptionSection';
import ContactSection from '../sections/ContactSection';
import AssetFlowSection from '../sections/AssetFlowSection';
import FacultiesSection from '../sections/FacultiesSection';

export default function Welcome() {
    useEffect(() => {
        const revealTargets = document.querySelectorAll<HTMLElement>(
            'main > section > div:not([class*="pointer-events-none"]), main > section article, main > section form, main > section [class*="grid"] > button, main > footer > div',
        );

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        if (!('IntersectionObserver' in window)) {
            revealTargets.forEach((element) => {
                element.classList.add('scroll-reveal-visible');
            });
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle(
                        'scroll-reveal-visible',
                        entry.isIntersecting,
                    );
                });
            },
            {
                rootMargin: '0px 0px -10% 0px',
                threshold: 0.08,
            },
        );

        revealTargets.forEach((element, index) => {
            element.classList.add('scroll-reveal');
            element.style.setProperty(
                '--scroll-reveal-delay',
                `${(index % 6) * 65}ms`,
            );
            observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <main className="min-h-screen overflow-x-clip bg-white text-neutral-950">
            <Navbar />

            <HeroSection />
            <OverviewSection />
            <AssetFlowSection />
            <AboutSection />
            <FacultiesSection />
            <FeaturesSection />
            <HowItWorksSection />
            <BookingCalendarSection />
            <AssetCatalogSection />
            <ArticlesSection />
            <TestimonialsSection />
            <FAQSection />
            <SubscriptionSection />
            <ContactSection />
            <Footer />
            <FloatingActions />

            {/* Splash Screen */}
            <SplashScreen />
        </main>
    );
}
