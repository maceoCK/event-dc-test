import { Event } from '@/types';

export const events: Event[] = [
  {
    id: '1',
    conferenceId: '1',
    title: 'Opening Keynote: The Future of AI',
    description: 'Join our CEO for an inspiring look at how artificial intelligence is transforming industries and what to expect in the coming years.',
    startTime: '2025-08-15T09:00:00',
    endTime: '2025-08-15T10:30:00',
    location: {
      id: 'loc1',
      name: 'Main Auditorium',
      floor: 1,
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
      imageURL: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop',
    },
    speakers: [
      {
        id: 'spk1',
        name: 'Sarah Johnson',
        bio: 'CEO of TechCorp with 15+ years of experience in AI and machine learning.',
        company: 'TechCorp',
        position: 'CEO',
        photoURL: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop',
      }
    ],
    tags: ['AI', 'Keynote', 'Future Tech'],
    imageURL: 'https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2',
    conferenceId: '1',
    title: 'Web3 and the Decentralized Future',
    description: 'Explore how blockchain technology and Web3 are creating new opportunities for businesses and developers.',
    startTime: '2025-08-15T11:00:00',
    endTime: '2025-08-15T12:30:00',
    location: {
      id: 'loc2',
      name: 'Workshop Room A',
      floor: 2,
      coordinates: {
        latitude: 37.7750,
        longitude: -122.4195,
      },
      imageURL: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
    },
    speakers: [
      {
        id: 'spk2',
        name: 'Michael Chen',
        bio: 'Blockchain expert and founder of DeFi Solutions.',
        company: 'DeFi Solutions',
        position: 'Founder',
        photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
      }
    ],
    tags: ['Blockchain', 'Web3', 'Workshop'],
    imageURL: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '3',
    conferenceId: '1',
    title: 'Building Scalable Cloud Applications',
    description: 'Learn best practices for designing and deploying applications that can scale to millions of users.',
    startTime: '2025-08-15T14:00:00',
    endTime: '2025-08-15T15:30:00',
    location: {
      id: 'loc3',
      name: 'Tech Lab',
      floor: 1,
      coordinates: {
        latitude: 37.7751,
        longitude: -122.4196,
      },
      imageURL: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
    },
    speakers: [
      {
        id: 'spk3',
        name: 'Emily Rodriguez',
        bio: 'Cloud architect with expertise in AWS and Azure.',
        company: 'CloudScale',
        position: 'Principal Architect',
        photoURL: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
      }
    ],
    tags: ['Cloud', 'Scalability', 'Architecture'],
    imageURL: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
  },
  {
    id: '4',
    conferenceId: '1',
    title: 'UX Design for Emerging Technologies',
    description: 'Discover how to create intuitive user experiences for AR, VR, and other emerging technologies.',
    startTime: '2025-08-16T09:00:00',
    endTime: '2025-08-16T10:30:00',
    location: {
      id: 'loc4',
      name: 'Design Studio',
      floor: 3,
      coordinates: {
        latitude: 37.7752,
        longitude: -122.4197,
      },
      imageURL: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
    },
    speakers: [
      {
        id: 'spk4',
        name: 'David Kim',
        bio: 'Award-winning UX designer specializing in immersive experiences.',
        company: 'Immerse Design',
        position: 'Creative Director',
        photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
      }
    ],
    tags: ['UX', 'Design', 'AR/VR'],
    imageURL: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
  },
  {
    id: '5',
    conferenceId: '1',
    title: 'Networking Reception',
    description: 'Join fellow attendees for drinks, appetizers, and networking opportunities.',
    startTime: '2025-08-16T18:00:00',
    endTime: '2025-08-16T20:00:00',
    location: {
      id: 'loc5',
      name: 'Grand Ballroom',
      floor: 1,
      coordinates: {
        latitude: 37.7753,
        longitude: -122.4198,
      },
      imageURL: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
    },
    speakers: [],
    tags: ['Networking', 'Social'],
    imageURL: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2070&auto=format&fit=crop',
  },
];