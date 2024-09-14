import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

type AdminTransaction = {
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
  adminTransactionDetail: {
    admintransaction: AdminTransaction;
  };
};

const AdminTransactionDetailScreen = () => {
  // Use useRoute to get the passed transaction data
  const route = useRoute<RouteProp<ParamList, "adminTransactionDetail">>();
  console.log("Route params:", route.params);
  const { admintransaction } = route.params;
  if (!admintransaction) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No transaction details available.</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.topsentenceview}>
        <Text style={styles.topsentencetext}>Transaction detail</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Admin Name:</Text>
          <Text style={styles.value}>{admintransaction.adminname}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Admin Phone:</Text>
          <Text style={styles.value}>{admintransaction.adminphone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Admin Transaction ID:</Text>
          <Text style={styles.value}>
            {admintransaction.adminTransactionid}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Employee Username:</Text>
          <Text style={styles.value}>{admintransaction.username}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>{admintransaction.amount}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Currency:</Text>
          <Text style={styles.value}>{admintransaction.currency}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Employee Phone:</Text>
          <Text style={styles.value}>{admintransaction.employeephone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Transaction Type:</Text>
          <Text style={styles.value}>{admintransaction.transactiontype}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date Created:</Text>
          <Text style={styles.value}>{admintransaction.created}</Text>
        </View>
      </View>
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

export default AdminTransactionDetailScreen;
