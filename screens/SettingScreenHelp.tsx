import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";

const SettingScreenHelp = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Introduction */}
        <View style={styles.section}>
          <Text style={styles.title}>Welcome to Help Center</Text>
          <Text style={styles.description}>
            Here you’ll find answers to common questions and helpful resources
            to guide you through using the app.
          </Text>
        </View>

        {/* FAQs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

          {/* Account Management */}
          <Text style={styles.subSectionTitle}>Account Management</Text>
          <Text style={styles.question}>How do I create an account?</Text>
          <Text style={styles.answer}>
            Go to the signup page, enter your email, create a password, and
            follow the on-screen instructions.
          </Text>

          <Text style={styles.question}>How do I reset my password?</Text>
          <Text style={styles.answer}>
            Tap "Forgot Password" on the login screen and follow the
            instructions to reset your password.
          </Text>

          {/* Transactions */}
          <Text style={styles.subSectionTitle}>Transactions</Text>
          <Text style={styles.question}>How do I transfer money?</Text>
          <Text style={styles.answer}>
            Go to the “Transfer” tab, enter the recipient’s details, and
            complete the transfer by following the instructions.
          </Text>
        </View>
        {/* Step-by-Step Guides */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Step-by-Step Guides</Text>
          <Text style={styles.subSectionTitle}>How to Make a Transaction:</Text>
          <Text style={styles.answer}>1. Log in to the app.</Text>
          <Text style={styles.answer}>2. Go to the "Transfer" tab.</Text>
          <Text style={styles.answer}>
            3. Enter the recipient's details and amount.
          </Text>
          <Text style={styles.answer}>4. Tap "Submit."</Text>
        </View>

        {/* Troubleshooting */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Troubleshooting</Text>
          <Text style={styles.question}>
            App keeps crashing, what should I do?
          </Text>
          <Text style={styles.answer}>
            Restart your phone, check for updates, and ensure you have a stable
            internet connection.
          </Text>
        </View>

        {/* Contact Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Need Further Assistance?</Text>
          <Text style={styles.description}>
            If you still have questions, feel free to reach out to our support
            team:
          </Text>
          <Text style={styles.contactText}>
            Email: swiftpay24.dev@gmail.com
          </Text>
          <Text style={styles.contactText}>Phone: +250 791207043</Text>
          <Text style={styles.contactText}>
            Live Chat: Available Monday - Friday, 9 AM - 5 PM
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  section: {
    marginBottom: 24,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 6,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
  },
  answer: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: "blue",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  contactText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingScreenHelp;
