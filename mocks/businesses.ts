import { Business } from '@/types';

export const businesses: Business[] = [
  {
    id: '1',
    name: 'Café Artisan',
    description: 'Specialty coffee shop with artisanal pastries and light lunch options.',
    category: 'Café',
    address: '123 Market St, San Francisco, CA',
    distance: 0.2,
    rating: 4.7,
    coordinates: {
      latitude: 37.7758,
      longitude: -122.4208,
    },
    imageURL: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2057&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Urban Bistro',
    description: 'Modern American cuisine with a focus on local, sustainable ingredients.',
    category: 'Restaurant',
    address: '456 Mission St, San Francisco, CA',
    distance: 0.4,
    rating: 4.5,
    coordinates: {
      latitude: 37.7762,
      longitude: -122.4210,
    },
    imageURL: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Tech Gadgets',
    description: 'The latest electronics, accessories, and tech merchandise.',
    category: 'Retail',
    address: '789 Howard St, San Francisco, CA',
    distance: 0.3,
    rating: 4.2,
    coordinates: {
      latitude: 37.7765,
      longitude: -122.4212,
    },
    imageURL: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=2021&auto=format&fit=crop',
  },
  {
    id: '4',
    name: 'Wellness Spa',
    description: 'Rejuvenate with massages, facials, and wellness treatments.',
    category: 'Wellness',
    address: '101 Folsom St, San Francisco, CA',
    distance: 0.6,
    rating: 4.8,
    coordinates: {
      latitude: 37.7768,
      longitude: -122.4214,
    },
    imageURL: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'City Books',
    description: 'Independent bookstore with a curated selection of titles and cozy reading areas.',
    category: 'Retail',
    address: '202 Bryant St, San Francisco, CA',
    distance: 0.5,
    rating: 4.6,
    coordinates: {
      latitude: 37.7771,
      longitude: -122.4216,
    },
    imageURL: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=2071&auto=format&fit=crop',
  },
];