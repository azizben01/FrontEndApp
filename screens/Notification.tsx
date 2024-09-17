import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

type AdminTransaction = {
  type: string;
  adminname: string;
  adminphone: string;
  username: string;
  amount: number;
  currency: string;
  adminTransactionid: number;
  created: string;
  employeephone: string;
  transactiontype: string;
};

type ParamList = {
  NotificationDetail: {
    notification: AdminTransaction;
  };
};

const Notification = () => {
  // Use useRoute to get the passed notification data
  const route = useRoute<RouteProp<ParamList, "NotificationDetail">>();
  console.log("data arriving on the notification page:", route.params);
  const { notification } = route.params;

  if (!notification) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No transaction details available.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topsentenceview}>
        <Text style={styles.topsentencetext}>Notification detail</Text>
      </View>
      {/* <View style={styles.container}> */}
      <View style={styles.row}>
        <Text style={styles.label}>Admin Name:</Text>
        <Text style={styles.value}>{notification.adminname}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Admin Phone:</Text>
        <Text style={styles.value}>{notification.adminphone}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Transaction ID:</Text>
        <Text style={styles.value}>{notification.adminTransactionid}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>{notification.amount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Currency:</Text>
        <Text style={styles.value}>{notification.currency}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Employee Phone:</Text>
        <Text style={styles.value}>{notification.employeephone}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Transaction Type:</Text>
        <Text style={styles.value}>{notification.transactiontype}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date Created:</Text>
        <Text style={styles.value}>{notification.created}</Text>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#cfcece4a",
  },
  safeview: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 6,
  },

  label: {
    fontSize: 15,
    color: "#3a5e7a",
  },
  value: {
    fontSize: 15,
    width: "100%",
    marginLeft: "3%",
  },

  errorText: {
    fontSize: 23,
  },
  topsentenceview: {
    padding: 10,
    backgroundColor: "#cfcece4a",
  },
  topsentencetext: {
    fontSize: 24,
    color: "#3a5e7a",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Notification;
