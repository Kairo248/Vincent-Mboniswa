'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Music2, Sparkles } from 'lucide-react';
import Section from '@/app/components/ui/Section';
import Heading from '@/app/components/ui/Heading';
import FeaturedMusicCard from '@/app/components/media/FeaturedMusicCard';
import Button from '@/app/components/ui/Button';
import { musicTracks } from '@/app/lib/data';

export default function FeaturedMusicSection() {
  const featuredTrack = musicTracks.find(track => track.featured) || musicTracks[0];
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
        duration: 1,
        delay: 0.3,
      },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6,
        delay: 0.6,
      },
    },
  };

  return (
    <Section id="featured-music" className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div ref={sectionRef} className="relative max-w-7xl mx-auto">
        <motion.div
          style={{ opacity, y }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Header Section */}
          <motion.div
            variants={headerVariants}
            className="flex flex-col items-center text-center mb-16 md:mb-20"
          >
            {/* Icon with enhanced animation */}
            <motion.div
              variants={iconVariants}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent border border-blue-400/30 backdrop-blur-xl mb-8 relative"
            >
              <Music2 className="text-blue-400 relative z-10" size={32} />
              {/* Sparkle effects */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <Sparkles
                  className="absolute top-0 right-0 text-blue-400/40"
                  size={12}
                />
                <Sparkles
                  className="absolute bottom-0 left-0 text-purple-400/40"
                  size={12}
                />
              </motion.div>
            </motion.div>

            {/* Heading with stagger */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Heading
                level={2}
                size="2xl"
                className="mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
                align="center"
              >
                Music
              </Heading>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-white/70 text-center max-w-2xl mx-auto font-light text-lg md:text-xl leading-relaxed px-4"
            >
              Experience the power of worship through this anointed song
            </motion.p>
          </motion.div>

          {/* Featured Song Card with enhanced animation */}
          <motion.div variants={cardVariants} className="mb-16">
            <FeaturedMusicCard track={featuredTrack} />
          </motion.div>

          {/* CTA Button with animation */}
          <motion.div
            variants={ctaVariants}
            className="flex justify-center"
          >
            <motion.a
              href="/music"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full backdrop-blur-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/20 text-white font-medium text-base transition-all duration-300 hover:border-white/30 hover:from-white/15 hover:via-white/10 hover:to-white/15 shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"
              />
              
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-3">
                <span>View All Music</span>
                <motion.div
                  className="relative"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <ArrowRight size={18} className="text-white" />
                </motion.div>
              </span>
              
              {/* Hover gradient overlay */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
              />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
