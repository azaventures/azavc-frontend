import { DefaultTheme, configureFonts } from 'react-native-paper';
import { Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

// Responsive sizing
const isTablet = width > 768;
const isLargeScreen = width > 1024;

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: '100',
    },
  },
  ios: {
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'System',
      fontWeight: '100',
    },
  },
  android: {
    regular: {
      fontFamily: 'Roboto',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'Roboto',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'Roboto',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'Roboto',
      fontWeight: '100',
    },
  },
};

export const colors = {
  primary: '#1E3A8A', // Deep blue
  primaryLight: '#3B82F6',
  secondary: '#047857', // Green
  secondaryLight: '#10B981',
  accent: '#8B5CF6', // Purple
  background: '#F9FAFB',
  surface: '#FFFFFF',
  error: '#EF4444',
  text: '#1F2937',
  textSecondary: '#6B7280',
  disabled: '#E5E7EB',
  placeholder: '#9CA3AF',
  backdrop: 'rgba(0, 0, 0, 0.5)',
  onSurface: '#1F2937',
  notification: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
};

export const spacing = {
  xs: isTablet ? 6 : 4,
  s: isTablet ? 10 : 8,
  m: isTablet ? 16 : 12,
  l: isTablet ? 24 : 16,
  xl: isTablet ? 32 : 24,
  xxl: isTablet ? 48 : 32,
};

export const sizes = {
  buttonHeight: isTablet ? 56 : 48,
  inputHeight: isTablet ? 56 : 48,
  borderRadius: isTablet ? 12 : 8,
  iconSize: isTablet ? 28 : 24,
  maxContentWidth: isLargeScreen ? 1200 : 960,
};

export const fonts = configureFonts({ config: fontConfig, isV3: true });

export const breakpoints = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
};

export const getResponsiveValue = (
  phone: any,
  tablet?: any,
  desktop?: any
) => {
  if (width >= breakpoints.desktop && desktop !== undefined) {
    return desktop;
  }
  if (width >= breakpoints.tablet && tablet !== undefined) {
    return tablet;
  }
  return phone;
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
  },
  fonts,
  spacing,
  sizes,
  isTablet,
  isLargeScreen,
  getResponsiveValue,
};

export type AppTheme = typeof theme;