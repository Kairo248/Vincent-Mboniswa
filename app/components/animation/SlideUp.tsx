'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/app/lib/animation';

interface SlideUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function SlideUp({
  children,
  delay = 0,
  className,
}: SlideUpProps) {
  return (
    <motion.div
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ ...fadeInUp.transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

