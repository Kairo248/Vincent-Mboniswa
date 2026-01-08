'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Section from '@/app/components/ui/Section';

export default function IntroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  return (
    <Section
      ref={ref}
      id="intro"
      variant="default"
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          style={{ opacity, y }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            {!imageError && (
              <Link href="/about" className="block relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden group cursor-pointer">
                <Image
                  src="/images/intro-image.jpeg"
                  alt="Pastor Vincent Mboniswa"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  onError={() => setImageError(true)}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Hover overlay with CTA */}
                <motion.div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.div
                    className="flex items-center gap-3 text-white px-6 py-3 rounded-full backdrop-blur-xl bg-white/10 border border-white/20"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="font-medium text-sm md:text-base">Learn More</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </motion.div>
                
                {/* Decorative border glow */}
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-gold/40 transition-colors" />
                
                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            )}
          </motion.div>

          {/* Text Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            {/* Decorative Icon or Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent border border-purple-400/30 backdrop-blur-xl">
                <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              </div>
            </motion.div>

            {/* Main Intro Text */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight text-left lg:text-left">
                Welcome to a Journey of{' '}
                <span className="bg-gradient-to-r from-gold via-[#f8d66a] to-gold bg-clip-text text-transparent font-medium">
                  Faith, Worship & Ministry
                </span>
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-white/70 leading-relaxed font-light text-left lg:text-left"
              >
                Through anointed gospel music, powerful sermons, and transformative ministry, 
                we are committed to spreading the love of Christ and inspiring hearts to experience 
                the fullness of God's purpose.
              </motion.p>
            </div>

            {/* Decorative Line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-8 flex items-center gap-4"
            >
              <div className="h-px bg-gradient-to-r from-gold/40 via-gold/60 to-transparent flex-1 max-w-[80px]" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full mix-blend-screen filter blur-3xl opacity-50"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/5 rounded-full mix-blend-screen filter blur-3xl opacity-50"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </Section>
  );
}

