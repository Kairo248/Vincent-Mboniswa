'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music2, ExternalLink, X, Music } from 'lucide-react';
import { MusicTrack } from '@/app/types';
import Image from 'next/image';
import Heading from '@/app/components/ui/Heading';

interface FeaturedMusicCardProps {
  track: MusicTrack;
}

export default function FeaturedMusicCard({ track }: FeaturedMusicCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [showPlatforms, setShowPlatforms] = useState(false);
  const MAX_PLAYBACK_TIME = 60; // 60 seconds limit

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    console.log('Audio URL:', track.audioUrl);

    const updateTime = () => {
      const current = audio.currentTime;
      setCurrentTime(current);
      
      // Stop playback at 60 seconds
      if (current >= MAX_PLAYBACK_TIME) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
      }
    };
    const updateDuration = () => {
      // Limit displayed duration to 60 seconds
      const actualDuration = audio.duration;
      setDuration(Math.min(actualDuration, MAX_PLAYBACK_TIME));
    };
    const handleError = () => {
      const errorMsg = audio.error 
        ? `Error ${audio.error.code}: ${audio.error.message}` 
        : 'Failed to load audio file';
      setAudioError(errorMsg);
      console.error('Audio error:', {
        code: audio.error?.code,
        message: audio.error?.message,
        networkState: audio.networkState,
        readyState: audio.readyState,
        src: track.audioUrl
      });
    };
    const handleCanPlay = () => {
      setAudioError(null);
      console.log('Audio can play');
    };
    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);

    // Update source if it changed
    const sources = audio.querySelectorAll('source');
    const currentSrc = sources[0]?.getAttribute('src');
    if (currentSrc !== track.audioUrl) {
      // Update source without removing the element
      sources.forEach((source, index) => {
        if (index === 0) {
          source.setAttribute('src', track.audioUrl);
        } else {
          source.setAttribute('src', track.audioUrl);
        }
      });
      // Reset playback state when source changes
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      // Load the new source
      audio.load();
    } else if (audio.readyState === 0) {
      // Only load if not already loaded
      audio.load();
    }

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [track.audioUrl]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) {
      console.error('Audio element not found');
      return;
    }

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        // Check if audio is ready
        if (audio.readyState < 2) {
          // Audio not loaded yet, wait for it
          audio.load();
          await new Promise((resolve) => {
            const handleCanPlay = () => {
              audio.removeEventListener('canplay', handleCanPlay);
              resolve(true);
            };
            audio.addEventListener('canplay', handleCanPlay);
            // Timeout after 5 seconds
            setTimeout(() => {
              audio.removeEventListener('canplay', handleCanPlay);
              resolve(false);
            }, 5000);
          });
        }
        
        // Check if audio element is still in the DOM
        if (!audio.parentNode) {
          console.warn('Audio element was removed from DOM');
          return;
        }
        
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Only update state if audio element still exists
              if (audioRef.current && audioRef.current === audio) {
                setIsPlaying(true);
              }
            })
            .catch((error) => {
              // Ignore AbortError - it's expected if element was removed
              if (error.name !== 'AbortError') {
                console.error('Error playing audio:', error);
                setAudioError(`Playback error: ${error instanceof Error ? error.message : 'Unknown error'}`);
              }
              if (audioRef.current && audioRef.current === audio) {
                setIsPlaying(false);
              }
            });
        }
      }
    } catch (error) {
      // Ignore AbortError
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Error playing audio:', error);
        setAudioError(`Playback error: ${error.message}`);
      }
      if (audioRef.current) {
        setIsPlaying(false);
      }
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = MAX_PLAYBACK_TIME ? (currentTime / MAX_PLAYBACK_TIME) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-purple-900/20 backdrop-blur-xl hover:border-blue-500/30 transition-all duration-300 shadow-2xl"
    >
      {/* Ambient light effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent pointer-events-none" />
      
      {/* NEW RELEASE Badge - Top Corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="absolute top-4 right-4 z-20 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white text-xs font-medium rounded-full border border-blue-400/30 backdrop-blur-md shadow-lg"
      >
        NEW RELEASE
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Track Info Side */}
        <div className="p-8 md:p-12 flex flex-col justify-center order-1 bg-gradient-to-br from-slate-900/40 to-slate-800/20">
          <div className="mb-8">
            <Heading level={3} size="xl" className="mb-3 text-white">
              {track.title}
            </Heading>
            {track.album && (
              <p className="text-white/70 text-lg font-light mb-2">
                {track.album}
              </p>
            )}
            {track.releaseDate && (
              <p className="text-white/50 text-sm font-light">
                Released {new Date(track.releaseDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </div>

          {/* Audio Player Controls */}
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Play/Pause Control */}
            <div className="flex items-center gap-4">
              {/* Glassmorphic Play/Pause Button */}
              <motion.button
                onClick={togglePlay}
                className="relative shrink-0 w-14 h-14 rounded-full backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 border border-white/20 flex items-center justify-center hover:from-white/20 hover:to-white/10 hover:border-white/30 transition-all shadow-lg shadow-black/20 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
                {isPlaying ? (
                  <Pause size={20} className="text-white ml-0.5 relative z-10" fill="currentColor" />
                ) : (
                  <Play size={20} className="text-white ml-1 relative z-10" fill="currentColor" />
                )}
              </motion.button>

              {/* Current Time Display */}
              <div className="text-white/60 text-sm font-light">
                <span>{formatTime(currentTime)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Album Cover Side */}
        <motion.div 
          className="relative aspect-square md:aspect-auto md:h-full min-h-[400px] bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-slate-900/40 order-2 overflow-hidden cursor-pointer group"
          onClick={() => track.platforms && track.platforms.length > 0 && setShowPlatforms(true)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {/* Background gradient with blue/purple tones */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-slate-900/30" />
          
          {/* Image */}
          {track.coverImage && !imageError && (
            <div className="absolute inset-0">
              <Image
                src={track.coverImage}
                alt={track.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
                onError={() => setImageError(true)}
              />
              {/* Blue/purple gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-purple-900/20 to-transparent" />
              {/* Subtle blue/purple light effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
              
              {/* Click indicator overlay */}
              {track.platforms && track.platforms.length > 0 && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="text-center">
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 mb-3"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ExternalLink className="text-white" size={24} />
                    </motion.div>
                    <p className="text-white text-sm font-medium">Stream on platforms</p>
                  </div>
                </motion.div>
              )}
            </div>
          )}
          
          {/* Fallback - only shows if no image or image fails */}
          {(!track.coverImage || imageError) && (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/40">
              <div className="text-center">
                <Music2 className="text-blue-400/60 mx-auto mb-4" size={64} />
                <p className="text-white/50 text-sm font-light">{track.title}</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={track.audioUrl} type="audio/mpeg" />
        <source src={track.audioUrl} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      
      {/* Error Message */}
      {audioError && (
        <div className="absolute bottom-4 left-4 right-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {audioError}: {track.audioUrl}
        </div>
      )}

      {/* Platform Selection Modal */}
      <AnimatePresence>
        {showPlatforms && track.platforms && track.platforms.length > 0 && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPlatforms(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setShowPlatforms(false)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md rounded-3xl backdrop-blur-xl bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-white/20 shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">Stream on Platforms</h3>
                    <button
                      onClick={() => setShowPlatforms(false)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                    >
                      <X size={18} className="text-white" />
                    </button>
                  </div>
                  <p className="text-white/60 text-sm">{track.title}</p>
                </div>

                {/* Platform Links */}
                <div className="p-6 space-y-2">
                  {track.platforms.map((platform, index) => (
                    <motion.a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                        <Music size={20} className="text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{platform.name}</p>
                        <p className="text-white/50 text-xs">Click to open</p>
                      </div>
                      <ExternalLink size={18} className="text-white/40 group-hover:text-white transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

