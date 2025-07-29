import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  FlatList,
  Platform
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { Building, MapPin, List, Map as MapIcon } from 'lucide-react-native';
import { locations } from '@/mocks/locations';
import { events } from '@/mocks/events';
import { useItinerary } from '@/hooks/itinerary-store';
import EventCard from '@/components/ui/EventCard';
import SegmentedControl from '@/components/ui/SegmentedControl';
import EmptyState from '@/components/ui/EmptyState';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

export default function LocationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isInItinerary } = useItinerary();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  
  const location = locations.find(l => l.id === id);
  const locationEvents = events.filter(e => e.location.id === id);
  
  if (!location) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Location not found</Text>
      </View>
    );
  }

  const navigateToEventDetails = (eventId: string) => {
    router.push(`../event/${eventId}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {location.imageURL ? (
          <Image 
            source={{ uri: location.imageURL }} 
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
        
        <View style={styles.content}>
          <Text style={styles.title}>{location.name}</Text>
          
          <View style={styles.infoRow}>
            {location.floor !== undefined && (
              <View style={styles.infoContainer}>
                <Building size={18} color={Colors.textSecondary} />
                <Text style={styles.infoText}>Floor {location.floor}</Text>
              </View>
            )}
            
            {location.boothNumber && (
              <View style={styles.infoContainer}>
                <MapPin size={18} color={Colors.textSecondary} />
                <Text style={styles.infoText}>Booth {location.boothNumber}</Text>
              </View>
            )}
          </View>
          
          {location.description && (
            <>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{location.description}</Text>
            </>
          )}
          
          <View style={styles.divider} />
          
          <View style={styles.eventsHeader}>
            <Text style={styles.sectionTitle}>Events at this Location</Text>
            
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
            locationEvents.length > 0 ? (
              <FlatList
                data={locationEvents}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <EventCard
                    event={item}
                    onPress={() => navigateToEventDetails(item.id)}
                    isInItinerary={isInItinerary(item.id)}
                    testID={`event-${item.id}`}
                  />
                )}
                scrollEnabled={false}
                testID="location-events-list"
              />
            ) : (
              <EmptyState
                title="No Events Scheduled"
                message="There are no events scheduled at this location yet."
                testID="empty-location-events"
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Layout.spacing.xxl,
  },
  image: {
    width: '100%',
    height: 250,
  },
  imagePlaceholder: {
    width: '100%',
    height: 250,
    backgroundColor: Colors.border,
  },
  content: {
    padding: Layout.spacing.l,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Layout.spacing.m,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Layout.spacing.m,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.l,
    marginBottom: Layout.spacing.xs,
  },
  infoText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginLeft: Layout.spacing.s,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.s,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Layout.spacing.l,
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  viewToggle: {
    width: 150,
  },
  mapContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
    borderRadius: Layout.borderRadius.medium,
    padding: Layout.spacing.l,
    marginBottom: Layout.spacing.l,
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
  errorText: {
    fontSize: 18,
    color: Colors.error,
    textAlign: 'center',
    marginTop: Layout.spacing.xl,
  },
});