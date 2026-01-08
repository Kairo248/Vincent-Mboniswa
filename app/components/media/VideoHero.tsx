'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoHeroProps {
  videoSrc: string;
  poster?: string;
  overlay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function VideoHero({
  videoSrc,
  poster,
  overlay = true,
  className,
  children,
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      // Set video attributes for faster loading
      videoRef.current.muted = isMuted;
      videoRef.current.preload = 'auto';
      
      // Try to load and play immediately
      if (isPlaying && !hasStarted) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setHasStarted(true);
              setIsLoading(false);
            })
            .catch((error) => {
              console.error('Error playing video:', error);
              setIsPlaying(false);
              setIsLoading(false);
            });
        }
      } else if (!isPlaying) {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isMuted, hasStarted]);

  // Handle video load error
  const handleVideoError = () => {
    console.error('Video failed to load:', videoSrc);
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-black ${className}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        onError={handleVideoError}
        onLoadedMetadata={() => {
          // Metadata loaded - video is ready to play
          setIsLoading(false);
        }}
        onCanPlay={() => {
          // Video can start playing
          setIsLoading(false);
          if (videoRef.current && isPlaying && !hasStarted) {
            videoRef.current.play().catch(() => {
              setIsPlaying(false);
            });
          }
        }}
        onCanPlayThrough={() => {
          // Video can play through without buffering
          setIsLoading(false);
        }}
        onPlaying={() => {
          setHasStarted(true);
          setIsLoading(false);
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {isLoading && !poster && (
        <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center z-30">
          <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      )}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      )}

      <div className="absolute inset-0 flex items-center justify-center z-10">
        {children}
      </div>

      <div className="absolute bottom-6 right-6 z-20 flex gap-2">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2.5 bg-white/5 backdrop-blur-md rounded-full text-white/80 hover:text-white hover:bg-white/10 border border-white/10 transition-all"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2.5 bg-white/5 backdrop-blur-md rounded-full text-white/80 hover:text-white hover:bg-white/10 border border-white/10 transition-all"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
}

