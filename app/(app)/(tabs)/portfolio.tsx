import { DrawerActions, useNavigation } from '@react-navigation/native';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useState } from 'react';

// Define portfolio status types
type PortfolioStatus = 'awaiting_tge' | 'distributing' | 'completed' | 'refunded' | 'raising';

// Define portfolio item type
interface PortfolioItem {
  id: string;
  name: string;
  amount: number;
  status: PortfolioStatus;
  date: string;
  progress?: number;
}

// Status info mapping with fixed icon names that exist in IconSymbol component
const STATUS_INFO = {
  awaiting_tge: {
    label: 'Awaiting TGE',
    icon: 'hourglass',
    color: '#FF9500',
    bgColor: 'rgba(255, 149, 0, 0.1)',
  },
  distributing: {
    label: 'Distributing',
    icon: 'arrow.clockwise',
    color: '#5AC8FA',
    bgColor: 'rgba(90, 200, 250, 0.1)',
  },
  completed: {
    label: 'Completed',
    icon: 'checkmark.circle.fill',
    color: '#4CD964',
    bgColor: 'rgba(76, 217, 100, 0.1)',
  },
  refunded: {
    label: 'Refunded',
    icon: 'xmark.circle.fill',
    color: '#FF3B30',
    bgColor: 'rgba(255, 59, 48, 0.1)',
  },
  raising: {
    label: 'Raising',
    icon: 'arrow.clockwise',
    color: '#007AFF',
    bgColor: 'rgba(0, 122, 255, 0.1)',
  },
};

// Status filter options
const STATUS_FILTERS: { label: string; value: PortfolioStatus | 'all'; icon?: string; color?: string }[] = [
  { label: 'All', value: 'all' },
  { 
    label: 'Awaiting TGE', 
    value: 'awaiting_tge',
    icon: STATUS_INFO.awaiting_tge.icon,
    color: STATUS_INFO.awaiting_tge.color
  },
  { 
    label: 'Distributing', 
    value: 'distributing',
    icon: STATUS_INFO.distributing.icon,
    color: STATUS_INFO.distributing.color
  },
  { 
    label: 'Completed', 
    value: 'completed',
    icon: STATUS_INFO.completed.icon,
    color: STATUS_INFO.completed.color
  },
  { 
    label: 'Refunded', 
    value: 'refunded',
    icon: STATUS_INFO.refunded.icon,
    color: STATUS_INFO.refunded.color
  },
  { 
    label: 'Raising', 
    value: 'raising',
    icon: STATUS_INFO.raising.icon,
    color: STATUS_INFO.raising.color
  },
];

// Sample portfolio data
const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: '1',
    name: 'Tech Startup Alpha',
    amount: 5000,
    status: 'awaiting_tge',
    date: 'Jun 15, 2023',
  },
  {
    id: '2',
    name: 'Blockchain Project Beta',
    amount: 2500,
    status: 'distributing',
    date: 'Jul 10, 2023',
    progress: 65,
  },
  {
    id: '3',
    name: 'AI Research Gamma',
    amount: 10000,
    status: 'completed',
    date: 'May 22, 2023',
  },
  {
    id: '4',
    name: 'Metaverse Project Delta',
    amount: 3000,
    status: 'refunded',
    date: 'Apr 30, 2023',
  },
  {
    id: '5',
    name: 'DeFi Protocol Epsilon',
    amount: 7500,
    status: 'raising',
    date: 'Aug 05, 2023',
    progress: 45,
  },
  {
    id: '6',
    name: 'NFT Marketplace Zeta',
    amount: 4000,
    status: 'awaiting_tge',
    date: 'Jul 28, 2023',
  },
  {
    id: '7',
    name: 'DAO Project Eta',
    amount: 6000,
    status: 'distributing',
    date: 'Jun 20, 2023',
    progress: 30,
  },
];

export default function PortfolioScreen() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [selectedStatus, setSelectedStatus] = useState<PortfolioStatus | 'all'>('all');
  
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  
  // Filter portfolios based on selected status
  const filteredPortfolios = selectedStatus === 'all' 
    ? PORTFOLIO_DATA 
    : PORTFOLIO_DATA.filter(item => item.status === selectedStatus);
  
  // Get status display info
  const getStatusInfo = (status: PortfolioStatus) => {
    return STATUS_INFO[status];
  };
  
  // Render portfolio item
  const renderPortfolioItem = ({ item }: { item: PortfolioItem }) => {
    const statusInfo = getStatusInfo(item.status);
    
    return (
      <TouchableOpacity 
        style={[
          styles.portfolioCard, 
          { 
            backgroundColor: Colors[colorScheme ?? 'light'].background,
            borderColor: 'rgba(0,0,0,0.1)',
          }
        ]}
      >
        <View style={styles.portfolioHeader}>
          <Text style={[styles.portfolioName, { color: Colors[colorScheme ?? 'light'].text }]}>
            {item.name}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: statusInfo.bgColor }]}>
            <IconSymbol size={14} name={statusInfo.icon} color={statusInfo.color} />
            <Text style={[styles.statusText, { color: statusInfo.color }]}>
              {statusInfo.label}
            </Text>
          </View>
        </View>
        
        <View style={styles.portfolioDetails}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text + '80' }]}>
              Investment
            </Text>
            <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].text }]}>
              ${item.amount.toLocaleString()}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: Colors[colorScheme ?? 'light'].text + '80' }]}>
              Date
            </Text>
            <Text style={[styles.detailValue, { color: Colors[colorScheme ?? 'light'].text }]}>
              {item.date}
            </Text>
          </View>
        </View>
        
        {(item.status === 'distributing' || item.status === 'raising') && item.progress !== undefined && (
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    backgroundColor: statusInfo.color,
                    width: `${item.progress}%` 
                  }
                ]} 
              />
            </View>
            <Text style={[styles.progressText, { color: Colors[colorScheme ?? 'light'].text + '80' }]}>
              {item.progress}% {item.status === 'distributing' ? 'Distributed' : 'Raised'}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  
  // Calculate total investment amount
  const totalInvestment = PORTFOLIO_DATA.reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <IconSymbol size={24} name="line.3.horizontal" color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Portfolio</Text>
        <TouchableOpacity style={styles.filterButton}>
          <IconSymbol size={24} name="slider.horizontal.3" color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }]}>
          <Text style={[styles.statValue, { color: Colors[colorScheme ?? 'light'].text }]}>
            ${totalInvestment.toLocaleString()}
          </Text>
          <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].text }]}>Total Invested</Text>
        </View>
        
        <View style={[styles.statCard, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }]}>
          <Text style={[styles.statValue, { color: Colors[colorScheme ?? 'light'].text }]}>
            {PORTFOLIO_DATA.length}
          </Text>
          <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].text }]}>Investments</Text>
        </View>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {STATUS_FILTERS.map((filter) => {
          const isSelected = selectedStatus === filter.value;
          const isAllFilter = filter.value === 'all';
          
          return (
            <TouchableOpacity
              key={filter.value}
              style={[
                styles.filterChip,
                isSelected && [
                  styles.activeFilterChip,
                  isAllFilter 
                    ? { backgroundColor: Colors[colorScheme ?? 'light'].tint } 
                    : { backgroundColor: STATUS_INFO[filter.value as PortfolioStatus].bgColor }
                ]
              ]}
              onPress={() => setSelectedStatus(filter.value)}
            >
              {!isAllFilter && (
                <IconSymbol 
                  size={12} 
                  name={filter.icon || 'questionmark.circle'} 
                  color={isSelected && filter.color ? filter.color : Colors[colorScheme ?? 'light'].text + '80'} 
                />
              )}
              <Text 
                style={[
                  styles.filterChipText,
                  { 
                    color: isSelected 
                      ? (isAllFilter ? '#fff' : filter.color || '#fff') 
                      : Colors[colorScheme ?? 'light'].text 
                  }
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      
      <FlatList
        data={filteredPortfolios}
        renderItem={renderPortfolioItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.portfolioList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <IconSymbol 
              size={48} 
              name="exclamationmark.triangle.fill" 
              color={Colors[colorScheme ?? 'light'].text + '40'} 
            />
            <Text style={[styles.emptyText, { color: Colors[colorScheme ?? 'light'].text + '80' }]}>
              No portfolios found with this status
            </Text>
          </View>
        }
      />
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
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
  filtersContainer: {
    paddingBottom: 28,
  },
  filtersContent: {
    paddingHorizontal: 8,
    paddingVertical: 0,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    gap: 6,
    height: 36,
  },
  activeFilterChip: {
    backgroundColor: '#007AFF',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  portfolioList: {
    padding: 16,
    paddingTop: 0,
    gap: 12,
  },
  portfolioCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  portfolioName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  portfolioDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
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
    textAlign: 'right',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
}); 