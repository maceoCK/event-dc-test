import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { useEffect, useState } from 'react';
import { Event } from '@/types';
import { useConference } from './conference-store';

export const [ItineraryContext, useItinerary] = createContextHook(() => {
  const { selectedConference } = useConference();
  const [itineraryEvents, setItineraryEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItinerary = async () => {
      if (!selectedConference) return;
      
      try {
        const key = `itinerary_${selectedConference.id}`;
        const storedItinerary = await AsyncStorage.getItem(key);
        
        if (storedItinerary) {
          setItineraryEvents(JSON.parse(storedItinerary));
        } else {
          setItineraryEvents([]);
        }
      } catch (err) {
        console.error('Error loading itinerary:', err);
        setError('Failed to load itinerary data');
      } finally {
        setIsLoading(false);
      }
    };

    loadItinerary();
  }, [selectedConference]);

  const saveItinerary = async (events: Event[]) => {
    if (!selectedConference) return false;
    
    try {
      const key = `itinerary_${selectedConference.id}`;
      await AsyncStorage.setItem(key, JSON.stringify(events));
      return true;
    } catch (err) {
      console.error('Error saving itinerary:', err);
      setError('Failed to save itinerary');
      return false;
    }
  };

  const addToItinerary = async (event: Event) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check if event is already in itinerary
      const exists = itineraryEvents.some(e => e.id === event.id);
      if (exists) {
        return true; // Already in itinerary
      }
      
      const updatedItinerary = [...itineraryEvents, event];
      setItineraryEvents(updatedItinerary);
      
      return await saveItinerary(updatedItinerary);
    } catch (err) {
      console.error('Error adding to itinerary:', err);
      setError('Failed to add event to itinerary');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromItinerary = async (eventId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const updatedItinerary = itineraryEvents.filter(e => e.id !== eventId);
      setItineraryEvents(updatedItinerary);
      
      return await saveItinerary(updatedItinerary);
    } catch (err) {
      console.error('Error removing from itinerary:', err);
      setError('Failed to remove event from itinerary');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const isInItinerary = (eventId: string): boolean => {
    return itineraryEvents.some(e => e.id === eventId);
  };

  return {
    itineraryEvents,
    isLoading,
    error,
    addToItinerary,
    removeFromItinerary,
    isInItinerary,
  };
});