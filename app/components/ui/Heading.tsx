'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/app/lib/utils';
import { fadeInUp } from '@/app/lib/animation';

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  variant?: 'default' | 'gold' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'left' | 'center' | 'right';
}

export default function Heading({
  children,
  level = 2,
  className,
  variant = 'default',
  size = 'lg',
  align = 'left',
}: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  const variants = {
    default: 'text-white',
    gold: 'text-gold',
    gradient: 'bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent',
  };

  const sizes = {
    sm: 'text-2xl md:text-3xl font-semibold',
    md: 'text-3xl md:text-4xl font-semibold',
    lg: 'text-4xl md:text-5xl lg:text-6xl font-light tracking-tight',
    xl: 'text-5xl md:text-6xl lg:text-7xl font-light tracking-tight',
    '2xl': 'text-6xl md:text-7xl lg:text-8xl font-light tracking-tight',
  };

  const aligns = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <motion.div
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      viewport={{ once: true, margin: '-100px' }}
      transition={fadeInUp.transition}
    >
      <Tag
        className={cn(
          'leading-[1.1]',
          variants[variant],
          sizes[size],
          aligns[align],
          className
        )}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
