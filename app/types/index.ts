export interface MusicPlatform {
  name: string;
  url: string;
  icon?: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  album?: string;
  duration: string;
  audioUrl: string;
  coverImage?: string;
  releaseDate?: string;
  featured?: boolean;
  platforms?: MusicPlatform[];
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  releaseDate: string;
  tracks: MusicTrack[];
  description?: string;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  videoUrl: string;
  thumbnail: string;
  topic: string;
  description?: string;
  duration?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  description?: string;
  image?: string;
  type: 'worship' | 'conference' | 'ministry' | 'concert';
  ticketUrl?: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  title?: string;
  description?: string;
  category?: string;
}

export interface Scripture {
  verse: string;
  reference: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

