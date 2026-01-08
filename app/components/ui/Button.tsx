'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/app/lib/utils';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  href,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black';
  
  const variants = {
    primary: 'bg-gold text-black hover:bg-gold-light focus:ring-gold shadow-lg hover:shadow-xl hover:shadow-gold/20',
    secondary: 'bg-white/5 text-white hover:bg-white/10 focus:ring-white/30 border border-white/10',
    outline: 'border border-gold/50 text-gold hover:bg-gold/10 hover:border-gold focus:ring-gold/50',
    ghost: 'text-white/70 hover:text-white hover:bg-white/5 focus:ring-white/20',
    minimal: 'text-white/60 hover:text-gold focus:ring-gold/30 underline-offset-4 hover:underline',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const buttonClasses = cn(baseStyles, variants[variant], sizes[size], className);

  const buttonContent = (
    <motion.button
      type={type}
      className={cn(buttonClasses, disabled && 'opacity-50 cursor-not-allowed')}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return buttonContent;
}
