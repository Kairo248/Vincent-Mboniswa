'use client';

import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { socialLinks } from '@/app/lib/data';
import FadeIn from '@/app/components/animation/FadeIn';
import TiktokIcon from '@/app/components/icons/TiktokIcon';

const iconMap = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: TiktokIcon,
};

export default function Footer() {
  return (
    <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <FadeIn>
            <div>
              <h3 className="text-gold text-lg font-light mb-4 tracking-wide">Pastor Vincent Mboniswa</h3>
              <p className="text-white/50 text-sm leading-relaxed font-light">
                Spreading the gospel through music, ministry, and the Word of God.
                Inspiring hearts and transforming lives.
              </p>
            </div>
          </FadeIn>

        

          <FadeIn delay={0.2}>
            <div>
              <h4 className="text-white font-medium mb-6 text-sm tracking-wide uppercase">Connect</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = iconMap[social.icon.toLowerCase() as keyof typeof iconMap] || Facebook;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-gold/10 hover:border-gold/30 border border-white/5 transition-all flex items-center justify-center text-white/50 hover:text-gold"
                      aria-label={social.platform}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="border-t border-white/5 pt-8">
          <p className="text-white/30 text-xs text-center font-light">
            © {new Date().getFullYear()} Pastor Vincent Mboniswa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
