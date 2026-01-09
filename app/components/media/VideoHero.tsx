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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Intersection Observer to ensure video plays when visible
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isPlaying && !hasStarted) {
            // Video is visible, try to play
            const playPromise = video.play();
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
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [isPlaying, hasStarted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set video attributes
    video.muted = isMuted;
    video.preload = 'auto'; // Changed back to auto for better desktop compatibility
    
    // Ensure video is visible and properly positioned
    video.style.display = 'block';
    video.style.visibility = 'visible';
    video.style.opacity = '1';
    video.style.zIndex = '1';
    
    // Try to play when ready
    const tryPlay = async () => {
      if (isPlaying && !hasStarted) {
        try {
          // Wait for video to be ready
          if (video.readyState < 2) {
            await new Promise((resolve) => {
              const onCanPlay = () => {
                video.removeEventListener('canplay', onCanPlay);
                resolve(true);
              };
              video.addEventListener('canplay', onCanPlay);
              // Timeout after 5 seconds
              setTimeout(() => {
                video.removeEventListener('canplay', onCanPlay);
                resolve(false);
              }, 5000);
            });
          }

          if (video.readyState >= 2) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              await playPromise;
              setHasStarted(true);
              setIsLoading(false);
            }
          }
        } catch (error) {
          console.error('Error playing video:', error);
          // Autoplay was blocked - video will show but won't play until user interaction
          setIsLoading(false);
        }
      }
    };

    // Try playing on various events
    const handleCanPlay = () => {
      setIsLoading(false);
      tryPlay();
    };

    video.addEventListener('loadeddata', handleCanPlay);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlay);

    // Initial play attempt after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      tryPlay();
    }, 100);

    if (!isPlaying) {
      video.pause();
    }

    return () => {
      clearTimeout(timeoutId);
      video.removeEventListener('loadeddata', handleCanPlay);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('canplaythrough', handleCanPlay);
    };
  }, [isPlaying, isMuted, hasStarted]);

  // Handle user interaction to start video if autoplay was blocked
  const handleUserInteraction = async () => {
    const video = videoRef.current;
    if (video && !hasStarted && isPlaying) {
      try {
        await video.play();
        setHasStarted(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error playing video on user interaction:', error);
      }
    }
  };

  // Handle video load error
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    console.error('Video failed to load:', {
      src: videoSrc,
      error: video.error,
      networkState: video.networkState,
      readyState: video.readyState,
    });
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden bg-black ${className}`}
      onClick={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
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
          if (videoRef.current && isPlaying && !hasStarted) {
            videoRef.current.play().catch(() => {
              setIsPlaying(false);
            });
          }
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
        onLoadStart={() => {
          // Video loading started
          setIsLoading(true);
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          display: 'block',
          visibility: 'visible',
          pointerEvents: 'none',
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {isLoading && !poster && !hasError && (
        <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center z-30">
          <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 z-20 flex items-center justify-center">
          <div className="text-center text-white/60">
            <p className="text-sm">Video unavailable</p>
          </div>
        </div>
      )}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 z-10" />
      )}

      <div className="absolute inset-0 flex items-center justify-center z-20">
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

