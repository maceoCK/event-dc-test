import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut } from 'lucide-react-native';
import { useAuth } from '@/hooks/auth-store';
import { useConference } from '@/hooks/conference-store';
import ConferenceCard from '@/components/ui/ConferenceCard';
import EmptyState from '@/components/ui/EmptyState';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

export default function ConferencesScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { conferences, selectConference, isLoading } = useConference();

  const handleSelectConference = async (conferenceId: string) => {
    const conference = conferences.find(c => c.id === conferenceId);
    if (conference) {
      const success = await selectConference(conference);
      if (success) {
        router.replace('/(tabs)');
      }
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace('/auth');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select a Conference</Text>
        <TouchableOpacity 
          onPress={handleSignOut}
          style={styles.signOutButton}
          testID="sign-out-button"
        >
          <LogOut size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      {conferences.length === 0 ? (
        <EmptyState
          title="No Conferences Available"
          message="There are no conferences available at this time. Please check back later."
          testID="empty-conferences"
        />
      ) : (
        <FlatList
          data={conferences}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ConferenceCard
              conference={item}
              onPress={() => handleSelectConference(item.id)}
              testID={`conference-${item.id}`}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          testID="conferences-list"
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  signOutButton: {
    padding: Layout.spacing.xs,
  },
  listContent: {
    padding: Layout.spacing.s,
  },
});