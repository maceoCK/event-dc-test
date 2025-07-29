import React from 'react';
import { 
  StyleSheet, 
  View, 
  ViewStyle, 
  TouchableOpacity, 
  TouchableOpacityProps 
} from 'react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

interface CardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  testID?: string;
  elevation?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  testID,
  elevation = 2,
  ...rest
}) => {
  const cardStyle = [
    styles.card, 
    { 
      shadowOpacity: 0.1 * elevation,
      elevation: elevation,
    },
    style
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.7}
        testID={testID}
        {...rest}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle} testID={testID}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Layout.borderRadius.large,
    padding: Layout.spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginVertical: Layout.spacing.s,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
});

export default Card;