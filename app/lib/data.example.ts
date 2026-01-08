import { MusicTrack, Album, Sermon, Event, GalleryItem, Scripture, SocialLink } from '@/app/types';

// Example data file - Copy this to data.ts and fill in your actual data
// This file is tracked in git as a reference

export const musicTracks: MusicTrack[] = [
  {
    id: 'example-track',
    title: 'Example Track',
    album: 'Single',
    duration: '3:45',
    audioUrl: '/audio/example.mp3',
    coverImage: '/images/example-cover.jpg',
    releaseDate: '2024-01-01',
    featured: false,
  },
];

export const albums: Album[] = [];

export const sermons: Sermon[] = [];

export const events: Event[] = [
  {
    id: '1',
    title: 'Example Event',
    date: '2024-12-31',
    time: '7:00 PM',
    location: 'Example Location',
    venue: 'Example Venue',
    description: 'Example event description',
    type: 'worship',
    image: '/images/example-event.jpg',
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
  { platform: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
  { platform: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
  { platform: 'YouTube', url: 'https://youtube.com', icon: 'youtube' },
];

export const sermonTopics = ['All', 'Faith', 'Prayer', 'Purpose', 'Encouragement', 'Worship'];

