'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles, Image as ImageIcon, Ticket } from 'lucide-react';
import { Event } from '@/app/types';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';

interface EventCardProps {
  event: Event;
  index?: number;
  className?: string;
}

export default function EventCard({ event, index = 0, className }: EventCardProps) {
  const [imageError, setImageError] = useState(false);
  const eventDate = new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);
  const isUpcoming = eventDate >= today;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      worship: 'from-blue-500/20 to-blue-500/10 border-blue-400/30 text-blue-300',
      concert: 'from-purple-500/20 to-purple-500/10 border-purple-400/30 text-purple-300',
      conference: 'from-gold/20 to-gold/10 border-gold/30 text-gold',
      ministry: 'from-green-500/20 to-green-500/10 border-green-400/30 text-green-300',
    };
    return colors[type as keyof typeof colors] || 'from-white/10 to-white/5 border-white/20 text-white';
  };

  const isConcert = event.type === 'concert';
  const hasTicketUrl = isConcert && event.ticketUrl;

  const cardContent = (
    <div className="relative h-full rounded-2xl backdrop-blur-xl bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
        {/* Event Image */}
        {event.image && !imageError && (
          <div className="relative w-full h-48 md:h-56 overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              onError={() => setImageError(true)}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
            
            {/* Buy Ticket Hover Overlay for Concerts */}
            {hasTicketUrl && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <div className="text-center">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full backdrop-blur-xl bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-purple-400/50 mb-3"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Ticket size={24} className="text-white" />
                  </motion.div>
                  <p className="text-white font-semibold text-lg">Buy Ticket</p>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Upcoming Badge */}
        {isUpcoming && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute top-4 right-4 z-10"
          >
            <div className="relative px-3 py-1.5 rounded-full backdrop-blur-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30">
              <div className="flex items-center gap-1.5">
                <Sparkles size={12} className="text-blue-300" />
                <span className="text-xs font-medium text-white">Upcoming</span>
              </div>
              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-500/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Event Type Badge */}
          <div className="mb-4">
            <span
              className={cn(
                'inline-block px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm',
                getTypeColor(event.type)
              )}
            >
              {event.type.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-white font-semibold text-xl md:text-2xl mb-6 group-hover:text-blue-300 transition-colors">
            {event.title}
          </h3>

          {/* Event Details */}
          <div className="space-y-4">
            {/* Date */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-2 rounded-lg bg-white/5 border border-white/10">
                <Calendar size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-white/60 text-xs font-medium mb-0.5">Date</p>
                <p className="text-white font-medium">{formatDate(eventDate)}</p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-2 rounded-lg bg-white/5 border border-white/10">
                <Clock size={16} className="text-purple-400" />
              </div>
              <div>
                <p className="text-white/60 text-xs font-medium mb-0.5">Time</p>
                <p className="text-white font-medium">{event.time}</p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-2 rounded-lg bg-white/5 border border-white/10">
                <MapPin size={16} className="text-gold" />
              </div>
              <div>
                <p className="text-white/60 text-xs font-medium mb-0.5">Venue</p>
                <p className="text-white font-medium">{event.venue}</p>
                {event.location && (
                  <p className="text-white/50 text-sm mt-1">{event.location}</p>
                )}
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <div className="pt-4 border-t border-white/10">
                <p className="text-white/70 text-sm leading-relaxed">{event.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Hover gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={cn('group relative', hasTicketUrl && 'cursor-pointer', className)}
    >
      {hasTicketUrl ? (
        <a
          href={event.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </motion.div>
  );
}

