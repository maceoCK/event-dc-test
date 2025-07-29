import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, Clock, MapPin, User, Tag, Plus, Check } from 'lucide-react-native';
import { events } from '@/mocks/events';
import { useItinerary } from '@/hooks/itinerary-store';
import { MiniCalendar } from '@/components/ui/MiniCalendar';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addToItinerary, removeFromItinerary, isInItinerary, isLoading } = useItinerary();
  
  const event = events.find(e => e.id === id);
  
  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Event not found</Text>
      </View>
    );
  }
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  };
  
  const handleItineraryToggle = async () => {
    if (isInItinerary(event.id)) {
      await removeFromItinerary(event.id);
    } else {
      await addToItinerary(event);
    }
  };
  
  const navigateToLocation = () => {
    router.push(`../location/${event.location.id}`);
  };
  
  const getEventTimePosition = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    const dayStart = 8; // 8 AM
    const dayEnd = 20; // 8 PM
    const totalHours = dayEnd - dayStart;
    
    const startHour = start.getHours() + start.getMinutes() / 60;
    const endHour = end.getHours() + end.getMinutes() / 60;
    
    const startPosition = Math.max(0, (startHour - dayStart) / totalHours * 100);
    const endPosition = Math.min(100, (endHour - dayStart) / totalHours * 100);
    const width = endPosition - startPosition;
    
    return {
      start: startPosition,
      width: Math.max(width, 2) // Minimum 2% width for visibility
    };
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {event.imageURL ? (
        <Image 
          source={{ uri: event.imageURL }} 
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <View style={styles.titleContent}>
            <Text style={styles.title}>{event.title}</Text>
          </View>
          <MiniCalendar date={event.startTime} />
        </View>
        
        <View style={styles.infoContainer}>
          <Calendar size={18} color={Colors.textSecondary} />
          <Text style={styles.infoText}>{formatDate(event.startTime)}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Clock size={18} color={Colors.textSecondary} />
          <Text style={styles.infoText}>
            {formatTime(event.startTime)} - {formatTime(event.endTime)}
          </Text>
        </View>
        
        {/* Intraday Timeline */}
        <View style={styles.timelineContainer}>
          <Text style={styles.timelineTitle}>Event Timeline</Text>
          <View style={styles.timeline}>
            <View style={styles.timelineTrack}>
              <View style={[
                styles.eventTimeBlock,
                {
                  left: `${getEventTimePosition(event.startTime, event.endTime).start}%`,
                  width: `${getEventTimePosition(event.startTime, event.endTime).width}%`,
                }
              ]} />
            </View>
            <View style={styles.timelineLabels}>
              <Text style={styles.timelineLabel}>8 AM</Text>
              <Text style={styles.timelineLabel}>12 PM</Text>
              <Text style={styles.timelineLabel}>4 PM</Text>
              <Text style={styles.timelineLabel}>8 PM</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.infoContainer}
          onPress={navigateToLocation}
        >
          <MapPin size={18} color={Colors.textSecondary} />
          <Text style={[styles.infoText, styles.locationText]}>
            {event.location.name}
            {event.location.floor ? ` • Floor ${event.location.floor}` : ''}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{event.description}</Text>
        
        {event.speakers.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Speakers</Text>
            {event.speakers.map((speaker) => (
              <View key={speaker.id} style={styles.speakerContainer}>
                {speaker.photoURL ? (
                  <Image 
                    source={{ uri: speaker.photoURL }} 
                    style={styles.speakerImage}
                  />
                ) : (
                  <View style={styles.speakerImagePlaceholder}>
                    <User size={24} color="#fff" />
                  </View>
                )}
                
                <View style={styles.speakerInfo}>
                  <Text style={styles.speakerName}>{speaker.name}</Text>
                  {speaker.position && speaker.company && (
                    <Text style={styles.speakerPosition}>
                      {speaker.position}, {speaker.company}
                    </Text>
                  )}
                  {speaker.bio && (
                    <Text style={styles.speakerBio} numberOfLines={3}>
                      {speaker.bio}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </>
        )}
        
        {event.tags.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Tags</Text>
            <View style={styles.tagsContainer}>
              {event.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Tag size={14} color={Colors.primaryDark} />
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.itineraryButton,
            isInItinerary(event.id) && styles.itineraryButtonActive
          ]}
          onPress={handleItineraryToggle}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : isInItinerary(event.id) ? (
            <>
              <Check size={20} color="#fff" />
              <Text style={styles.itineraryButtonText}>In Itinerary</Text>
            </>
          ) : (
            <>
              <Plus size={20} color="#fff" />
              <Text style={styles.itineraryButtonText}>Add to Itinerary</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingBottom: 100, // Extra space for the footer
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.m,
  },
  titleContent: {
    flex: 1,
    marginRight: Layout.spacing.m,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  infoText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginLeft: Layout.spacing.s,
  },
  locationText: {
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Layout.spacing.l,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.s,
    marginTop: Layout.spacing.m,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  speakerContainer: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.m,
    backgroundColor: Colors.card,
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  speakerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Layout.spacing.m,
  },
  speakerImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.m,
  },
  speakerInfo: {
    flex: 1,
  },
  speakerName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  speakerPosition: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  speakerBio: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 14,
    color: Colors.primaryDark,
    marginLeft: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    paddingVertical: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.l,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  itineraryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
  },
  itineraryButtonActive: {
    backgroundColor: Colors.success,
  },
  itineraryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: Layout.spacing.s,
  },
  errorText: {
    fontSize: 18,
    color: Colors.error,
    textAlign: 'center',
    marginTop: Layout.spacing.xl,
  },
  timelineContainer: {
    marginVertical: Layout.spacing.m,
    padding: Layout.spacing.m,
    backgroundColor: Colors.card,
    borderRadius: Layout.borderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.s,
  },
  timeline: {
    height: 40,
  },
  timelineTrack: {
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    position: 'relative',
    marginBottom: Layout.spacing.s,
  },
  eventTimeBlock: {
    position: 'absolute',
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 4,
    top: 0,
  },
  timelineLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  timelineLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});