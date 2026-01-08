'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Music, Video, Calendar } from 'lucide-react';
import Button from '@/app/components/ui/Button';
import VideoHero from '@/app/components/media/VideoHero';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    },
  };

  return (
    <motion.section
      style={{ opacity, y }}
      className="relative w-full h-screen overflow-hidden"
    >
      <VideoHero videoSrc="/videos/HeroVideo.mp4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center px-4 max-w-6xl mx-auto"
        >
          {/* Main Heading */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <span className="block text-white leading-[1.1]">
                Pastor Vincent
              </span>
              <motion.span
                className="block bg-gradient-to-r from-gold via-[#f8d66a] to-gold bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Mboniswa
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-[1.7] font-light tracking-wide"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
              >
                Spreading the gospel through{' '}
              </motion.span>
              <motion.span
                className="text-gold font-medium relative inline-block"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="absolute -inset-2 bg-gold/10 rounded-lg blur-md -z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                />
                music
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                ,{' '}
              </motion.span>
              <motion.span
                className="text-gold font-medium relative inline-block"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="absolute -inset-2 bg-gold/10 rounded-lg blur-md -z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                />
                ministry
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                , and the{' '}
              </motion.span>
              <motion.span
                className="text-gold font-medium relative inline-block"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4, ease: [0.4, 0, 0.2, 1] }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="absolute -inset-2 bg-gold/10 rounded-lg blur-md -z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 }}
                />
                Word of God
              </motion.span>
            </motion.p>
            
            {/* Animated underline decoration */}
            <motion.div
              className="flex items-center justify-center gap-3 mt-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: '120px' }}
                transition={{ duration: 1.2, delay: 2.0, ease: 'easeOut' }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-gold"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 0.6, delay: 2.2, ease: 'easeOut' }}
              />
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: '120px' }}
                transition={{ duration: 1.2, delay: 2.0, ease: 'easeOut' }}
              />
            </motion.div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button href="/music" variant="primary" size="lg">
                <Music className="mr-2" size={18} />
                Listen to Music
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button href="/sermons" variant="outline" size="lg">
                <Video className="mr-2" size={18} />
                Watch Sermons
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button href="/contact" variant="ghost" size="lg">
                <Calendar className="mr-2" size={18} />
                Book Ministry
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors cursor-pointer"
            >
              <span className="text-xs font-light tracking-widest uppercase">
                Scroll
              </span>
              <ArrowDown size={20} className="animate-bounce" />
            </motion.div>
          </motion.div>
        </motion.div>
      </VideoHero>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.section>
  );
}

