import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function DealsScreen() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <IconSymbol size={24} name="line.3.horizontal" color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Deals</Text>
        <TouchableOpacity style={styles.filterButton}>
          <IconSymbol size={24} name="slider.horizontal.3" color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <View style={[styles.searchBar, { backgroundColor: colorScheme === 'dark' ? '#2C2C2E' : '#F2F2F7' }]}>
              <IconSymbol size={20} name="magnifyingglass" color={Colors[colorScheme ?? 'light'].text} />
              <Text style={[styles.searchPlaceholder, { color: Colors[colorScheme ?? 'light'].text + '80' }]}>
                Search deals...
              </Text>
            </View>
          </View>
          
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Featured Deals
          </Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredContainer}>
            {[1, 2, 3].map((item) => (
              <View 
                key={`featured-${item}`} 
                style={styles.featuredCard}
              >
                <Image
                  source={require('@/assets/images/avatar-placeholder.png')}
                  style={styles.featuredImage}
                  resizeMode="cover"
                />
                <View style={[styles.featuredContent, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
                  <Text style={[styles.featuredTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                    Tech Startup {item}
                  </Text>
                  <Text style={[styles.featuredDescription, { color: Colors[colorScheme ?? 'light'].text + '80' }]}>
                    AI-powered solution for businesses
                  </Text>
                  <View style={styles.featuredFooter}>
                    <Text style={[styles.featuredAmount, { color: Colors[colorScheme ?? 'light'].text }]}>
                      $2.5M
                    </Text>
                    <Text style={[styles.featuredTarget, { color: Colors[colorScheme ?? 'light'].tint }]}>
                      Target
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            All Deals
          </Text>
          
          <View style={styles.dealsList}>
            {[1, 2, 3, 4].map((item) => (
              <TouchableOpacity 
                key={`deal-${item}`} 
                style={[styles.dealCard, { backgroundColor: Colors[colorScheme ?? 'light'].background, borderColor: 'rgba(0,0,0,0.1)' }]}
              >
                <View style={styles.dealHeader}>
                  <Text style={[styles.dealName, { color: Colors[colorScheme ?? 'light'].text }]}>
                    Investment Opportunity {item}
                  </Text>
                  <View style={[styles.dealBadge, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }]}>
                    <Text style={[styles.dealBadgeText, { color: Colors[colorScheme ?? 'light'].tint }]}>
                      {item % 2 === 0 ? 'New' : 'Hot'}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.dealDescription, { color: Colors[colorScheme ?? 'light'].text + '80' }]}>
                  {item % 2 === 0 ? 'Tech startup focusing on AI solutions' : 'Real estate investment opportunity'}
                </Text>
                <View style={styles.dealFooter}>
                  <Text style={[styles.dealAmount, { color: Colors[colorScheme ?? 'light'].text }]}>
                    ${(item * 1.5).toFixed(1)}M
                  </Text>
                  <Text style={[styles.dealFunding, { color: Colors[colorScheme ?? 'light'].text + '80' }]}>
                    {40 + (item * 10)}% Funded
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  searchPlaceholder: {
    marginLeft: 8,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  featuredContainer: {
    marginBottom: 24,
  },
  featuredCard: {
    width: 280,
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featuredImage: {
    width: '100%',
    height: 140,
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  featuredDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  featuredTarget: {
    fontSize: 14,
  },
  dealsList: {
    gap: 12,
  },
  dealCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  dealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dealName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  dealBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  dealBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dealDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  dealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dealAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dealFunding: {
    fontSize: 14,
  },
}); 