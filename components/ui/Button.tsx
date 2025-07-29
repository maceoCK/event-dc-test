import React from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  testID,
  ...rest
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = styles.button;
    
    // Variant styles
    let variantStyle: ViewStyle = {};
    switch (variant) {
      case 'primary':
        variantStyle = styles.primaryButton;
        break;
      case 'secondary':
        variantStyle = styles.secondaryButton;
        break;
      case 'outline':
        variantStyle = styles.outlineButton;
        break;
      case 'text':
        variantStyle = styles.textButton;
        break;
    }
    
    // Size styles
    let sizeStyle: ViewStyle = {};
    switch (size) {
      case 'small':
        sizeStyle = styles.smallButton;
        break;
      case 'medium':
        sizeStyle = styles.mediumButton;
        break;
      case 'large':
        sizeStyle = styles.largeButton;
        break;
    }
    
    // Disabled style
    const disabledStyle: ViewStyle = (disabled || isLoading) ? styles.disabledButton : {};
    
    return { ...baseStyle, ...variantStyle, ...sizeStyle, ...disabledStyle, ...style };
  };
  
  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = styles.buttonText;
    
    // Variant text styles
    let variantTextStyle: TextStyle = {};
    switch (variant) {
      case 'primary':
        variantTextStyle = styles.primaryButtonText;
        break;
      case 'secondary':
        variantTextStyle = styles.secondaryButtonText;
        break;
      case 'outline':
        variantTextStyle = styles.outlineButtonText;
        break;
      case 'text':
        variantTextStyle = styles.textButtonText;
        break;
    }
    
    // Size text styles
    let sizeTextStyle: TextStyle = {};
    switch (size) {
      case 'small':
        sizeTextStyle = styles.smallButtonText;
        break;
      case 'medium':
        sizeTextStyle = styles.mediumButtonText;
        break;
      case 'large':
        sizeTextStyle = styles.largeButtonText;
        break;
    }
    
    // Disabled text style
    const disabledTextStyle: TextStyle = (disabled || isLoading) ? styles.disabledButtonText : {};
    
    return { ...baseStyle, ...variantTextStyle, ...sizeTextStyle, ...disabledTextStyle, ...textStyle };
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      style={getButtonStyle()}
      testID={testID}
      activeOpacity={0.7}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'text' ? Colors.primary : '#fff'} 
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: Layout.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textButton: {
    backgroundColor: 'transparent',
  },
  smallButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  mediumButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  largeButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#fff',
  },
  outlineButtonText: {
    color: Colors.text,
  },
  textButtonText: {
    color: Colors.primary,
  },
  smallButtonText: {
    fontSize: 14,
  },
  mediumButtonText: {
    fontSize: 16,
  },
  largeButtonText: {
    fontSize: 18,
  },
  disabledButtonText: {
    opacity: 0.8,
  },
});

export default Button;