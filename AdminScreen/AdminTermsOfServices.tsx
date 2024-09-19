import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";

const AdminTermsOfServices = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          {/* Title */}
          <Text style={styles.title}>Terms of Service</Text>

          {/* Introduction */}
          <Text style={styles.text}>
            These Terms of Service ("Terms") govern your use of SWIFTPAY (the
            "App"). By accessing or using the App, you agree to be bound by
            these Terms. If you do not agree, please do not use the App.
          </Text>

          {/* Account Registration */}
          <Text style={styles.sectionTitle}>Account Registration</Text>
          <Text style={styles.text}>
            You may be required to create an account to access certain features
            of the App. You agree to provide accurate information during
            registration and keep your account details secure.
          </Text>

          {/* User Responsibilities */}
          <Text style={styles.sectionTitle}>User Responsibilities</Text>
          <Text style={styles.text}>
            You agree to use the App only for lawful purposes. You are
            responsible for complying with all applicable laws and for any
            activity conducted under your account.
          </Text>

          {/* Prohibited Activities */}
          <Text style={styles.sectionTitle}>Prohibited Activities</Text>
          <Text style={styles.text}>
            You are prohibited from using the App for any unlawful or harmful
            activities, including but not limited to:
            {"\n"}- Posting offensive or harmful content.
            {"\n"}- Attempting to hack, damage, or disrupt the App.
            {"\n"}- Violating the intellectual property rights of others.
          </Text>

          {/* User Content */}
          <Text style={styles.sectionTitle}>User Content</Text>
          <Text style={styles.text}>
            You retain ownership of any content you submit to the App. By
            posting content, you grant us the right to use, display, and share
            it as needed. We reserve the right to remove content that violates
            these Terms.
          </Text>

          {/* App Usage Restrictions */}
          <Text style={styles.sectionTitle}>App Usage Restrictions</Text>
          <Text style={styles.text}>
            You must not misuse the App, including by attempting to access areas
            of the app you do not have permission for or using automated tools
            to access the service.
          </Text>

          {/* Payments and Transactions */}
          <Text style={styles.sectionTitle}>Payments and Transactions</Text>
          <Text style={styles.text}>
            If applicable, all payments made through the App are subject to
            these Terms. Subscription fees and refunds, if offered, are outlined
            separately within the App. Please contact support if you have any
            issues.
          </Text>

          {/* Termination of Service */}
          <Text style={styles.sectionTitle}>Termination of Service</Text>
          <Text style={styles.text}>
            We reserve the right to suspend or terminate your access to the App
            at our discretion if you violate these Terms. You may also terminate
            your account at any time.
          </Text>

          {/* Disclaimer of Warranties */}
          <Text style={styles.sectionTitle}>Disclaimer of Warranties</Text>
          <Text style={styles.text}>
            The App is provided "as is," without any warranties of any kind. We
            do not guarantee that the App will be error-free, secure, or
            available at all times.
          </Text>

          {/* Limitation of Liability */}
          <Text style={styles.sectionTitle}>Limitation of Liability</Text>
          <Text style={styles.text}>
            To the fullest extent permitted by law, we shall not be liable for
            any indirect, incidental, or consequential damages resulting from
            your use of the App.
          </Text>

          {/* Intellectual Property */}
          <Text style={styles.sectionTitle}>Intellectual Property</Text>
          <Text style={styles.text}>
            All content and materials in the App, including logos, designs, and
            code, are the property of [Your Company Name] and are protected by
            copyright and trademark laws.
          </Text>

          {/* Changes to the Terms */}
          <Text style={styles.sectionTitle}>Changes to These Terms</Text>
          <Text style={styles.text}>
            We may modify these Terms from time to time. If we do, we will
            notify you by posting the revised Terms within the App. By
            continuing to use the App, you agree to the updated Terms.
          </Text>

          {/* Governing Law */}
          <Text style={styles.sectionTitle}>Governing Law</Text>
          <Text style={styles.text}>
            These Terms are governed by and construed in accordance with the
            laws of [Your Country/Region], without regard to its conflict of law
            principles.
          </Text>

          {/* Contact Information */}
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.text}>
            If you have any questions or concerns about these Terms, please
            contact us at:
          </Text>
          <Text style={styles.textemail}>Email: swiftpay24.dev@gmail.com</Text>
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
  textemail: {
    fontWeight: "bold",
    fontSize: 20,
  },
  textphone: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default AdminTermsOfServices;
