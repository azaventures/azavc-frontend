import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HelpScreen() {
  const colorScheme = useColorScheme();
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Help & Support</Text>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Frequently Asked Questions</Text>
            <View style={styles.faqItem}>
              <Text style={[styles.question, { color: Colors[colorScheme ?? 'light'].text }]}>How do I create an account?</Text>
              <Text style={[styles.answer, { color: Colors[colorScheme ?? 'light'].text }]}>
                To create an account, go to the login screen and tap on "Sign Up". Fill in your details and follow the instructions.
              </Text>
            </View>
            
            <View style={styles.faqItem}>
              <Text style={[styles.question, { color: Colors[colorScheme ?? 'light'].text }]}>How can I reset my password?</Text>
              <Text style={[styles.answer, { color: Colors[colorScheme ?? 'light'].text }]}>
                On the login screen, tap on "Forgot Password" and follow the instructions to reset your password.
              </Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Contact Us</Text>
            <Text style={[styles.contactInfo, { color: Colors[colorScheme ?? 'light'].text }]}>
              Email: support@azavc.com
            </Text>
            <Text style={[styles.contactInfo, { color: Colors[colorScheme ?? 'light'].text }]}>
              Phone: +1 (123) 456-7890
            </Text>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  faqItem: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    lineHeight: 20,
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 10,
  },
}); 