import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function HomeScreen() {
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
        <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Dashboard</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <IconSymbol size={24} name="bell.fill" color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={[styles.welcomeText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Welcome back, John!
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }]}>
              <Text style={[styles.statValue, { color: Colors[colorScheme ?? 'light'].text }]}>$12,500</Text>
              <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].text }]}>Total Invested</Text>
            </View>
            
            <View style={[styles.statCard, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }]}>
              <Text style={[styles.statValue, { color: Colors[colorScheme ?? 'light'].text }]}>$1,250</Text>
              <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].text }]}>Returns</Text>
            </View>
          </View>
          
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Active Investments
          </Text>
          
          <View style={styles.investmentsList}>
            {[1, 2, 3].map((item) => (
              <View 
                key={item} 
                style={[styles.investmentCard, { backgroundColor: Colors[colorScheme ?? 'light'].background, borderColor: 'rgba(0,0,0,0.1)' }]}
              >
                <View style={styles.investmentHeader}>
                  <Text style={[styles.investmentName, { color: Colors[colorScheme ?? 'light'].text }]}>
                    Tech Startup {item}
                  </Text>
                  <Text style={[styles.investmentReturn, { color: Colors[colorScheme ?? 'light'].tint }]}>
                    +10.5%
                  </Text>
                </View>
                <Text style={[styles.investmentAmount, { color: Colors[colorScheme ?? 'light'].text }]}>
                  $5,000
                </Text>
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          backgroundColor: Colors[colorScheme ?? 'light'].tint,
                          width: `${65 - (item * 15)}%` 
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.progressText, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {65 - (item * 15)}% Funded
                  </Text>
                </View>
              </View>
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
  notificationButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  investmentsList: {
    gap: 12,
  },
  investmentCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  investmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  investmentName: {
    fontSize: 16,
    fontWeight: '600',
  },
  investmentReturn: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  investmentAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  progressContainer: {
    gap: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
  },
}); 