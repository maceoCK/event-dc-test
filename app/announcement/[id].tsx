import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  Share,
  TouchableOpacity
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Clock, AlertCircle, Share as ShareIcon } from 'lucide-react-native';
import { announcements } from '@/mocks/announcements';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

export default function AnnouncementDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const announcement = announcements.find(a => a.id === id);
  
  if (!announcement) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Announcement not found</Text>
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

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${announcement.title}\n\n${announcement.content}`,
        title: 'Conference Announcement',
      });
    } catch (error) {
      console.error('Error sharing announcement:', error);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(announcement.priority) }]}>
          <AlertCircle size={16} color="#fff" />
          <Text style={styles.priorityText}>
            {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)} Priority
          </Text>
        </View>
        
        <View style={styles.timeContainer}>
          <Clock size={16} color={Colors.textSecondary} />
          <Text style={styles.timeText}>
            {formatDate(announcement.timestamp)} at {formatTime(announcement.timestamp)}
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
        
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <ShareIcon size={20} color="#fff" />
          <Text style={styles.shareButtonText}>Share Announcement</Text>
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
    paddingBottom: Layout.spacing.xxl,
  },
  header: {
    padding: Layout.spacing.l,
    paddingBottom: 0,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: Layout.spacing.s,
  },
  priorityText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  timeText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: Layout.spacing.m,
  },
  content: {
    padding: Layout.spacing.l,
    paddingTop: announcement => announcement.imageURL ? 0 : Layout.spacing.l,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Layout.spacing.m,
  },
  contentText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: Layout.spacing.l,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    marginTop: Layout.spacing.m,
  },
  shareButtonText: {
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
});