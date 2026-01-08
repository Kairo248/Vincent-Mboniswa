'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { MusicTrack } from '@/app/types';

interface AudioPlayerProps {
  track: MusicTrack;
  className?: string;
}

export default function AudioPlayer({ track, className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const MAX_PLAYBACK_TIME = 60; // 60 seconds limit

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

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

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
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
      className={`bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all ${className}`}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-12 h-12 rounded-full bg-gold text-black flex items-center justify-center hover:bg-gold/90 transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="min-w-0 flex-1">
              <h4 className="text-white font-semibold truncate">{track.title}</h4>
              {track.album && (
                <p className="text-white/60 text-sm truncate">{track.album}</p>
              )}
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Volume2 size={16} className="text-white/60" />
              <span className="text-white/60 text-sm">
                {formatTime(currentTime)} / {formatTime(MAX_PLAYBACK_TIME)}
              </span>
            </div>
          </div>

          <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gold"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={track.audioUrl}
        onEnded={() => setIsPlaying(false)}
      />
    </motion.div>
  );
}

