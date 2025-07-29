import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { useEffect, useState } from 'react';
import { Conference } from '@/types';
import { conferences } from '@/mocks/conferences';

export const [ConferenceContext, useConference] = createContextHook(() => {
  const [selectedConference, setSelectedConference] = useState<Conference | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSelectedConference = async () => {
      try {
        const storedConferenceId = await AsyncStorage.getItem('selectedConferenceId');
        if (storedConferenceId) {
          const conference = conferences.find(c => c.id === storedConferenceId);
          if (conference) {
            setSelectedConference(conference);
          }
        }
      } catch (err) {
        console.error('Error loading selected conference:', err);
        setError('Failed to load conference data');
      } finally {
        setIsLoading(false);
      }
    };

    loadSelectedConference();
  }, []);

  const selectConference = async (conference: Conference) => {
    try {
      setIsLoading(true);
      setError(null);
      
      await AsyncStorage.setItem('selectedConferenceId', conference.id);
      setSelectedConference(conference);
      return true;
    } catch (err) {
      console.error('Error selecting conference:', err);
      setError('Failed to select conference');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearSelectedConference = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem('selectedConferenceId');
      setSelectedConference(null);
    } catch (err) {
      console.error('Error clearing selected conference:', err);
      setError('Failed to clear selected conference');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    conferences,
    selectedConference,
    isLoading,
    error,
    selectConference,
    clearSelectedConference,
  };
});