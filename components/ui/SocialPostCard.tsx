import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Clock, Heart, MessageCircle, Twitter, Instagram, Linkedin } from 'lucide-react-native';
import { SocialPost } from '@/types';
import Card from './Card';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

interface SocialPostCardProps {
  post: SocialPost;
  onPress: () => void;
  testID?: string;
}

const SocialPostCard: React.FC<SocialPostCardProps> = ({
  post,
  onPress,
  testID,
}) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMins / 60);
    const diffDays = Math.round(diffHours / 24);
    
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };

  const getPlatformIcon = (platform: 'twitter' | 'instagram' | 'linkedin') => {
    switch (platform) {
      case 'twitter':
        return <Twitter size={16} color="#1DA1F2" />;
      case 'instagram':
        return <Instagram size={16} color="#E1306C" />;
      case 'linkedin':
        return <Linkedin size={16} color="#0077B5" />;
    }
  };

  return (
    <Card 
      onPress={onPress} 
      style={styles.card}
      testID={testID}
    >
      <View style={styles.header}>
        <View style={styles.authorContainer}>
          {getPlatformIcon(post.platform)}
          <Text style={styles.authorName}>{post.author}</Text>
          <Text style={styles.authorHandle}>{post.authorHandle}</Text>
        </View>
        
        <View style={styles.timeContainer}>
          <Clock size={14} color={Colors.textSecondary} />
          <Text style={styles.timeText}>{formatTime(post.timestamp)}</Text>
        </View>
      </View>
      
      <Text style={styles.content}>{post.content}</Text>
      
      {post.imageURL && (
        <Image 
          source={{ uri: post.imageURL }} 
          style={styles.image}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Heart size={16} color={Colors.secondary} />
          <Text style={styles.statText}>{post.likes}</Text>
        </View>
        
        <View style={styles.statItem}>
          <MessageCircle size={16} color={Colors.textSecondary} />
          <Text style={styles.statText}>{post.comments}</Text>
        </View>
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
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 6,
  },
  authorHandle: {
    fontSize: 14,
    color: Colors.textSecondary,
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
  content: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: Layout.spacing.s,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: Layout.borderRadius.small,
    marginBottom: Layout.spacing.s,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: Layout.spacing.xs,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  statText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
});

export default SocialPostCard;