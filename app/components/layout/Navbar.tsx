'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/music', label: 'Music' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const navbarOpacity = useTransform(scrollY, [0, 100], [0, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        backgroundColor: isScrolled 
          ? 'rgba(10, 10, 10, 0.85)' 
          : 'rgba(10, 10, 10, 0)',
      }}
      transition={{ 
        duration: 0.6, 
        ease: [0.4, 0, 0.2, 1],
        backgroundColor: { duration: 0.3 }
      }}
      style={{
        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
      }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-white/5 shadow-lg shadow-black/20'
          : 'border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              href="/" 
              className="group relative text-lg md:text-xl font-light tracking-wide text-white transition-all duration-300"
            >
              <span className="relative z-10 group-hover:text-gold transition-colors">
                Pastor Vincent Mboniswa
              </span>
              <motion.span
                className="absolute bottom-0 left-0 h-px bg-gold"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.1 * index + 0.4,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <Link
                  href={link.href}
                  className="group relative px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-full"
                >
                  <span className={`relative z-10 transition-colors ${
                    pathname === link.href
                      ? 'text-gold'
                      : 'text-white/60 group-hover:text-white'
                  }`}>
                    {link.label}
                  </span>
                  
                  {/* Active indicator - animated underline */}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-active-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full"
                      transition={{ 
                        type: 'spring', 
                        stiffness: 380, 
                        damping: 30 
                      }}
                    />
                  )}
                  
                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.05 }}
                  />
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gold/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="md:hidden relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-[-1] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="md:hidden bg-black/40 backdrop-blur-2xl border-t border-white/10 overflow-hidden"
            >
              <motion.div 
                className="container mx-auto px-6 py-8"
                initial="closed"
                animate="open"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
              >
                <div className="flex flex-col items-center space-y-3">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      className="w-full max-w-xs"
                      variants={{
                        open: { 
                          opacity: 1, 
                          y: 0,
                          scale: 1,
                          transition: { 
                            duration: 0.4, 
                            ease: [0.4, 0, 0.2, 1] 
                          }
                        },
                        closed: { 
                          opacity: 0, 
                          y: 20,
                          scale: 0.95,
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group relative block w-full px-6 py-4 text-center text-base font-medium transition-all duration-300 rounded-2xl overflow-hidden ${
                          pathname === link.href
                            ? 'text-white bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 border border-gold/30 shadow-lg shadow-gold/10'
                            : 'text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                        }`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {link.label}
                          {pathname === link.href && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="w-1.5 h-1.5 rounded-full bg-gold"
                            />
                          )}
                        </span>
                        
                        {/* Active indicator glow */}
                        {pathname === link.href && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 opacity-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        
                        {/* Hover effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={false}
                        />
                        
                        {/* Shimmer effect on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '200%' }}
                          transition={{ duration: 0.6, ease: 'easeInOut' }}
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
