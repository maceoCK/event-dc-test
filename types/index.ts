export interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
}

export interface Conference {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  imageURL: string;
}

export interface Event {
  id: string;
  conferenceId: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: Location;
  speakers: Speaker[];
  tags: string[];
  imageURL?: string;
}

export interface Location {
  id: string;
  name: string;
  description?: string;
  floor?: number;
  boothNumber?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  imageURL?: string;
}

export interface Speaker {
  id: string;
  name: string;
  bio?: string;
  company?: string;
  position?: string;
  photoURL?: string;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  distance?: number;
  rating?: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  imageURL: string;
}

export interface Announcement {
  id: string;
  conferenceId: string;
  title: string;
  content: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high';
  imageURL?: string;
}

export interface SocialPost {
  id: string;
  conferenceId: string;
  platform: 'twitter' | 'instagram' | 'linkedin';
  author: string;
  authorHandle: string;
  content: string;
  timestamp: string;
  imageURL?: string;
  likes: number;
  comments: number;
}