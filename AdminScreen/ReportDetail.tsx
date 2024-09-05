import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define the report type to match the structure of the report data
type Report = {
  title: string;
  description: string;
  period: string;
  createdby: string;
  numberofemployees: number;
  total_transactions: number;
  highest_transaction: number;
  lowest_transaction: number;
  totalamounttransferred: number;
  created_at: string; // fix the time format
};

type ParamList = {
  ReportDetail: {
    reportData: Report;
  };
};

const ReportDetailScreen = () => {
  // Use useRoute to get the passed report data
  const route = useRoute<RouteProp<ParamList, "ReportDetail">>();
  const { reportData } = route.params; // Extract report data from route params

  if (!reportData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No report details available.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.container}>
        <View style={styles.topsentenceView}>
          <Text style={styles.topsentenceText}>Company Report</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Title:</Text>
          <Text style={styles.value}>{reportData.title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{reportData.description}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Period:</Text>
          <Text style={styles.value}>{reportData.period}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Created By:</Text>
          <Text style={styles.value}>{reportData.createdby}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Number of Employees:</Text>
          <Text style={styles.value}>{reportData.numberofemployees}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Transactions:</Text>
          <Text style={styles.value}>{reportData.total_transactions}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Highest Transaction:</Text>
          <Text style={styles.value}>{reportData.highest_transaction}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Lowest Transaction:</Text>
          <Text style={styles.value}>{reportData.lowest_transaction}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Amount Transferred:</Text>
          <Text style={styles.value}>{reportData.totalamounttransferred}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Created At:</Text>
          <Text style={styles.value}>{reportData.created_at}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    marginVertical: 14,
  },

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#cfcece4a",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    width: 150,
    color: "#3a5e7a",
  },
  value: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },

  errorText: {
    fontSize: 23,
  },

  topsentenceView: {
    flexDirection: "row",
    marginVertical: 14,
    justifyContent: "center",
  },
  topsentenceText: {
    color: "#3a5e7a",
    fontWeight: "bold",
    fontSize: 25,
    textDecorationLine: "underline",
  },
});

export default ReportDetailScreen;
