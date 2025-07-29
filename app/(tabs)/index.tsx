import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { List, Map as MapIcon } from 'lucide-react-native';
import { useConference } from '@/hooks/conference-store';
import { useItinerary } from '@/hooks/itinerary-store';
import { events } from '@/mocks/events';
import EventCard from '@/components/ui/EventCard';
import SegmentedControl from '@/components/ui/SegmentedControl';
import EmptyState from '@/components/ui/EmptyState';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

export default function EventsScreen() {
  const router = useRouter();
  const { selectedConference } = useConference();
  const { isInItinerary } = useItinerary();
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filteredEvents, setFilteredEvents] = useState(events);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      if (selectedConference) {
        const conferenceEvents = events.filter(
          event => event.conferenceId === selectedConference.id
        );
        setFilteredEvents(conferenceEvents);
      }
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [selectedConference]);

  const navigateToEventDetails = (eventId: string) => {
    router.push(`../event/${eventId}`);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{selectedConference?.name}</Text>
        
        <SegmentedControl
          options={[
            { 
              label: 'List', 
              value: 'list',
              icon: <List size={16} color={viewMode === 'list' ? '#fff' : Colors.textSecondary} />
            },
            { 
              label: 'Map', 
              value: 'map',
              icon: <MapIcon size={16} color={viewMode === 'map' ? '#fff' : Colors.textSecondary} />
            },
          ]}
          selectedValue={viewMode}
          onChange={(value) => setViewMode(value as 'list' | 'map')}
          style={styles.viewToggle}
          testID="view-toggle"
        />
      </View>
      
      {viewMode === 'list' ? (
        filteredEvents.length > 0 ? (
          <FlatList
            data={filteredEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <EventCard
                event={item}
                onPress={() => navigateToEventDetails(item.id)}
                isInItinerary={isInItinerary(item.id)}
                testID={`event-${item.id}`}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            testID="events-list"
          />
        ) : (
          <EmptyState
            title="No Events Found"
            message="There are no events scheduled for this conference yet."
            testID="empty-events"
          />
        )
      ) : (
        <View style={styles.mapContainer}>
          <Text style={styles.mapPlaceholder}>
            Map view is not available in this preview.
            {Platform.OS === 'web' ? ' Map functionality works on mobile devices.' : ''}
          </Text>
          
          <TouchableOpacity
            style={styles.mapToggleButton}
            onPress={() => setViewMode('list')}
          >
            <Text style={styles.mapToggleButtonText}>Switch to List View</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Layout.spacing.m,
    letterSpacing: -0.5,
  },
  viewToggle: {
    marginBottom: Layout.spacing.s,
  },
  listContent: {
    padding: Layout.spacing.s,
    paddingBottom: Layout.spacing.xl,
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.l,
  },
  mapPlaceholder: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Layout.spacing.l,
  },
  mapToggleButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.medium,
  },
  mapToggleButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});