import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut, Calendar, Settings, ChevronRight } from 'lucide-react-native';
import { useAuth } from '@/hooks/auth-store';
import { useConference } from '@/hooks/conference-store';
import { useItinerary } from '@/hooks/itinerary-store';
import EventCard from '@/components/ui/EventCard';
import EmptyState from '@/components/ui/EmptyState';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { selectedConference, clearSelectedConference } = useConference();
  const { itineraryEvents, isInItinerary } = useItinerary();

  const navigateToEventDetails = (eventId: string) => {
    router.push(`/event/${eventId}`);
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace('/auth');
  };

  const handleChangeConference = async () => {
    await clearSelectedConference();
    router.replace('/conferences');
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.name.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conference</Text>
          <View style={styles.conferenceCard}>
            {selectedConference?.imageURL && (
              <Image 
                source={{ uri: selectedConference.imageURL }} 
                style={styles.conferenceImage}
                resizeMode="cover"
              />
            )}
            
            <View style={styles.conferenceInfo}>
              <Text style={styles.conferenceName}>{selectedConference?.name}</Text>
              <Text style={styles.conferenceLocation}>{selectedConference?.location}</Text>
              
              <TouchableOpacity 
                style={styles.changeButton}
                onPress={handleChangeConference}
              >
                <Text style={styles.changeButtonText}>Change Conference</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Itinerary</Text>
            <Calendar size={20} color={Colors.textSecondary} />
          </View>
          
          {itineraryEvents.length > 0 ? (
            <FlatList
              data={itineraryEvents}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <EventCard
                  event={item}
                  onPress={() => navigateToEventDetails(item.id)}
                  isInItinerary={isInItinerary(item.id)}
                  testID={`itinerary-event-${item.id}`}
                />
              )}
              scrollEnabled={false}
              testID="itinerary-list"
            />
          ) : (
            <EmptyState
              title="No Events in Itinerary"
              message="You haven't added any events to your itinerary yet. Browse events and add them to your schedule."
              buttonTitle="Browse Events"
              onButtonPress={() => router.push('/(tabs)/')}
              testID="empty-itinerary"
            />
          )}
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <Settings size={20} color={Colors.textSecondary} />
          </View>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={handleSignOut}
            testID="sign-out-button"
          >
            <View style={styles.settingItemContent}>
              <LogOut size={20} color={Colors.error} />
              <Text style={[styles.settingItemText, styles.signOutText]}>Sign Out</Text>
            </View>
            <ChevronRight size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
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
  scrollContent: {
    padding: Layout.spacing.l,
    paddingBottom: Layout.spacing.xxl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.m,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Layout.spacing.xs,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: Layout.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.m,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.m,
  },
  conferenceCard: {
    backgroundColor: Colors.card,
    borderRadius: Layout.borderRadius.medium,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  conferenceImage: {
    width: '100%',
    height: 120,
  },
  conferenceInfo: {
    padding: Layout.spacing.m,
  },
  conferenceName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.xs,
  },
  conferenceLocation: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.m,
  },
  changeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    alignSelf: 'flex-start',
  },
  changeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    padding: Layout.spacing.m,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.s,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemText: {
    fontSize: 16,
    marginLeft: Layout.spacing.m,
    color: Colors.text,
  },
  signOutText: {
    color: Colors.error,
  },
});