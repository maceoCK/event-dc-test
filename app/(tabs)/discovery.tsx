import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Store, MessageSquare } from 'lucide-react-native';
import { locations } from '@/mocks/locations';
import { businesses } from '@/mocks/businesses';
import { socialPosts } from '@/mocks/socialPosts';
import LocationCard from '@/components/ui/LocationCard';
import BusinessCard from '@/components/ui/BusinessCard';
import SocialPostCard from '@/components/ui/SocialPostCard';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

export default function DiscoveryScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'locations' | 'businesses' | 'social'>('locations');

  const navigateToLocationDetails = (locationId: string) => {
    router.push(`../location/${locationId}`);
  };

  const navigateToBusinessDetails = (businessId: string) => {
    router.push(`../business/${businessId}`);
  };

  const navigateToSocialPostDetails = (postId: string) => {
    router.push(`../social/${postId}`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'locations':
        return (
          <FlatList
            data={locations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <LocationCard
                location={item}
                onPress={() => navigateToLocationDetails(item.id)}
                testID={`location-${item.id}`}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            testID="locations-list"
          />
        );
      case 'businesses':
        return (
          <FlatList
            data={businesses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BusinessCard
                business={item}
                onPress={() => navigateToBusinessDetails(item.id)}
                testID={`business-${item.id}`}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            testID="businesses-list"
          />
        );
      case 'social':
        return (
          <FlatList
            data={socialPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SocialPostCard
                post={item}
                onPress={() => navigateToSocialPostDetails(item.id)}
                testID={`social-${item.id}`}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            testID="social-list"
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discovery</Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'locations' && styles.activeTab
            ]}
            onPress={() => setActiveTab('locations')}
            testID="locations-tab"
          >
            <MapPin 
              size={20} 
              color={activeTab === 'locations' ? '#fff' : Colors.textSecondary} 
            />
            <Text 
              style={[
                styles.tabText,
                activeTab === 'locations' && styles.activeTabText
              ]}
            >
              Locations & Booths
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'businesses' && styles.activeTab
            ]}
            onPress={() => setActiveTab('businesses')}
            testID="businesses-tab"
          >
            <Store 
              size={20} 
              color={activeTab === 'businesses' ? '#fff' : Colors.textSecondary} 
            />
            <Text 
              style={[
                styles.tabText,
                activeTab === 'businesses' && styles.activeTabText
              ]}
            >
              Local Businesses
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'social' && styles.activeTab
            ]}
            onPress={() => setActiveTab('social')}
            testID="social-tab"
          >
            <MessageSquare 
              size={20} 
              color={activeTab === 'social' ? '#fff' : Colors.textSecondary} 
            />
            <Text 
              style={[
                styles.tabText,
                activeTab === 'social' && styles.activeTabText
              ]}
            >
              Social Feed
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      {renderTabContent()}
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
    paddingTop: Layout.spacing.m,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: Layout.spacing.m,
    letterSpacing: -0.5,
  },
  tabsContainer: {
    paddingBottom: Layout.spacing.m,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: Layout.spacing.m,
    borderRadius: Layout.borderRadius.large,
    backgroundColor: Colors.cardSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeTab: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginLeft: Layout.spacing.xs,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '700',
  },
  listContent: {
    padding: Layout.spacing.s,
    paddingBottom: Layout.spacing.xl,
  },
});