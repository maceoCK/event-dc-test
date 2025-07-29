import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Calendar, Clock, MapPin } from 'lucide-react-native';
import { Event } from '@/types';
import Card from './Card';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

interface EventCardProps {
  event: Event;
  onPress: () => void;
  isInItinerary?: boolean;
  testID?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onPress,
  isInItinerary = false,
  testID,
}) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <Card 
      onPress={onPress} 
      style={styles.card}
      testID={testID}
    >
      {isInItinerary && (
        <View style={styles.itineraryBadge}>
          <Text style={styles.itineraryBadgeText}>In Itinerary</Text>
        </View>
      )}
      
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
        <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
        
        <View style={styles.infoContainer}>
          <Calendar size={16} color={Colors.textSecondary} />
          <Text style={styles.infoText}>{formatDate(event.startTime)}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Clock size={16} color={Colors.textSecondary} />
          <Text style={styles.infoText}>
            {formatTime(event.startTime)} - {formatTime(event.endTime)}
          </Text>
        </View>
        
        <View style={styles.infoContainer}>
          <MapPin size={16} color={Colors.textSecondary} />
          <Text style={styles.infoText} numberOfLines={1}>
            {event.location.name}
          </Text>
        </View>
        
        {event.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {event.tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    marginHorizontal: Layout.spacing.s,
    marginVertical: Layout.spacing.s,
    backgroundColor: Colors.card,
  },
  itineraryBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  itineraryBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: Layout.borderRadius.large,
    borderTopRightRadius: Layout.borderRadius.large,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: Colors.cardSecondary,
    borderTopLeftRadius: Layout.borderRadius.large,
    borderTopRightRadius: Layout.borderRadius.large,
  },
  content: {
    padding: Layout.spacing.m,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Layout.spacing.s,
    lineHeight: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: Layout.spacing.xs,
    fontWeight: '500',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Layout.spacing.s,
  },
  tag: {
    backgroundColor: Colors.cardSecondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tagText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});

export default EventCard;