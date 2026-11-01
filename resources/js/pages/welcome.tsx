
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
