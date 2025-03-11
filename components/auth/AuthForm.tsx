import React, { useState } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, clearError } from '../../store/slices/authSlice';
import { RootState, AppDispatch } from '../../store';

interface AuthFormProps {
  isRegister?: boolean;
  onToggleMode?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isRegister = false, onToggleMode }) => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\\S+@\\S+\\.\\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (isRegister && password !== passwordConfirmation) {
      errors.passwordConfirmation = 'Passwords do not match';
    }

    setLocalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    dispatch(clearError());
    
    if (validateForm()) {
      if (isRegister) {
        dispatch(register({ email, password }));
      } else {
        dispatch(login({ email, password }));
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={theme.getResponsiveValue(
          styles.scrollContent,
          styles.scrollContentTablet,
          styles.scrollContentDesktop
        )}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Text variant="headlineMedium" style={styles.title}>
            Aza Ventures
          </Text>
          <Text variant="titleMedium" style={styles.subtitle}>
            {isRegister ? 'Create your account' : 'Sign in to your account'}
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (localErrors.email) {
                setLocalErrors({ ...localErrors, email: '' });
              }
            }}
            mode="outlined"
            autoCapitalize="none"
            keyboardType="email-address"
            error={!!localErrors.email}
            style={styles.input}
          />
          {localErrors.email ? <Text style={styles.errorText}>{localErrors.email}</Text> : null}

          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (localErrors.password) {
                setLocalErrors({ ...localErrors, password: '' });
              }
            }}
            mode="outlined"
            secureTextEntry={secureTextEntry}
            right={
              <TextInput.Icon
                icon={secureTextEntry ? 'eye' : 'eye-off'}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              />
            }
            error={!!localErrors.password}
            style={styles.input}
          />
          {localErrors.password ? <Text style={styles.errorText}>{localErrors.password}</Text> : null}

          {isRegister && (
            <>
              <TextInput
                label="Confirm Password"
                value={passwordConfirmation}
                onChangeText={(text) => {
                  setPasswordConfirmation(text);
                  if (localErrors.passwordConfirmation) {
                    setLocalErrors({ ...localErrors, passwordConfirmation: '' });
                  }
                }}
                mode="outlined"
                secureTextEntry={secureTextEntry}
                error={!!localErrors.passwordConfirmation}
                style={styles.input}
              />
              {localErrors.passwordConfirmation ? (
                <Text style={styles.errorText}>{localErrors.passwordConfirmation}</Text>
              ) : null}
            </>
          )}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            {isRegister ? 'Register' : 'Login'}
          </Button>

          <View style={styles.toggleContainer}>
            <Text variant="bodyMedium">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}
            </Text>
            <Button mode="text" onPress={onToggleMode} disabled={loading}>
              {isRegister ? 'Sign In' : 'Sign Up'}
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  scrollContentTablet: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 32,
    maxWidth: 480,
    alignSelf: 'center',
    width: '100%',
  },
  scrollContentDesktop: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 32,
    maxWidth: 480,
    alignSelf: 'center',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6B7280',
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    marginBottom: 16,
  },
  buttonContent: {
    height: 48,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 8,
    marginTop: -4,
    fontSize: 12,
  },
});

export default AuthForm;