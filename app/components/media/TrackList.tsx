'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { MusicTrack } from '@/app/types';
import Image from 'next/image';

interface TrackListProps {
  tracks: MusicTrack[];
  showAlbumArt?: boolean;
}

export default function TrackList({ tracks, showAlbumArt = false }: TrackListProps) {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const MAX_PLAYBACK_TIME = 60; // 60 seconds limit

  // Monitor audio playback and stop at 60 seconds
  useEffect(() => {
    const handleTimeUpdate = (trackId: string, audio: HTMLAudioElement) => {
      if (audio.currentTime >= MAX_PLAYBACK_TIME) {
        audio.pause();
        audio.currentTime = 0;
        setPlayingTrackId(null);
      }
    };

    const listeners: { [key: string]: () => void } = {};

    // Add timeupdate listeners to all audio elements
    Object.keys(audioRefs.current).forEach((trackId) => {
      const audio = audioRefs.current[trackId];
      if (audio) {
        const listener = () => handleTimeUpdate(trackId, audio);
        audio.addEventListener('timeupdate', listener);
        listeners[trackId] = listener;
      }
    });

    // Cleanup
    return () => {
      Object.keys(listeners).forEach((trackId) => {
        const audio = audioRefs.current[trackId];
        if (audio && listeners[trackId]) {
          audio.removeEventListener('timeupdate', listeners[trackId]);
        }
      });
    };
  }, [tracks]);

  const togglePlay = (trackId: string) => {
    const audio = audioRefs.current[trackId];
    
    // Pause all other tracks
    Object.keys(audioRefs.current).forEach((id) => {
      if (id !== trackId && audioRefs.current[id]) {
        audioRefs.current[id]?.pause();
      }
    });

    if (audio) {
      if (playingTrackId === trackId) {
        audio.pause();
        setPlayingTrackId(null);
      } else {
        audio.play();
        setPlayingTrackId(trackId);
      }
    }
  };

  const formatTime = (time: string) => {
    return time;
  };

  return (
    <div className="space-y-1">
      {tracks.map((track, index) => {
        const isPlaying = playingTrackId === track.id;
        const audio = audioRefs.current[track.id];

        return (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            className="group relative flex items-center gap-4 p-4 rounded-lg hover:bg-blue-500/10 hover:border-blue-400/20 border border-transparent transition-all duration-200"
          >
            {/* Track Number / Play Button */}
            <div className="flex-shrink-0 w-10 flex items-center justify-center">
              {isPlaying ? (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => togglePlay(track.id)}
                  className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center hover:bg-blue-300 transition-colors shadow-lg shadow-blue-400/30"
                  aria-label="Pause"
                >
                  <Pause size={18} fill="currentColor" />
                </motion.button>
              ) : (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => togglePlay(track.id)}
                  className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all opacity-0 group-hover:opacity-100 border border-blue-400/30"
                  aria-label="Play"
                >
                  <Play size={18} fill="currentColor" className="ml-0.5" />
                </motion.button>
              )}
              {!isPlaying && (
                <span className="text-blue-200/50 text-sm font-light group-hover:opacity-0 transition-opacity absolute">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
            </div>

            {/* Album Art (if enabled) */}
            {showAlbumArt && track.coverImage && (
              <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-white/5">
                <Image
                  src={track.coverImage}
                  alt={track.title}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            {/* Track Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium text-base truncate group-hover:text-blue-300 transition-colors">
                {track.title}
              </h4>
              {track.album && (
                <p className="text-white/60 text-sm truncate font-light">
                  {track.album}
                </p>
              )}
            </div>

            {/* Duration */}
            <div className="flex-shrink-0 text-blue-200/50 text-sm font-light">
              1:00
            </div>

            {/* Audio Element */}
            <audio
              ref={(el) => {
                audioRefs.current[track.id] = el;
              }}
              src={track.audioUrl}
              onEnded={() => setPlayingTrackId(null)}
              onPlay={() => setPlayingTrackId(track.id)}
              onPause={() => {
                if (playingTrackId === track.id) {
                  setPlayingTrackId(null);
                }
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

