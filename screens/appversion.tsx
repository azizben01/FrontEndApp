import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";

const Appversion = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          {/* Title */}
          <Text style={styles.title}>App Version Information</Text>

          {/* Version Number */}
          <Text style={styles.sectionTitle}>Current Version:</Text>
          <Text style={styles.text}>1.0.0</Text>

          {/* Release Date */}
          <Text style={styles.sectionTitle}>Release Date:</Text>
          <Text style={styles.text}>September 15, 2024</Text>

          {/* What's New */}
          <Text style={styles.sectionTitle}>What's New in Version 1.0.0:</Text>
          <Text style={styles.text}>
            This is the first official release of SWIFTPAY. Key features
            include:
            {"\n"}- User-friendly interface for managing transactions.
            {"\n"}- Detailed reporting of transactions and user activities.
            {"\n"}- Support for multiple currencies.
            {"\n"}- Access to help and customer support directly from the app.
          </Text>

          {/* Planned Updates */}
          <Text style={styles.sectionTitle}>Planned Updates:</Text>
          <Text style={styles.text}>
            We are continuously working to improve the app experience. Future
            updates will include:
            {"\n"}- Dark mode support.
            {"\n"}- More detailed analytics on transactions.
            {"\n"}- Enhanced security features.
          </Text>

          {/* Contact Information */}
          <Text style={styles.sectionTitle}>Contact Us:</Text>
          <Text style={styles.text}>
            If you have any questions or feedback about this version, please
            contact our support team:
          </Text>
          <Text style={styles.text}>Email: swiftpay24.dev@gmail.com</Text>
          <Text style={styles.text}>Phone: +250 791207043</Text>
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
});

export default Appversion;
