import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pastor Vincent Mboniswa | Gospel Artist & Pastor',
  description:
    'Experience the power of worship through anointed gospel music, powerful sermons, and transformative ministry. Join Pastor Vincent Mboniswa in spreading the gospel.',
  keywords: [
    'gospel music',
    'pastor',
    'worship',
    'sermons',
    'ministry',
    'christian music',
    'gospel artist',
  ],
  authors: [{ name: 'Pastor Vincent Mboniswa' }],
  openGraph: {
    title: 'Pastor Vincent Mboniswa | Gospel Artist & Pastor',
    description:
      'Experience the power of worship through anointed gospel music, powerful sermons, and transformative ministry.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pastor Vincent Mboniswa | Gospel Artist & Pastor',
    description:
      'Experience the power of worship through anointed gospel music, powerful sermons, and transformative ministry.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {/* Animated background orbs */}
        <div className="animated-orb animated-orb-1" />
        <div className="animated-orb animated-orb-2" />
        <div className="animated-orb animated-orb-3" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
