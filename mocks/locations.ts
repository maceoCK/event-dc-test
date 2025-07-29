import { Location } from '@/types';

export const locations: Location[] = [
  {
    id: 'loc1',
    name: 'Main Auditorium',
    description: 'Our largest venue for keynotes and major presentations.',
    floor: 1,
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
    imageURL: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'loc2',
    name: 'Workshop Room A',
    description: 'Interactive workshop space with flexible seating.',
    floor: 2,
    coordinates: {
      latitude: 37.7750,
      longitude: -122.4195,
    },
    imageURL: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'loc3',
    name: 'Tech Lab',
    description: 'Hands-on demonstration area with the latest technology.',
    floor: 1,
    coordinates: {
      latitude: 37.7751,
      longitude: -122.4196,
    },
    imageURL: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'loc4',
    name: 'Design Studio',
    description: 'Creative space for design workshops and collaboration.',
    floor: 3,
    coordinates: {
      latitude: 37.7752,
      longitude: -122.4197,
    },
    imageURL: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'loc5',
    name: 'Grand Ballroom',
    description: 'Elegant space for receptions and networking events.',
    floor: 1,
    coordinates: {
      latitude: 37.7753,
      longitude: -122.4198,
    },
    imageURL: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
  },
  {
    id: 'loc6',
    name: 'Expo Hall',
    description: 'Large exhibition space featuring sponsor booths and demos.',
    floor: 1,
    boothNumber: 'Hall A',
    coordinates: {
      latitude: 37.7754,
      longitude: -122.4199,
    },
    imageURL: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'loc7',
    name: 'TechCorp Booth',
    description: 'Visit us to learn about our latest AI solutions.',
    floor: 1,
    boothNumber: 'B42',
    coordinates: {
      latitude: 37.7755,
      longitude: -122.4200,
    },
    imageURL: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?q=80&w=2070&auto=format&fit=crop',
  },
];