import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Linking,
  Platform
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MapPin, Star, ExternalLink, Navigation } from 'lucide-react-native';
import { businesses } from '@/mocks/businesses';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

export default function BusinessDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const business = businesses.find(b => b.id === id);
  
  if (!business) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Business not found</Text>
      </View>
    );
  }

  const openMaps = () => {
    const { coordinates, name, address } = business;
    const location = `${coordinates.latitude},${coordinates.longitude}`;
    const label = encodeURIComponent(name);
    const url = Platform.select({
      ios: `maps:?q=${label}&ll=${location}`,
      android: `geo:${location}?q=${location}(${label})`,
      web: `https://www.google.com/maps/search/?api=1&query=${location}`
    });
    
    if (url) {
      Linking.openURL(url).catch(err => 
        console.error('An error occurred opening maps:', err)
      );
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {business.imageURL ? (
        <Image 
          source={{ uri: business.imageURL }} 
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{business.name}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{business.category}</Text>
          </View>
        </View>
        
        <View style={styles.infoRow}>
          <View style={styles.infoContainer}>
            <MapPin size={18} color={Colors.textSecondary} />
            <Text style={styles.infoText}>{business.distance} mi</Text>
          </View>
          
          {business.rating && (
            <View style={styles.infoContainer}>
              <Star size={18} color={Colors.warning} fill={Colors.warning} />
              <Text style={styles.infoText}>{business.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.address}>{business.address}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{business.description}</Text>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={openMaps}
          >
            <Navigation size={20} color="#fff" />
            <Text style={styles.buttonText}>Directions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={() => Linking.openURL(`https://www.google.com/search?q=${encodeURIComponent(business.name + ' ' + business.address)}`)}
          >
            <ExternalLink size={20} color="#fff" />
            <Text style={styles.buttonText}>More Info</Text>
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
  image: {
    width: '100%',
    height: 250,
  },
  imagePlaceholder: {
    width: '100%',
    height: 250,
    backgroundColor: Colors.border,
  },
  content: {
    padding: Layout.spacing.l,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
    marginRight: Layout.spacing.s,
  },
  categoryBadge: {
    backgroundColor: Colors.secondaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.secondaryDark,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.s,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.l,
  },
  infoText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginLeft: Layout.spacing.s,
  },
  address: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: Layout.spacing.m,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Layout.spacing.l,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.s,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
    marginBottom: Layout.spacing.l,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Layout.spacing.m,
    paddingHorizontal: Layout.spacing.l,
    borderRadius: Layout.borderRadius.medium,
    flex: 1,
    marginRight: Layout.spacing.s,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
    marginRight: 0,
    marginLeft: Layout.spacing.s,
  },
  buttonText: {
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