import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ViewStyle 
} from 'react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

interface SegmentOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  style?: ViewStyle;
  testID?: string;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  selectedValue,
  onChange,
  style,
  testID,
}) => {
  return (
    <View style={[styles.container, style]} testID={testID}>
      {options.map((option) => {
        const isSelected = option.value === selectedValue;
        
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              isSelected && styles.selectedOption,
              { width: `${100 / options.length}%` }
            ]}
            onPress={() => onChange(option.value)}
            activeOpacity={0.7}
          >
            {option.icon && (
              <View style={styles.iconContainer}>
                {option.icon}
              </View>
            )}
            <Text
              style={[
                styles.optionText,
                isSelected && styles.selectedOptionText
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.cardSecondary,
    borderRadius: Layout.borderRadius.large,
    padding: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: Layout.borderRadius.medium,
  },
  selectedOption: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: '700',
  },
  iconContainer: {
    marginRight: 6,
  },
});

export default SegmentedControl;