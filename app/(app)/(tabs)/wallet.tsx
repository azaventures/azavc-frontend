import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useNavigation, DrawerActions } from '@react-navigation/native';

export default function WalletScreen() {
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
        <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Wallet</Text>
        <TouchableOpacity style={styles.historyButton}>
          <IconSymbol size={24} name="clock.arrow.circlepath" color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={[styles.balanceCard, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>$15,750.00</Text>
            <View style={styles.balanceActions}>
              <TouchableOpacity style={styles.balanceAction}>
                <View style={styles.actionIcon}>
                  <IconSymbol size={20} name="arrow.down" color="#fff" />
                </View>
                <Text style={styles.actionText}>Deposit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.balanceAction}>
                <View style={styles.actionIcon}>
                  <IconSymbol size={20} name="arrow.up" color="#fff" />
                </View>
                <Text style={styles.actionText}>Withdraw</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.balanceAction}>
                <View style={styles.actionIcon}>
                  <IconSymbol size={20} name="arrow.right" color="#fff" />
                </View>
                <Text style={styles.actionText}>Transfer</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Recent Transactions
          </Text>
          
          <View style={styles.transactionsList}>
            {[
              { type: 'deposit', amount: 5000, date: 'May 15, 2023', description: 'Bank Transfer' },
              { type: 'investment', amount: -2500, date: 'May 10, 2023', description: 'Tech Startup 1' },
              { type: 'withdrawal', amount: -1000, date: 'May 5, 2023', description: 'Bank Transfer' },
              { type: 'return', amount: 250, date: 'May 1, 2023', description: 'Investment Return' },
            ].map((transaction, index) => (
              <View 
                key={index} 
                style={[styles.transactionCard, { backgroundColor: Colors[colorScheme ?? 'light'].background, borderColor: 'rgba(0,0,0,0.1)' }]}
              >
                <View style={styles.transactionIcon}>
                  <View style={[
                    styles.iconCircle, 
                    { 
                      backgroundColor: transaction.amount > 0 
                        ? 'rgba(0, 200, 83, 0.1)' 
                        : transaction.type === 'investment' 
                          ? 'rgba(0, 122, 255, 0.1)' 
                          : 'rgba(255, 59, 48, 0.1)' 
                    }
                  ]}>
                    <IconSymbol 
                      size={20} 
                      name={
                        transaction.type === 'deposit' ? 'arrow.down' :
                        transaction.type === 'withdrawal' ? 'arrow.up' :
                        transaction.type === 'investment' ? 'chart.line.uptrend.xyaxis' : 'dollarsign'
                      } 
                      color={
                        transaction.amount > 0 
                          ? 'rgb(0, 200, 83)' 
                          : transaction.type === 'investment' 
                            ? 'rgb(0, 122, 255)' 
                            : 'rgb(255, 59, 48)'
                      } 
                    />
                  </View>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={[styles.transactionDescription, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {transaction.description}
                  </Text>
                  <Text style={[styles.transactionDate, { color: Colors[colorScheme ?? 'light'].text + '80' }]}>
                    {transaction.date}
                  </Text>
                </View>
                <Text style={[
                  styles.transactionAmount, 
                  { 
                    color: transaction.amount > 0 
                      ? 'rgb(0, 200, 83)' 
                      : transaction.type === 'investment' 
                        ? 'rgb(0, 122, 255)' 
                        : 'rgb(255, 59, 48)' 
                  }
                ]}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </Text>
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
  historyButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  balanceCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  balanceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceAction: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transactionsList: {
    gap: 12,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  transactionIcon: {
    marginRight: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 