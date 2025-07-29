import { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/auth-store';
import { useConference } from '@/hooks/conference-store';
import Colors from '@/constants/colors';

export default function IndexScreen() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { selectedConference, isLoading: conferenceLoading } = useConference();
  
  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      // Add a small delay to ensure context providers are fully initialized
      await new Promise(resolve => setTimeout(resolve, 100));
      
      if (!authLoading && !conferenceLoading) {
        if (!user) {
          // User is not authenticated, redirect to auth screen
          router.replace('/auth');
        } else if (!selectedConference) {
          // User is authenticated but hasn't selected a conference
          router.replace('/conferences');
        } else {
          // User is authenticated and has selected a conference
          router.replace('/(tabs)');
        }
      }
    };
    
    checkAuthAndRedirect();
  }, [user, selectedConference, authLoading, conferenceLoading, router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
});