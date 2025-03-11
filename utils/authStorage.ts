import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const TOKEN_KEY = 'aza_auth_token';
const USER_KEY = 'aza_user';

// Use secure storage on mobile platforms, regular AsyncStorage on web
const storage = Platform.OS === 'web' ? AsyncStorage : SecureStore;

export const saveToken = async (token: string): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      await storage.setItem(TOKEN_KEY, token);
    } else {
      await storage.setItemAsync(TOKEN_KEY, token);
    }
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    if (Platform.OS === 'web') {
      return await storage.getItem(TOKEN_KEY);
    } else {
      return await storage.getItemAsync(TOKEN_KEY);
    }
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const removeToken = async (): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      await storage.removeItem(TOKEN_KEY);
    } else {
      await storage.deleteItemAsync(TOKEN_KEY);
    }
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

export const saveUser = async (user: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(user);
    if (Platform.OS === 'web') {
      await storage.setItem(USER_KEY, jsonValue);
    } else {
      await storage.setItemAsync(USER_KEY, jsonValue);
    }
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const getUser = async (): Promise<any | null> => {
  try {
    if (Platform.OS === 'web') {
      const jsonValue = await storage.getItem(USER_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } else {
      const jsonValue = await storage.getItemAsync(USER_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const removeUser = async (): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      await storage.removeItem(USER_KEY);
    } else {
      await storage.deleteItemAsync(USER_KEY);
    }
  } catch (error) {
    console.error('Error removing user:', error);
  }
};