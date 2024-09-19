import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";

const AdminPrivacyPolicy = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          {/* Title */}
          <Text style={styles.title}>Privacy Policy</Text>

          {/* Introduction */}
          <Text style={styles.text}>
            At SWIFTPAY, we are committed to protecting your privacy. This
            Privacy Policy outlines how we collect, use, disclose, and safeguard
            your information when you use our app.
          </Text>

          {/* Information We Collect */}
          <Text style={styles.sectionTitle}>Information We Collect</Text>
          <Text style={styles.text}>
            We may collect personal information, such as your name, email
            address, phone number, and financial information when you use our
            services. We also collect usage information such as how you interact
            with our app, and device information such as your IP address, device
            type, and location data (if enabled).
          </Text>

          {/* How We Use Information */}
          <Text style={styles.sectionTitle}>How We Use Information</Text>
          <Text style={styles.text}>
            We use your information to provide and improve our services, process
            transactions, communicate with you, and ensure compliance with legal
            obligations. We also use data for analytics to improve your
            experience.
          </Text>

          {/* Data Sharing */}
          <Text style={styles.sectionTitle}>Data Sharing and Disclosure</Text>
          <Text style={styles.text}>
            We do not sell your data. However, we may share your information
            with third-party service providers to help us with services like
            payment processing, cloud storage, and app analytics. Your data may
            also be disclosed to comply with legal obligations.
          </Text>

          {/* Data Security */}
          <Text style={styles.sectionTitle}>Data Security</Text>
          <Text style={styles.text}>
            We use encryption and secure servers to protect your information.
            While we take reasonable steps to safeguard your data, no method of
            transmission over the internet is 100% secure.
          </Text>

          {/* User Rights */}
          <Text style={styles.sectionTitle}>Your Rights</Text>
          <Text style={styles.text}>
            You have the right to access, update, or delete your personal
            information at any time. You can also opt out of marketing
            communications by contacting us.
          </Text>

          {/* Cookies and Tracking */}
          <Text style={styles.sectionTitle}>Cookies and Tracking</Text>
          <Text style={styles.text}>
            We may use cookies and similar tracking technologies to monitor
            activity on our app. Third-party services like Google Analytics may
            also use cookies. You can control your cookie preferences through
            your browser settings.
          </Text>

          {/* Third-Party Links */}
          <Text style={styles.sectionTitle}>Third-Party Links</Text>
          <Text style={styles.text}>
            Our app may contain links to third-party websites or services that
            are not operated by us. We are not responsible for their privacy
            practices.
          </Text>

          {/* Changes to the Policy */}
          <Text style={styles.sectionTitle}>
            Changes to this Privacy Policy
          </Text>
          <Text style={styles.text}>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes.
          </Text>

          {/* Contact Information */}
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.text}>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </Text>
          <Text style={styles.textEMAIL}>Email: swiftpay24.dev@gmail.com</Text>
          <Text style={styles.textphone}>Phone: +250 791207043</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  section: {
    marginBottom: 20,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
  },
  textEMAIL: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textphone: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default AdminPrivacyPolicy;
