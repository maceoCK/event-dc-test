import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Calendar, MapPin } from 'lucide-react-native';
import { Conference } from '@/types';
import Card from './Card';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

interface ConferenceCardProps {
  conference: Conference;
  onPress: () => void;
  testID?: string;
}

const ConferenceCard: React.FC<ConferenceCardProps> = ({
  conference,
  onPress,
  testID,
}) => {
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startMonth = start.toLocaleString('default', { month: 'short' });
    const endMonth = end.toLocaleString('default', { month: 'short' });
    
    if (startMonth === endMonth) {
      return `${startMonth} ${start.getDate()} - ${end.getDate()}, ${end.getFullYear()}`;
    } else {
      return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}, ${end.getFullYear()}`;
    }
  };

  return (
    <Card 
      onPress={onPress} 
      style={styles.card}
      testID={testID}
    >
      {conference.imageURL ? (
        <Image 
          source={{ uri: conference.imageURL }} 
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      
      <View style={styles.content}>
        <Text style={styles.title}>{conference.name}</Text>
        
        <View style={styles.infoContainer}>
          <MapPin size={16} color={Colors.textSecondary} />
          <Text style={styles.infoText}>{conference.location}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Calendar size={16} color={Colors.textSecondary} />
          <Text style={styles.infoText}>
            {formatDateRange(conference.startDate, conference.endDate)}
          </Text>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {conference.description}
        </Text>
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
  },
  image: {
    width: '100%',
    height: 150,
  },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: Colors.border,
  },
  content: {
    padding: Layout.spacing.m,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.s,
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
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Layout.spacing.s,
    lineHeight: 20,
  },
});

export default ConferenceCard;