import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Linking,
  Share
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Clock, Heart, MessageCircle, Twitter, Instagram, Linkedin, Share as ShareIcon } from 'lucide-react-native';
import { socialPosts } from '@/mocks/socialPosts';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

export default function SocialPostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const post = socialPosts.find(p => p.id === id);
  
  if (!post) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Social post not found</Text>
      </View>
    );
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString([], { 
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPlatformIcon = (platform: 'twitter' | 'instagram' | 'linkedin') => {
    switch (platform) {
      case 'twitter':
        return <Twitter size={20} color="#1DA1F2" />;
      case 'instagram':
        return <Instagram size={20} color="#E1306C" />;
      case 'linkedin':
        return <Linkedin size={20} color="#0077B5" />;
    }
  };

  const getPlatformName = (platform: 'twitter' | 'instagram' | 'linkedin') => {
    switch (platform) {
      case 'twitter':
        return 'Twitter';
      case 'instagram':
        return 'Instagram';
      case 'linkedin':
        return 'LinkedIn';
    }
  };

  const openOriginalPost = () => {
    // In a real app, this would link to the actual post
    const url = `https://${post.platform}.com/${post.authorHandle}`;
    Linking.openURL(url).catch(err => 
      console.error('An error occurred opening the link:', err)
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${post.content}\n\nPosted by ${post.author} on ${getPlatformName(post.platform)}`,
        title: 'Conference Social Post',
      });
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.authorContainer}>
          {getPlatformIcon(post.platform)}
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{post.author}</Text>
            <Text style={styles.authorHandle}>{post.authorHandle}</Text>
          </View>
        </View>
        
        <View style={styles.timeContainer}>
          <Clock size={16} color={Colors.textSecondary} />
          <Text style={styles.timeText}>{formatTime(post.timestamp)}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.postContent}>{post.content}</Text>
        
        {post.imageURL && (
          <Image 
            source={{ uri: post.imageURL }} 
            style={styles.image}
            resizeMode="cover"
          />
        )}
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Heart size={20} color={Colors.secondary} />
            <Text style={styles.statText}>{post.likes} Likes</Text>
          </View>
          
          <View style={styles.statItem}>
            <MessageCircle size={20} color={Colors.textSecondary} />
            <Text style={styles.statText}>{post.comments} Comments</Text>
          </View>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={openOriginalPost}
          >
            <Text style={styles.buttonText}>View Original Post</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.shareButton]}
            onPress={handleShare}
          >
            <ShareIcon size={20} color="#fff" />
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  authorInfo: {
    marginLeft: Layout.spacing.s,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  authorHandle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
  content: {
    padding: Layout.spacing.l,
  },
  postContent: {
    fontSize: 18,
    color: Colors.text,
    lineHeight: 26,
    marginBottom: Layout.spacing.l,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.l,
  },
  statsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Layout.spacing.m,
    marginBottom: Layout.spacing.l,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.l,
  },
  statText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginLeft: Layout.spacing.xs,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 3,
    paddingVertical: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.s,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: Layout.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.s,
  },
  buttonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    marginRight: 0,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: Layout.spacing.xs,
  },
  errorText: {
    fontSize: 18,
    color: Colors.error,
    textAlign: 'center',
    marginTop: Layout.spacing.xl,
  },
});