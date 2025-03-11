import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useState } from 'react';

export default function CalendarScreen() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  
  // Generate dates for the week view
  const generateWeekDates = () => {
    const today = new Date();
    const dates: Date[] = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };
  
  const weekDates = generateWeekDates();
  
  // Format date to display day of week
  const formatDayOfWeek = (date: Date): string => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  // Format date to display day number
  const formatDayNumber = (date: Date): number => {
    return date.getDate();
  };
  
  // Check if date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };
  
  // Check if date is selected
  const isSelected = (date: Date): boolean => {
    return date.getDate() === selectedDate.getDate() && 
           date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear();
  };
  
  // Sample events data
  const events = [
    {
      id: 1,
      title: 'Investment Meeting',
      time: '09:00 AM - 10:30 AM',
      location: 'Virtual',
      type: 'meeting',
    },
    {
      id: 2,
      title: 'Deal Review',
      time: '11:00 AM - 12:00 PM',
      location: 'Office',
      type: 'review',
    },
    {
      id: 3,
      title: 'Lunch with Investors',
      time: '12:30 PM - 02:00 PM',
      location: 'Downtown Restaurant',
      type: 'social',
    },
    {
      id: 4,
      title: 'Portfolio Update',
      time: '03:00 PM - 04:00 PM',
      location: 'Conference Room',
      type: 'update',
    },
  ];
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
          <IconSymbol size={24} name="line.3.horizontal" color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Calendar</Text>
        <TouchableOpacity style={styles.addButton}>
          <IconSymbol size={24} name="plus" color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.calendarHeader}>
        <TouchableOpacity style={styles.monthSelector}>
          <Text style={[styles.monthText, { color: Colors[colorScheme ?? 'light'].text }]}>
            {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Text>
          <IconSymbol size={16} name="chevron.down" color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
        <View style={styles.viewOptions}>
          <TouchableOpacity style={[styles.viewOption, styles.activeViewOption]}>
            <Text style={[styles.viewOptionText, { color: Colors[colorScheme ?? 'light'].tint }]}>Week</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewOption}>
            <Text style={[styles.viewOptionText, { color: Colors[colorScheme ?? 'light'].text }]}>Month</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.weekView}>
        {weekDates.map((date, index) => (
          <TouchableOpacity 
            key={index}
            style={[
              styles.dateItem,
              isSelected(date) && [styles.selectedDate, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]
            ]}
            onPress={() => setSelectedDate(date)}
          >
            <Text 
              style={[
                styles.dayOfWeek,
                { color: isSelected(date) ? '#fff' : Colors[colorScheme ?? 'light'].text }
              ]}
            >
              {formatDayOfWeek(date)}
            </Text>
            <View 
              style={[
                styles.dayNumberContainer,
                isToday(date) && !isSelected(date) && [styles.todayCircle, { borderColor: Colors[colorScheme ?? 'light'].tint }]
              ]}
            >
              <Text 
                style={[
                  styles.dayNumber,
                  { color: isSelected(date) ? '#fff' : Colors[colorScheme ?? 'light'].text }
                ]}
              >
                {formatDayNumber(date)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>
          
          <View style={styles.eventsList}>
            {events.map((event) => (
              <TouchableOpacity 
                key={event.id} 
                style={[
                  styles.eventCard, 
                  { 
                    backgroundColor: Colors[colorScheme ?? 'light'].background, 
                    borderColor: 'rgba(0,0,0,0.1)',
                    borderLeftColor: 
                      event.type === 'meeting' ? '#FF9500' :
                      event.type === 'review' ? '#FF2D55' :
                      event.type === 'social' ? '#5AC8FA' : '#4CD964',
                    borderLeftWidth: 4,
                  }
                ]}
              >
                <Text style={[styles.eventTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {event.title}
                </Text>
                <View style={styles.eventDetails}>
                  <View style={styles.eventDetail}>
                    <IconSymbol size={16} name="clock" color={Colors[colorScheme ?? 'light'].text + '80'} />
                    <Text style={[styles.eventDetailText, { color: Colors[colorScheme ?? 'light'].text + '80' }]}>
                      {event.time}
                    </Text>
                  </View>
                  <View style={styles.eventDetail}>
                    <IconSymbol size={16} name="mappin" color={Colors[colorScheme ?? 'light'].text + '80'} />
                    <Text style={[styles.eventDetailText, { color: Colors[colorScheme ?? 'light'].text + '80' }]}>
                      {event.location}
                    </Text>
                  </View>
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
  addButton: {
    padding: 8,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  viewOptions: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    padding: 2,
  },
  viewOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  activeViewOption: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  viewOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  weekView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  dateItem: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  selectedDate: {
    backgroundColor: '#007AFF',
  },
  dayOfWeek: {
    fontSize: 12,
    marginBottom: 4,
  },
  dayNumberContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  todayCircle: {
    borderWidth: 1,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  eventsList: {
    gap: 12,
  },
  eventCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  eventDetails: {
    gap: 8,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDetailText: {
    fontSize: 14,
    marginLeft: 8,
  },
}); 