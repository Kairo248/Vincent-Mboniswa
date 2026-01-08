'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Section from '@/app/components/ui/Section';
import Heading from '@/app/components/ui/Heading';
import SlideUp from '@/app/components/animation/SlideUp';
import FadeIn from '@/app/components/animation/FadeIn';
import Button from '@/app/components/ui/Button';
import { socialLinks } from '@/app/lib/data';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import TiktokIcon from '@/app/components/icons/TiktokIcon';

const iconMap = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: TiktokIcon,
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        message: '',
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <Section fullHeight variant="gradient">
        <div className="max-w-7xl mx-auto">
          <SlideUp>
            <Heading level={1} size="2xl" variant="gold" align="center" className="mb-6">
              Contact & Booking
            </Heading>
            <p className="text-xl text-white/80 text-center max-w-3xl mx-auto leading-relaxed">
              Get in touch for ministry bookings, events, or general inquiries
            </p>
          </SlideUp>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <SlideUp>
              <div>
                <Heading level={2} size="lg" variant="gold" className="mb-8">
                  Get In Touch
                </Heading>
                <div className="space-y-6 mb-8">
                  <FadeIn>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                        <Mail className="text-gold" size={20} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Email</h3>
                        <a
                          href="mailto:contact@pastorvincent.com"
                          className="text-white/70 hover:text-gold transition-colors"
                        >
                          contact@pastorvincent.com
                        </a>
                      </div>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.1}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="text-gold" size={20} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Phone</h3>
                        <a
                          href="tel:+1234567890"
                          className="text-white/70 hover:text-gold transition-colors"
                        >
                          +1 (234) 567-8900
                        </a>
                      </div>
                    </div>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="text-gold" size={20} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">Location</h3>
                        <p className="text-white/70">
                          Available for ministry events worldwide
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => {
                      const Icon =
                        iconMap[social.icon.toLowerCase() as keyof typeof iconMap] || Facebook;
                      return (
                        <a
                          key={social.platform}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-lg bg-white/5 hover:bg-gold hover:text-black transition-all flex items-center justify-center text-white/60"
                          aria-label={social.platform}
                        >
                          <Icon size={20} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </SlideUp>

            {/* Booking Form */}
            <SlideUp delay={0.2}>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                <Heading level={2} size="lg" variant="gold" className="mb-6">
                  Booking Request
                </Heading>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                      <Send className="text-gold" size={32} />
                    </div>
                    <h3 className="text-white font-semibold text-xl mb-2">
                      Thank You!
                    </h3>
                    <p className="text-white/70">
                      Your message has been sent. We'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-white/80 text-sm font-medium mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-white/80 text-sm font-medium mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-white/80 text-sm font-medium mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="+1 (234) 567-8900"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="eventType"
                        className="block text-white/80 text-sm font-medium mb-2"
                      >
                        Event Type
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      >
                        <option value="">Select event type</option>
                        <option value="worship">Worship Service</option>
                        <option value="conference">Conference</option>
                        <option value="concert">Concert</option>
                        <option value="ministry">Ministry Event</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="eventDate"
                        className="block text-white/80 text-sm font-medium mb-2"
                      >
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-white/80 text-sm font-medium mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                        placeholder="Tell us about your event or inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="ml-2" size={18} />
                    </Button>
                  </form>
                )}
              </div>
            </SlideUp>
          </div>
        </div>
      </Section>
    </main>
  );
}

