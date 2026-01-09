'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/app/components/sections/HeroSection';

// Dynamically import below-the-fold sections for code splitting and lazy loading
const IntroSection = dynamic(() => import('@/app/components/sections/IntroSection'), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: true,
});

const FeaturedMusicSection = dynamic(() => import('@/app/components/sections/FeaturedMusicSection'), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: true,
});

const UpcomingEventsSection = dynamic(() => import('@/app/components/sections/UpcomingEventsSection'), {
  loading: () => <div className="min-h-[400px]" />,
  ssr: true,
});

export default function Home() {
  return (
    <main className="min-h-screen text-white relative z-10">
      {/* Hero Section - Load immediately */}
      <HeroSection />

      {/* Below-the-fold sections - Loaded dynamically */}
      <IntroSection />

      <FeaturedMusicSection />

      <UpcomingEventsSection />
    </main>
  );
}
