import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MapPin, Building } from 'lucide-react-native';
import { Location } from '@/types';
import Card from './Card';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

interface LocationCardProps {
  location: Location;
  onPress: () => void;
  testID?: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onPress,
  testID,
}) => {
  return (
    <Card 
      onPress={onPress} 
      style={styles.card}
      testID={testID}
    >
      {location.imageURL ? (
        <Image 
          source={{ uri: location.imageURL }} 
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{location.name}</Text>
        
        {location.description && (
          <Text style={styles.description} numberOfLines={2}>
            {location.description}
          </Text>
        )}
        
        <View style={styles.infoRow}>
          {location.floor !== undefined && (
            <View style={styles.infoContainer}>
              <Building size={16} color={Colors.textSecondary} />
              <Text style={styles.infoText}>Floor {location.floor}</Text>
            </View>
          )}
          
          {location.boothNumber && (
            <View style={styles.infoContainer}>
              <MapPin size={16} color={Colors.textSecondary} />
              <Text style={styles.infoText}>Booth {location.boothNumber}</Text>
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Layout.spacing.xs,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Layout.spacing.s,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Layout.spacing.m,
    marginTop: Layout.spacing.xs,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: Layout.spacing.xs,
  },
});

export default LocationCard;