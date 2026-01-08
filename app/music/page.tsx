'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '@/app/components/ui/Section';
import Heading from '@/app/components/ui/Heading';
import SlideUp from '@/app/components/animation/SlideUp';
import FadeIn from '@/app/components/animation/FadeIn';
import TrackList from '@/app/components/media/TrackList';
import { albums, musicTracks } from '@/app/lib/data';
import Image from 'next/image';

export default function MusicPage() {
  const [selectedAlbum, setSelectedAlbum] = useState(albums[0] || null);
  const allTracks = musicTracks;

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <Section fullHeight variant="gradient">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <Heading level={1} size="2xl" variant="gold" align="center" className="mb-6">
              Music
            </Heading>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto leading-relaxed">
              Experience the power of worship through anointed gospel music
            </p>
          </SlideUp>
        </div>
      </Section>

      {/* Albums Section */}
      <Section id="albums">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <Heading level={2} size="xl" variant="gold" align="center" className="mb-12">
              Albums
            </Heading>
          </SlideUp>

          {albums.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album, index) => (
                <FadeIn key={album.id} delay={index * 0.1}>
                  <motion.div
                    className="group cursor-pointer"
                    onClick={() => setSelectedAlbum(album)}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-white/5 group-hover:bg-white/10 transition-all">
                      <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg mb-1 group-hover:text-gold transition-colors">
                        {album.title}
                      </h3>
                      <p className="text-white/50 text-sm font-light mb-2">{album.artist}</p>
                      <p className="text-white/40 text-xs font-light">
                        {album.tracks.length} tracks • {new Date(album.releaseDate).getFullYear()}
                      </p>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">No albums available at this time.</p>
            </div>
          )}
        </div>
      </Section>

      {/* Selected Album Tracks */}
      {selectedAlbum && (
        <Section id="album-tracks" variant="dark">
          <div className="max-w-5xl mx-auto">
            <SlideUp>
              <div className="flex items-center gap-6 mb-8">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-white/5">
                  <Image
                    src={selectedAlbum.coverImage}
                    alt={selectedAlbum.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <Heading level={2} size="lg" variant="gold" className="mb-2">
                    {selectedAlbum.title}
                  </Heading>
                  <p className="text-white/60 text-sm font-light mb-1">
                    {selectedAlbum.artist}
                  </p>
                  <p className="text-white/40 text-xs font-light">
                    {selectedAlbum.tracks.length} tracks • {new Date(selectedAlbum.releaseDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>
                </div>
              </div>
            </SlideUp>

            {/* Track List Header */}
            <div className="border-b border-white/10 pb-3 mb-2 px-4">
              <div className="flex items-center gap-4 text-white/40 text-xs font-medium uppercase tracking-wider">
                <div className="w-10 text-center">#</div>
                <div className="flex-1">Title</div>
                <div className="w-16 text-right">Time</div>
              </div>
            </div>

            {/* Track List */}
            <TrackList tracks={selectedAlbum.tracks} />
          </div>
        </Section>
      )}

      {/* All Tracks Section - Main Content */}
      <Section id="tracks">
        <div className="max-w-5xl mx-auto">
          <SlideUp>
            <div className="mb-12">
              <Heading level={2} size="lg" variant="gold" className="mb-4">
                All Tracks
              </Heading>
              <p className="text-white/50 text-sm font-light">
                {allTracks.length} songs
              </p>
            </div>
          </SlideUp>

          {/* Track List Header */}
          <div className="border-b border-white/10 pb-3 mb-2 px-4">
            <div className="flex items-center gap-4 text-white/40 text-xs font-medium uppercase tracking-wider">
              <div className="w-10 text-center">#</div>
              <div className="flex-1">Title</div>
              <div className="w-16 text-right">Time</div>
            </div>
          </div>

          {/* Track List */}
          <TrackList tracks={allTracks} />
        </div>
      </Section>
    </main>
  );
}

