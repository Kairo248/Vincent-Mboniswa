'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Calendar, Clock } from 'lucide-react';
import Section from '@/app/components/ui/Section';
import Heading from '@/app/components/ui/Heading';
import SlideUp from '@/app/components/animation/SlideUp';
import FadeIn from '@/app/components/animation/FadeIn';
import { sermons, sermonTopics } from '@/app/lib/data';
import { Sermon } from '@/app/types';

export default function SermonsPage() {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);

  const filteredSermons =
    selectedTopic === 'All'
      ? sermons
      : sermons.filter((sermon) => sermon.topic === selectedTopic);

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <Section fullHeight variant="gradient">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <Heading level={1} size="2xl" variant="gold" align="center" className="mb-6">
              Sermons & Messages
            </Heading>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto leading-relaxed">
              Powerful messages that inspire, challenge, and transform lives
            </p>
          </SlideUp>
        </div>
      </Section>

      {/* Filter Section */}
      <Section id="filters">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              {sermonTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedTopic === topic
                      ? 'bg-gold text-black'
                      : 'bg-white/5 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </SlideUp>
        </div>
      </Section>

      {/* Sermons Grid */}
      <Section id="sermons" variant="dark">
        <div className="max-w-7xl mx-auto">
          {filteredSermons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {filteredSermons.map((sermon, index) => (
                <motion.div
                  key={sermon.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <FadeIn delay={index * 0.1}>
                    <div
                      className="group cursor-pointer"
                      onClick={() => setSelectedSermon(sermon)}
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-white/10">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play size={24} className="text-black ml-1" fill="currentColor" />
                          </div>
                        </div>
                        <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-gold/90 text-black text-xs font-semibold rounded-full">
                          {sermon.topic}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-gold transition-colors">
                        {sermon.title}
                      </h3>
                      <div className="flex items-center gap-4 text-white/60 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(sermon.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                        {sermon.duration && (
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {sermon.duration}
                          </span>
                        )}
                      </div>
                      {sermon.description && (
                        <p className="text-white/70 text-sm mt-2 line-clamp-2">
                          {sermon.description}
                        </p>
                      )}
                    </div>
                  </FadeIn>
                </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">No sermons available at this time. Check back soon!</p>
            </div>
          )}
        </div>
      </Section>

      {/* Video Lightbox */}
      <AnimatePresence>
        {selectedSermon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedSermon(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors flex items-center justify-center z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSermon(null);
              }}
            >
              ×
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={selectedSermon.videoUrl}
                controls
                autoPlay
                className="w-full h-auto rounded-lg"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white text-2xl font-semibold mb-2">{selectedSermon.title}</h3>
                <p className="text-white/70">{selectedSermon.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

