import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';
import Button from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  buttonTitle,
  onButtonPress,
  style,
  testID,
}) => {
  return (
    <View style={[styles.container, style]} testID={testID}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      
      {buttonTitle && onButtonPress && (
        <Button
          title={buttonTitle}
          onPress={onButtonPress}
          variant="primary"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
  },
  iconContainer: {
    marginBottom: Layout.spacing.m,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Layout.spacing.s,
  },
  message: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Layout.spacing.l,
    lineHeight: 22,
  },
  button: {
    minWidth: 150,
  },
});

export default EmptyState;