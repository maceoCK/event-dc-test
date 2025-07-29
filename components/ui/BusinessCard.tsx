import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';
import { Business } from '@/types';
import Card from './Card';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

interface BusinessCardProps {
  business: Business;
  onPress: () => void;
  testID?: string;
}

const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  onPress,
  testID,
}) => {
  return (
    <Card 
      onPress={onPress} 
      style={styles.card}
      testID={testID}
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
          <Text style={styles.title} numberOfLines={1}>{business.name}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{business.category}</Text>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {business.description}
        </Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoContainer}>
            <MapPin size={16} color={Colors.textSecondary} />
            <Text style={styles.infoText}>{business.distance} mi</Text>
          </View>
          
          {business.rating && (
            <View style={styles.infoContainer}>
              <Star size={16} color={Colors.warning} fill={Colors.warning} />
              <Text style={styles.infoText}>{business.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    marginHorizontal: Layout.spacing.s,
    marginVertical: Layout.spacing.s,
  },
  image: {
    width: '100%',
    height: 120,
  },
  imagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: Colors.border,
  },
  content: {
    padding: Layout.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    marginRight: Layout.spacing.xs,
  },
  categoryBadge: {
    backgroundColor: Colors.secondaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.secondaryDark,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.s,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: Layout.spacing.xs,
  },
});

export default BusinessCard;