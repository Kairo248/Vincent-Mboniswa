'use client';

import Section from '@/app/components/ui/Section';
import Heading from '@/app/components/ui/Heading';
import SlideUp from '@/app/components/animation/SlideUp';
import GalleryGrid from '@/app/components/media/GalleryGrid';
import { galleryItems } from '@/app/lib/data';

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <Section fullHeight variant="gradient">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <Heading level={1} size="2xl" variant="gold" align="center" className="mb-6">
              Gallery
            </Heading>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto leading-relaxed">
              Moments of worship, ministry, and fellowship captured in time
            </p>
          </SlideUp>
        </div>
      </Section>

      {/* Gallery Grid */}
      <Section id="gallery">
        <div className="max-w-7xl mx-auto">
          {galleryItems.length > 0 ? (
            <GalleryGrid items={galleryItems} />
          ) : (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">No gallery items available at this time. Check back soon!</p>
            </div>
          )}
        </div>
      </Section>
    </main>
  );
}

