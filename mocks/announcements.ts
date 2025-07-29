import { Announcement } from '@/types';

export const announcements: Announcement[] = [
  {
    id: '1',
    conferenceId: '1',
    title: 'Welcome to Tech Summit 2025!',
    content: 'We\'re excited to kick off our annual conference. Don\'t forget to download the mobile app for the latest updates and to build your personalized schedule.',
    timestamp: '2025-08-15T08:00:00',
    priority: 'high',
    imageURL: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2',
    conferenceId: '1',
    title: 'Schedule Change: AI Panel',
    content: 'The AI Panel Discussion has been moved from Workshop Room A to the Main Auditorium to accommodate increased interest. The time remains the same: 2:00 PM.',
    timestamp: '2025-08-15T10:15:00',
    priority: 'medium',
  },
  {
    id: '3',
    conferenceId: '1',
    title: 'Networking Reception Tonight',
    content: 'Join us for drinks and appetizers at the Grand Ballroom from 6:00 PM to 8:00 PM. This is a great opportunity to connect with speakers and fellow attendees.',
    timestamp: '2025-08-15T14:30:00',
    priority: 'medium',
    imageURL: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '4',
    conferenceId: '1',
    title: 'URGENT: Room Change for Workshop',
    content: 'Due to technical issues, the "Building Scalable Cloud Applications" workshop has been relocated to Workshop Room B. We apologize for any inconvenience.',
    timestamp: '2025-08-15T13:45:00',
    priority: 'high',
  },
  {
    id: '5',
    conferenceId: '1',
    title: 'Reminder: Feedback Survey',
    content: 'Please take a moment to complete our feedback survey. Your input helps us improve future events. Find the survey in the app or at your email.',
    timestamp: '2025-08-16T16:00:00',
    priority: 'low',
  },
];