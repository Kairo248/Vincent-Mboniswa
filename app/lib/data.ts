// This file is gitignored - your actual data goes here
// For CI/CD: Copy data.example.ts to data.ts before building
// Or use: cp app/lib/data.example.ts app/lib/data.ts

import { MusicTrack, Album, Sermon, Event, GalleryItem, Scripture, SocialLink } from '@/app/types';

export const musicTracks: MusicTrack[] = [
  {
    id: 'umi-nam',
    title: 'Umi Nam',
    album: 'Single',
    duration: '4:15',
    audioUrl: '/audio/umi-nam.mp3',
    coverImage: '/images/umi-nami.jpeg',
    releaseDate: '2025-08-18',
    featured: true,
    platforms: [
      { name: 'Spotify', url: 'https://open.spotify.com/track/3Hw6mfyKZbCeHVvxwQXw6m?si=c89158999e9b4c56' },
      { name: 'Apple Music', url: 'https://music.apple.com/us/song/umi-nami-engumthokozisi/1833488973' },
      { name: 'YouTube Music', url: 'https://youtu.be/0ZD0tv5ZfuU?si=ffXqBq5BDAy4GDic' },
    ],
  },
];

export const albums: Album[] = [];

export const sermons: Sermon[] = [];

export const events: Event[] = [
  {
    id: '4',
    title: 'Men\'s conference',
    date: '2026-04-27',
    time: '6:00 PM',
    location: 'Youth Hall',
    venue: 'Grace Community Church',
    description: 'Empowering the next generation through worship and the Word.',
    type: 'ministry',
    image: '/images/h&m-replacement.jpeg',
  },
  {
    id: '5',
    title: 'Hymns and Melodies Volume 3 Launch',
    date: '2026-07-04',
    time: '6:00 PM',
    location: 'Khayelitsha',
    venue: 'Khayelitsha',
    description: 'Empowering the next generation through worship and the Word.',
    type: 'concert',
    image: '/images/h&m3-coming-soon.jpeg',
    ticketUrl: 'https://www.webtickets.co.za/v2/event.aspx?itemid=1586190384',
  },  
  {
    id: '6',
    title: 'Night of Glory',
    date: '2026-02-15',
    time: '6:00 PM',
    location: 'Youth Hall',
    venue: 'Grace Community Church',
    description: 'Empowering the next generation through worship and the Word.',
    type: 'ministry',
    image: '/images/nog.jpg',
  },
];

export const galleryItems: GalleryItem[] = [];

export const scriptures: Scripture[] = [
  {
    verse: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.',
    reference: 'Jeremiah 29:11',
  },
  {
    verse: 'I can do all things through Christ who strengthens me.',
    reference: 'Philippians 4:13',
  },
  {
    verse: 'Trust in the Lord with all your heart and lean not on your own understanding.',
    reference: 'Proverbs 3:5',
  },
];

export const socialLinks: SocialLink[] = [
  { platform: 'Facebook', url: 'https://www.facebook.com/vincentvuyile.mboniswa', icon: 'facebook' },
  { platform: 'Instagram', url: 'https://www.instagram.com/vincentm2591/', icon: 'instagram' },
  { platform: 'YouTube', url: 'https://www.youtube.com/channel/UCFJkyuDyyPcZ6n42B5Segjg', icon: 'youtube' },
  { platform: 'TikTok', url: 'https://www.tiktok.com/@pastorvmboniswa', icon: 'tiktok' },
];

export const sermonTopics = ['All', 'Faith', 'Prayer', 'Purpose', 'Encouragement', 'Worship'];
