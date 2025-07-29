import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import { announcements } from '@/mocks/announcements';
import AnnouncementCard from '@/components/ui/AnnouncementCard';
import EmptyState from '@/components/ui/EmptyState';
import { Bell } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

export default function NotificationsScreen() {
  const router = useRouter();

  const navigateToAnnouncementDetails = (announcementId: string) => {
    router.push(`/announcement/${announcementId}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Announcements</Text>
      </View>
      
      {announcements.length > 0 ? (
        <FlatList
          data={announcements}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AnnouncementCard
              announcement={item}
              onPress={() => navigateToAnnouncementDetails(item.id)}
              testID={`announcement-${item.id}`}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          testID="announcements-list"
        />
      ) : (
        <EmptyState
          icon={<Bell size={48} color={Colors.textSecondary} />}
          title="No Announcements"
          message="There are no announcements at this time. Check back later for updates."
          testID="empty-announcements"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Layout.spacing.s,
  },
  listContent: {
    padding: Layout.spacing.s,
    paddingBottom: Layout.spacing.xl,
  },
});