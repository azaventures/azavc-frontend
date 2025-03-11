import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUI } from '@/store/sweetState';

// Define additional colors
const textSecondaryLight = '#666666';
const textSecondaryDark = '#A0A0A0';
const tintTransparentLight = 'rgba(10, 126, 164, 0.1)';
const tintTransparentDark = 'rgba(255, 255, 255, 0.1)';

type DrawerIconProps = {
  color: string;
};

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const [, { setDrawerOpen }] = useUI();

  // Sync drawer state with UI store
  useEffect(() => {
    return () => {
      setDrawerOpen(false);
    };
  }, [setDrawerOpen]);

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          width: '80%',
        },
        drawerType: 'front',
        swipeEdgeWidth: 100,
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Home',
          drawerIcon: ({ color }: DrawerIconProps) => <IconSymbol size={24} name="house.fill" color={color} />,
        }}
      />
      <Drawer.Screen
        name="drawer/profile"
        options={{
          title: 'Profile',
          drawerIcon: ({ color }: DrawerIconProps) => <IconSymbol size={24} name="person.fill" color={color} />,
        }}
      />
      <Drawer.Screen
        name="drawer/settings"
        options={{
          title: 'Settings',
          drawerIcon: ({ color }: DrawerIconProps) => <IconSymbol size={24} name="gear" color={color} />,
        }}
      />
      <Drawer.Screen
        name="drawer/help"
        options={{
          title: 'Help & Support',
          drawerIcon: ({ color }: DrawerIconProps) => <IconSymbol size={24} name="questionmark.circle" color={color} />,
        }}
      />
    </Drawer>
  );
}

interface DrawerContentProps {
  state: {
    routes: Array<{
      key: string;
      name: string;
    }>;
    index: number;
  };
  descriptors: {
    [key: string]: {
      options: {
        title?: string;
        drawerIcon?: (props: DrawerIconProps) => React.ReactNode;
      };
    };
  };
  navigation: {
    emit: (event: { type: string; target: string; canPreventDefault: boolean }) => { defaultPrevented: boolean };
    navigate: (name: string) => void;
  };
}

function CustomDrawerContent(props: DrawerContentProps) {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const [, { setDrawerOpen }] = useUI();
  const textSecondary = colorScheme === 'dark' ? textSecondaryDark : textSecondaryLight;
  const tintTransparent = colorScheme === 'dark' ? tintTransparentDark : tintTransparentLight;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20, backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/avatar-placeholder.png')}
          style={styles.avatar}
          defaultSource={require('@/assets/images/avatar-placeholder.png')}
        />
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: Colors[colorScheme ?? 'light'].text }]}>John Doe</Text>
          <Text style={[styles.userEmail, { color: textSecondary }]}>john.doe@example.com</Text>
        </View>
      </View>

      <View style={styles.drawerItems}>
        {props.state.routes.map((route, index) => {
          const { options } = props.descriptors[route.key];
          const label = options.title || route.name;
          const isFocused = props.state.index === index;

          const onPress = () => {
            const event = props.navigation.emit({
              type: 'drawerItemPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              props.navigation.navigate(route.name);
            }

            setDrawerOpen(false);
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={[
                styles.drawerItem,
                isFocused && { backgroundColor: tintTransparent },
              ]}
            >
              <View style={styles.drawerItemIcon}>
                {options.drawerIcon && options.drawerIcon({ color: isFocused ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].text })}
              </View>
              <Text
                style={[
                  styles.drawerItemLabel,
                  { color: isFocused ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].text },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Pressable
          style={styles.logoutButton}
          onPress={() => {
            // Handle logout
            console.log('Logout pressed');
          }}
        >
          <IconSymbol size={24} name="rectangle.portrait.and.arrow.right" color={Colors[colorScheme ?? 'light'].text} />
          <Text style={[styles.logoutText, { color: Colors[colorScheme ?? 'light'].text }]}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.7,
  },
  drawerItems: {
    flex: 1,
    paddingTop: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  drawerItemIcon: {
    marginRight: 16,
    width: 24,
    alignItems: 'center',
  },
  drawerItemLabel: {
    fontSize: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    marginLeft: 16,
    fontSize: 16,
  },
}); 