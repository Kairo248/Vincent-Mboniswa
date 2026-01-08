'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Calendar, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import Section from '@/app/components/ui/Section';
import Heading from '@/app/components/ui/Heading';
import EventCard from '@/app/components/cards/EventCard';
import { events } from '@/app/lib/data';
import { cn } from '@/app/lib/utils';

export default function UpcomingEventsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter upcoming events
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition();
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [upcomingEvents.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      const targetScroll = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Section id="events" className="relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
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
          className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20"
          >
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                type: 'spring' as const,
                stiffness: 200,
                damping: 15,
                duration: 0.8,
              }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-transparent border border-purple-400/30 backdrop-blur-xl mb-8 relative"
            >
              <Calendar className="text-purple-400 relative z-10" size={32} />
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
                  className="absolute top-0 right-0 text-purple-400/40"
                  size={12}
                />
                <Sparkles
                  className="absolute bottom-0 left-0 text-blue-400/40"
                  size={12}
                />
              </motion.div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Heading
                level={2}
                size="2xl"
                className="mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
                align="center"
              >
                Upcoming Events
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
              Join us for powerful worship services and ministry events
            </motion.p>
          </motion.div>

          {/* Events Scrollable Container */}
          {upcomingEvents.length > 0 ? (
            <div className="relative mb-12 -mx-4 px-4 md:mx-0 md:px-0">
              {/* Scroll Buttons - Show on mobile if more than 1 event, desktop if more than 3 */}
              {(upcomingEvents.length > 1) && (
                <>
                  <motion.button
                    onClick={() => scroll('left')}
                    className={cn(
                      'absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-xl bg-gradient-to-r from-white/20 to-white/10 border border-white/20 flex items-center justify-center transition-all shadow-lg',
                      canScrollLeft 
                        ? 'opacity-100 hover:scale-110 cursor-pointer' 
                        : 'opacity-0 pointer-events-none'
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Scroll left"
                  >
                    <ChevronLeft size={20} className="md:w-6 md:h-6 text-white" />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => scroll('right')}
                    className={cn(
                      'absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-xl bg-gradient-to-r from-white/20 to-white/10 border border-white/20 flex items-center justify-center transition-all shadow-lg',
                      canScrollRight 
                        ? 'opacity-100 hover:scale-110 cursor-pointer' 
                        : 'opacity-0 pointer-events-none'
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Scroll right"
                  >
                    <ChevronRight size={20} className="md:w-6 md:h-6 text-white" />
                  </motion.button>
                </>
              )}

              {/* Scrollable Events Container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {upcomingEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="flex-shrink-0 w-[85%] sm:w-[75%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
                  >
                    <EventCard event={event} index={index} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-16"
            >
              <p className="text-white/60 text-lg">No upcoming events at this time.</p>
              <p className="text-white/40 text-sm mt-2">Check back soon for new events!</p>
            </motion.div>
          )}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center mt-8"
          >
            <motion.a
              href="/events"
              className="group relative inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-8 md:py-4 rounded-xl backdrop-blur-xl bg-gradient-to-br from-slate-800/50 via-slate-700/30 to-slate-800/50 border border-white/10 text-white font-medium text-sm md:text-base transition-all duration-300 overflow-hidden hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Animated gradient background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Shimmer effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
              
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2 md:gap-3">
                <span className="font-medium">View All Events</span>
                <motion.div
                  className="relative flex items-center justify-center"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <ArrowRight size={16} className="md:w-5 md:h-5 text-white group-hover:text-blue-300 transition-colors" />
                </motion.div>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

