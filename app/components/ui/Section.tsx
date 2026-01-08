'use client';

import { ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/app/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: 'default' | 'dark' | 'gradient' | 'elevated';
  fullHeight?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    children,
    className,
    id,
    variant = 'default',
    fullHeight = false,
  },
  ref
) {
  const variants = {
    default: 'bg-transparent text-white',
    dark: 'bg-black/20 backdrop-blur-sm text-white',
    gradient: 'bg-gradient-to-b from-black/30 via-black/20 to-black/30 backdrop-blur-sm text-white',
    elevated: 'bg-black/30 backdrop-blur-md text-white',
  };

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        'relative w-full z-10',
        variants[variant],
        fullHeight && 'min-h-screen',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {children}
      </div>
    </section>
  );
});

export default Section;
