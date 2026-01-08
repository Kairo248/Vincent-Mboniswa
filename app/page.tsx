'use client';

import HeroSection from '@/app/components/sections/HeroSection';
import IntroSection from '@/app/components/sections/IntroSection';
import FeaturedMusicSection from '@/app/components/sections/FeaturedMusicSection';
import UpcomingEventsSection from '@/app/components/sections/UpcomingEventsSection';

export default function Home() {
  return (
    <main className="min-h-screen text-white relative z-10">
      {/* Hero Section */}
      <HeroSection />

      {/* Intro Section */}
      <IntroSection />

      {/* Featured Music Section */}
      <FeaturedMusicSection />

      {/* Upcoming Events Section */}
      <UpcomingEventsSection />
    </main>
  );
}
