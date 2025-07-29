import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, User } from 'lucide-react-native';
import { useAuth } from '@/hooks/auth-store';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Colors from '@/constants/colors';
import Layout from '@/constants/layout';

export default function AuthScreen() {
  const router = useRouter();
  const { signIn, signUp, isLoading, error } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

  const validateForm = () => {
    let isValid = true;
    
    // Reset errors
    setEmailError('');
    setPasswordError('');
    setNameError('');
    
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }
    
    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }
    
    // Validate name for sign up
    if (isSignUp && !name) {
      setNameError('Name is required');
      isValid = false;
    }
    
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      let success;
      
      if (isSignUp) {
        success = await signUp(email, password, name);
      } else {
        success = await signIn(email, password);
      }
      
      if (success) {
        router.replace('/conferences');
      }
    } catch (err) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setEmailError('');
    setPasswordError('');
    setNameError('');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop' }} 
            style={styles.logo}
          />
          <Text style={styles.title}>Event Attendee</Text>
          <Text style={styles.subtitle}>
            {isSignUp ? 'Create an account to get started' : 'Sign in to your account'}
          </Text>
        </View>
        
        <View style={styles.form}>
          {isSignUp && (
            <Input
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              error={nameError}
              leftIcon={<User size={20} color={Colors.textSecondary} />}
              autoCapitalize="words"
              testID="name-input"
            />
          )}
          
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            error={emailError}
            leftIcon={<Mail size={20} color={Colors.textSecondary} />}
            keyboardType="email-address"
            autoCapitalize="none"
            testID="email-input"
          />
          
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            error={passwordError}
            leftIcon={<Lock size={20} color={Colors.textSecondary} />}
            secureTextEntry
            testID="password-input"
          />
          
          {error && <Text style={styles.errorText}>{error}</Text>}
          
          <Button
            title={isSignUp ? 'Sign Up' : 'Sign In'}
            onPress={handleSubmit}
            isLoading={isLoading}
            style={styles.submitButton}
            testID="submit-button"
          />
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </Text>
          <TouchableOpacity onPress={toggleAuthMode} testID="toggle-auth-mode">
            <Text style={styles.footerLink}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Layout.spacing.l,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Layout.spacing.xl,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: Layout.spacing.m,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Layout.spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginBottom: Layout.spacing.xl,
  },
  errorText: {
    color: Colors.error,
    marginBottom: Layout.spacing.m,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: Layout.spacing.m,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: Colors.textSecondary,
    marginRight: Layout.spacing.xs,
  },
  footerLink: {
    color: Colors.primary,
    fontWeight: '600',
  },
});