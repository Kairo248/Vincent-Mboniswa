'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2, Sparkles, X, ChevronDown, Usb, Clock, MessageCircle } from 'lucide-react';
import Section from '@/app/components/ui/Section';
import Heading from '@/app/components/ui/Heading';
import SlideUp from '@/app/components/animation/SlideUp';
import FadeIn from '@/app/components/animation/FadeIn';
import TrackList from '@/app/components/media/TrackList';
import { albums, musicTracks } from '@/app/lib/data';
import Image from 'next/image';

export default function MusicPage() {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const allTracks = musicTracks;

  // Get latest tracks (sorted by release date, newest first)
  const latestTracks = [...allTracks]
    .filter(track => track.releaseDate) // Only tracks with release dates
    .sort((a, b) => {
      const dateA = new Date(a.releaseDate || 0).getTime();
      const dateB = new Date(b.releaseDate || 0).getTime();
      return dateB - dateA; // Newest first
    })
    .slice(0, 3); // Show top 3 latest tracks

  // Get popular tracks (featured tracks, or fallback to latest if not enough)
  const popularTracks = allTracks
    .filter(track => track.featured)
    .concat(
      // If not enough featured tracks, add some from latest album
      allTracks
        .filter(track => !track.featured && track.album?.includes('Vol. 2'))
        .slice(0, 8 - allTracks.filter(t => t.featured).length)
    )
    .slice(0, 8); // Show top 8 popular tracks

  const handleAlbumClick = (albumId: string) => {
    const album = albums.find(a => a.id === albumId);
    // For coming soon albums, open WhatsApp to inquire about USB
    if (album?.comingSoon) {
      // Convert South African number (0734368007) to international format (2734368007)
      const phoneNumber = '2734368007'; // Remove leading 0 and add country code 27
      const message = encodeURIComponent(`Hello! I'm interested in purchasing Hymns & Melodies Volume 3 on USB (R300). Could you please provide more information?`);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
      return;
    }
    // Toggle: if same album is clicked, close it; otherwise open the clicked album
    setSelectedAlbum(selectedAlbum === albumId ? null : albumId);
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
  };

  const currentAlbum = selectedAlbum ? albums.find(album => album.id === selectedAlbum) : null;

  return (
    <main className="min-h-screen text-white relative pt-20">
      {/* Fixed Background Wallpaper */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/music-page-wp.jpg"
          alt="Music page background"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        {/* Blue spotlight overlay to match image colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-blue-400/10 to-black/60" />
        {/* Atmospheric haze overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        {/* Blue spotlight effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-300/15 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <Section fullHeight variant="gradient">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Icon with blue accent */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/30 via-blue-400/20 to-transparent border border-blue-400/40 backdrop-blur-xl mb-8 relative"
              >
                <Music2 className="text-blue-300 relative z-10" size={40} />
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="absolute top-0 right-0 text-blue-400/50" size={16} />
                  <Sparkles className="absolute bottom-0 left-0 text-blue-300/50" size={16} />
                </motion.div>
              </motion.div>

              <Heading 
                level={1} 
                size="2xl" 
                align="center" 
                className="mb-6 bg-gradient-to-r from-white via-blue-200 to-blue-100 bg-clip-text text-transparent"
              >
                Music
              </Heading>
              <p className="text-xl text-white/90 text-center max-w-3xl mx-auto leading-relaxed font-light">
                Experience the power of worship through anointed gospel music
              </p>
            </motion.div>
          </div>
        </Section>

        {/* Albums Section */}
        {albums.length > 0 && (
          <Section id="albums">
            <div className="max-w-7xl mx-auto">
              <SlideUp>
                <div className="text-center mb-12">
                  <Heading 
                    level={2} 
                    size="xl" 
                    align="center" 
                    className="mb-4 bg-gradient-to-r from-white via-blue-200 to-blue-100 bg-clip-text text-transparent"
                  >
                    Albums
                  </Heading>
                </div>
              </SlideUp>

              {/* USB Only Notification Banner */}
              {albums.some(album => album.usbOnly) && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 rounded-xl bg-gradient-to-r from-blue-500/20 via-blue-400/15 to-blue-500/20 border border-blue-400/30 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-center gap-3 text-blue-200">
                    <Usb size={20} className="text-blue-300" />
                    <p className="text-sm md:text-base font-medium">
                      <span className="text-blue-300 font-semibold">Hymns & Melodies Vol. 3</span> is currently available exclusively on USB for <span className="text-blue-300 font-bold">R300</span>. Online release coming soon!
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {albums.map((album, index) => {
                  const isSelected = selectedAlbum === album.id;
                  const isComingSoon = album.comingSoon;
                  const isUsbOnly = album.usbOnly;
                  return (
                    <FadeIn key={album.id} delay={index * 0.1}>
                      <motion.div
                        className={`group ${isComingSoon ? 'cursor-pointer' : 'cursor-pointer'}`}
                        onClick={() => handleAlbumClick(album.id)}
                        whileHover={isComingSoon ? { y: -3, scale: 1.02 } : { y: -5 }}
                        animate={isSelected ? { scale: 0.98 } : { scale: 1 }}
                      >
                        <div className={`relative aspect-square rounded-2xl overflow-hidden mb-4 bg-white/5 backdrop-blur-sm border transition-all shadow-lg ${
                          isSelected 
                            ? 'border-blue-400/60 bg-blue-500/20 shadow-blue-500/30' 
                            : isComingSoon
                            ? 'border-blue-300/30 bg-blue-500/10 shadow-blue-500/20 opacity-75'
                            : 'border-blue-400/20 group-hover:border-blue-300/40 group-hover:bg-white/10 shadow-blue-500/10'
                        }`}>
                          <Image
                            src={album.coverImage}
                            alt={album.title}
                            fill
                            className={`object-cover transition-transform duration-300 ${
                              isComingSoon ? '' : 'group-hover:scale-105'
                            }`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          {/* Blue glow on hover or when selected */}
                          <div className={`absolute inset-0 bg-blue-400/10 blur-xl transition-opacity ${
                            isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`} />
                          
                          {/* Coming Soon Badge */}
                          {isComingSoon && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/90 to-blue-400/90 backdrop-blur-md border border-blue-300/50 flex items-center gap-2 shadow-lg"
                            >
                              <Clock size={14} className="text-white" />
                              <span className="text-white text-xs font-semibold">Coming Soon</span>
                            </motion.div>
                          )}

                          {/* USB Only Badge */}
                          {isUsbOnly && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 }}
                              className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600/90 to-blue-500/90 backdrop-blur-md border border-blue-300/50 flex items-center gap-2 shadow-lg"
                            >
                              <Usb size={14} className="text-white" />
                              <span className="text-white text-xs font-semibold">USB Only</span>
                            </motion.div>
                          )}

                          {/* Selected indicator */}
                          {isSelected && !isComingSoon && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-blue-400/90 backdrop-blur-md flex items-center justify-center border border-blue-300/50"
                            >
                              <ChevronDown size={20} className="text-white" />
                            </motion.div>
                          )}

                          {/* Coming Soon Overlay */}
                          {isComingSoon && (
                            <motion.div 
                              className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center group-hover:bg-black/30 transition-colors"
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="text-center px-4">
                                <motion.div
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="mb-2 flex justify-center"
                                >
                                  <MessageCircle size={24} className="text-blue-300" />
                                </motion.div>
                                <p className="text-white font-semibold text-sm mb-1">Available on USB</p>
                                <p className="text-blue-300 text-xs font-medium mb-1">R300</p>
                                <p className="text-blue-300 text-xs font-medium">Click to order via WhatsApp</p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                        <div>
                          <h3 className={`font-medium text-lg mb-1 transition-colors ${
                            isSelected ? 'text-blue-300' : isComingSoon ? 'text-blue-200/80' : 'text-white group-hover:text-blue-300'
                          }`}>
                            {album.title}
                          </h3>
                          <p className="text-white/70 text-sm font-light mb-2">{album.artist}</p>
                          <p className="text-white/50 text-xs font-light">
                            {isComingSoon ? (
                              <span className="flex items-center gap-1">
                                <Clock size={12} />
                                Coming Soon
                              </span>
                            ) : (
                              `${album.tracks.length} tracks • ${new Date(album.releaseDate).getFullYear()}`
                            )}
                          </p>
                        </div>
                      </motion.div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>
          </Section>
        )}

        {/* Selected Album Tracks */}
        <AnimatePresence mode="wait">
          {currentAlbum && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Section id="album-tracks" variant="dark">
                <div className="max-w-5xl mx-auto">
                  <SlideUp>
                    <div className="relative flex items-center gap-6 mb-8 p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-blue-400/20">
                      {/* Close Button */}
                      <motion.button
                        onClick={closeAlbum}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-blue-400/30 flex items-center justify-center transition-all backdrop-blur-sm z-10"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Close album"
                      >
                        <X size={18} className="text-white" />
                      </motion.button>

                      <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-white/5 border border-blue-400/20">
                        <Image
                          src={currentAlbum.coverImage}
                          alt={currentAlbum.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 pr-12">
                        <Heading 
                          level={2} 
                          size="lg" 
                          className="mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                        >
                          {currentAlbum.title}
                        </Heading>
                        <p className="text-white/70 text-sm font-light mb-1">
                          {currentAlbum.artist}
                        </p>
                        <p className="text-white/50 text-xs font-light">
                          {currentAlbum.tracks.length} tracks • {new Date(currentAlbum.releaseDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                          })}
                        </p>
                      </div>
                    </div>
                  </SlideUp>

                  {/* Track List Header */}
                  <div className="border-b border-blue-400/20 pb-3 mb-2 px-4">
                    <div className="flex items-center gap-4 text-blue-200/60 text-xs font-medium uppercase tracking-wider">
                      <div className="w-10 text-center">#</div>
                      <div className="flex-1">Title</div>
                      <div className="w-16 text-right">Time</div>
                    </div>
                  </div>

                  {/* Track List */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-blue-400/10"
                  >
                    <TrackList tracks={currentAlbum.tracks} />
                  </motion.div>
                </div>
              </Section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Latest Tracks Section */}
        <Section id="latest-tracks">
          <div className="max-w-5xl mx-auto">
            <SlideUp>
              <div className="mb-12">
                <Heading 
                  level={2} 
                  size="lg" 
                  className="mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                >
                  Latest Tracks
                </Heading>
                <p className="text-white/70 text-sm font-light">
                  {latestTracks.length} newest releases
                </p>
              </div>
            </SlideUp>

            {/* Track List Header */}
            <div className="border-b border-blue-400/20 pb-3 mb-2 px-4">
              <div className="flex items-center gap-4 text-blue-200/60 text-xs font-medium uppercase tracking-wider">
                <div className="w-10 text-center">#</div>
                <div className="flex-1">Title</div>
                <div className="w-16 text-right">Time</div>
              </div>
            </div>

            {/* Track List */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-blue-400/10">
              <TrackList tracks={latestTracks} />
            </div>
          </div>
        </Section>

        {/* Popular Tracks Section */}
        <Section id="popular-tracks">
          <div className="max-w-5xl mx-auto">
            <SlideUp>
              <div className="mb-12">
                <Heading 
                  level={2} 
                  size="lg" 
                  className="mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                >
                  Popular Tracks
                </Heading>
                <p className="text-white/70 text-sm font-light">
                  {popularTracks.length} featured songs
                </p>
              </div>
            </SlideUp>

            {/* Track List Header */}
            <div className="border-b border-blue-400/20 pb-3 mb-2 px-4">
              <div className="flex items-center gap-4 text-blue-200/60 text-xs font-medium uppercase tracking-wider">
                <div className="w-10 text-center">#</div>
                <div className="flex-1">Title</div>
                <div className="w-16 text-right">Time</div>
              </div>
            </div>

            {/* Track List */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-blue-400/10">
              <TrackList tracks={popularTracks} />
            </div>
          </div>
        </Section>
      </div>
    </main>
  );
}

