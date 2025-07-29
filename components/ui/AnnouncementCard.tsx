import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Clock, AlertCircle } from 'lucide-react-native';
import { Announcement } from '@/types';
import Card from './Card';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

interface AnnouncementCardProps {
  announcement: Announcement;
  onPress: () => void;
  testID?: string;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement,
  onPress,
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

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return Colors.error;
      case 'medium':
        return Colors.warning;
      case 'low':
      default:
        return Colors.info;
    }
  };

  return (
    <Card 
      onPress={onPress} 
      style={styles.card}
      testID={testID}
    >
      <View style={styles.header}>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(announcement.priority) }]}>
          <AlertCircle size={14} color="#fff" />
          <Text style={styles.priorityText}>
            {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
          </Text>
        </View>
        
        <View style={styles.timeContainer}>
          <Clock size={14} color={Colors.textSecondary} />
          <Text style={styles.timeText}>
            {formatDate(announcement.timestamp)} {formatTime(announcement.timestamp)}
          </Text>
        </View>
      </View>
      
      {announcement.imageURL && (
        <Image 
          source={{ uri: announcement.imageURL }} 
          style={styles.image}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.content}>
        <Text style={styles.title}>{announcement.title}</Text>
        <Text style={styles.contentText}>{announcement.content}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Layout.spacing.s,
    marginVertical: Layout.spacing.s,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    marginLeft: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: Layout.borderRadius.small,
    marginBottom: Layout.spacing.s,
  },
  content: {},
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.xs,
  },
  contentText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default AnnouncementCard;