import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * A responsive container that adjusts its width based on screen size
 */
const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ children, style }) => {
  const theme = useTheme();
  
  return (
    <View 
      style={[
        styles.container,
        {
          maxWidth: theme.getResponsiveValue(
            '100%',  // Mobile: full width
            '90%',   // Tablet: 90% width
            theme.sizes.maxContentWidth  // Desktop: fixed max width
          ),
          paddingHorizontal: theme.getResponsiveValue(
            theme.spacing.m,
            theme.spacing.l,
            theme.spacing.xl
          ),
        },
        style
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
  },
});

export default ResponsiveContainer;