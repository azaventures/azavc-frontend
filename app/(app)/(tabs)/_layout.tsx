import { Platform, StyleSheet, View } from 'react-native';

import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { Tabs } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: isDark ? '#8E8E93' : '#8E8E93',
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginBottom: 4,
        },
        tabBarStyle: {
          position: 'absolute',
          height: 80 + (Platform.OS === 'ios' ? insets.bottom : 0),
          paddingTop: 8,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 8,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
        tabBarBackground: () => (
          <BlurView 
            tint={isDark ? 'dark' : 'light'} 
            intensity={90} 
            style={StyleSheet.absoluteFill}
          >
            <View style={[
              StyleSheet.absoluteFill, 
              { 
                backgroundColor: isDark ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                borderTopWidth: 0.5,
                borderTopColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              }
            ]} />
          </BlurView>
        ),
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <IconSymbol 
                size={24} 
                name={focused ? "house.fill" : "house"} 
                color={color} 
              />
              {focused && <View style={[styles.indicator, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="deals"
        options={{
          title: 'Deals',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <IconSymbol 
                size={24} 
                name={focused ? "briefcase.fill" : "briefcase"} 
                color={color} 
              />
              {focused && <View style={[styles.indicator, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <IconSymbol 
                size={24} 
                name={focused ? "chart.pie.fill" : "chart.pie"} 
                color={color} 
              />
              {focused && <View style={[styles.indicator, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <IconSymbol 
                size={24} 
                name={focused ? "creditcard.fill" : "creditcard"} 
                color={color} 
              />
              {focused && <View style={[styles.indicator, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <IconSymbol 
                size={24} 
                name={focused ? "clock.fill" : "clock"} 
                color={color} 
              />
              {focused && <View style={[styles.indicator, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 30,
  },
  indicator: {
    position: 'absolute',
    bottom: -20,
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
}); 