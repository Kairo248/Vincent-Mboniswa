'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { GalleryItem } from '@/app/types';
import Image from 'next/image';

interface GalleryGridProps {
  items: GalleryItem[];
  className?: string;
}

export default function GalleryGrid({ items, className }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
            onClick={() => setSelectedItem(item)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            <Image
              src={item.thumbnail}
              alt={item.title || 'Gallery item'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center">
                  <Play size={24} className="text-black ml-1" fill="currentColor" />
                </div>
              </div>
            )}
            {item.title && (
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-white font-semibold">{item.title}</h3>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors flex items-center justify-center z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(null);
              }}
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.type === 'image' ? (
                <Image
                  src={selectedItem.url}
                  alt={selectedItem.title || 'Gallery image'}
                  width={1200}
                  height={800}
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="w-full h-auto rounded-lg"
                  priority
                />
              ) : (
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  className="w-full h-auto rounded-lg"
                />
              )}
              {selectedItem.title && (
                <div className="mt-4 text-center">
                  <h3 className="text-white text-2xl font-semibold mb-2">{selectedItem.title}</h3>
                  {selectedItem.description && (
                    <p className="text-white/70">{selectedItem.description}</p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

