'use client';

import Section from '@/app/components/ui/Section';
import Heading from '@/app/components/ui/Heading';
import SlideUp from '@/app/components/animation/SlideUp';
import FadeIn from '@/app/components/animation/FadeIn';
import { scriptures } from '@/app/lib/data';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section */}
      <Section fullHeight variant="gradient">
        <div className="max-w-4xl mx-auto text-center">
          <SlideUp>
            <Heading level={1} size="2xl" variant="gold" align="center" className="mb-6">
              About Pastor Vincent Mboniswa
            </Heading>
            <p className="text-xl text-white/80 leading-relaxed">
              A servant of God, spreading the gospel through music, ministry, and the Word
            </p>
          </SlideUp>
        </div>
      </Section>

      {/* Biography Section */}
      <Section id="biography">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <FadeIn>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                <Image
                  src="/images/intro-image.jpeg"
                  alt="Pastor Vincent Mboniswa"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
            <SlideUp>
              <div>
                <Heading level={2} size="lg" variant="gold" className="mb-6">
                  Biography
                </Heading>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    Pastor Vincent Mboniswa is a dedicated servant of God, called to spread the
                    gospel through the powerful combination of music, ministry, and the Word of God.
                    With a heart for worship and a passion for seeing lives transformed, he has
                    dedicated his life to serving the body of Christ.
                  </p>
                  <p>
                    Through his anointed music and powerful preaching, Pastor Vincent has touched
                    countless lives, bringing hope, healing, and restoration to those who hear
                    the message. His ministry is characterized by a deep reverence for God's Word
                    and a genuine love for people.
                  </p>
                  <p>
                    Whether through worship songs that lift the spirit or sermons that challenge
                    and inspire, Pastor Vincent's ministry is committed to seeing God's kingdom
                    advance and His people equipped for every good work.
                  </p>
                </div>
              </div>
            </SlideUp>
          </div>
        </div>
      </Section>

      {/* Testimony Section */}
      <Section id="testimony" variant="dark">
        <div className="max-w-4xl mx-auto">
          <SlideUp>
            <Heading level={2} size="lg" variant="gold" align="center" className="mb-12">
              Testimony
            </Heading>
          </SlideUp>
          <FadeIn>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 md:p-12 border border-white/10">
              <p className="text-xl text-white/90 leading-relaxed mb-6 italic">
                "God called me from a place of brokenness to a place of purpose. Through His grace,
                I discovered that my voice and my life could be instruments of His glory. Every song,
                every sermon, every moment of ministry is a testimony to His faithfulness and love."
              </p>
              <p className="text-gold font-semibold">— Pastor Vincent Mboniswa</p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Vision & Mission Section */}
      <Section id="vision-mission">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <SlideUp>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                <Heading level={3} size="md" variant="gold" className="mb-6">
                  Vision
                </Heading>
                <p className="text-white/80 leading-relaxed">
                  To see a generation transformed by the power of the gospel, walking in their
                  God-given purpose, and advancing the kingdom of God through worship, the Word,
                  and authentic ministry.
                </p>
              </div>
            </SlideUp>
            <SlideUp delay={0.1}>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                <Heading level={3} size="md" variant="gold" className="mb-6">
                  Mission
                </Heading>
                <p className="text-white/80 leading-relaxed">
                  To spread the gospel of Jesus Christ through anointed music, powerful preaching,
                  and compassionate ministry, equipping believers to live out their faith and
                  impact their communities for the glory of God.
                </p>
              </div>
            </SlideUp>
          </div>
        </div>
      </Section>

      {/* Scripture Quotes Section */}
      <Section id="scriptures" variant="gradient">
        <div className="max-w-4xl mx-auto">
          <SlideUp>
            <Heading level={2} size="lg" variant="gold" align="center" className="mb-12">
              Scriptures That Inspire
            </Heading>
          </SlideUp>
          <div className="space-y-8">
            {scriptures.map((scripture, index) => (
              <FadeIn key={index} delay={index * 0.2}>
                <div className="text-center">
                  <blockquote className="text-2xl md:text-3xl text-white/90 font-light leading-relaxed mb-4 italic">
                    "{scripture.verse}"
                  </blockquote>
                  <p className="text-gold text-lg font-semibold">
                    {scripture.reference}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}

