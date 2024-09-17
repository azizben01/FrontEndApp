import React from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

type Report = {
  report: any;
  transactions: any;
  title: string;
  description: string;
  period: string;
  createdby: string;
  totalTransactions: number;
  highestTransaction: number;
  lowestTransaction: number;
  totalamounttransferred: number;
  createdat: string;
};
type Transaction = {
  employeeTransactionid: number;
  currency: string;
  amount: number;
  createdat: string;
  username: string;
  recipientname: string;
};

type ParamList = {
  EmployeeReportDetail: {
    reportData: Report;
  };
};
const EmployeeReportDetail = () => {
  const route = useRoute<RouteProp<ParamList, "EmployeeReportDetail">>();
  const { reportData } = route.params;

  console.log("Employee Report Data:", reportData);

  if (!reportData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No report details available.</Text>
      </View>
    );
  }

  const report = reportData.report;
  const transactions = reportData.transactions || []; // Fallback to an empty array if transactions is null or undefined

  return (
    <SafeAreaView style={styles.safeview}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Display employee report details */}
          <View style={styles.topsentenceView}>
            <Text style={styles.topsentenceText}>Employee Report</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Title:</Text>
            <Text style={styles.value}>{report.title}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{report.description}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Period:</Text>
            <Text style={styles.value}>{report.period}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Created By:</Text>
            <Text style={styles.value}>{report.createdby}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Transactions:</Text>
            <Text style={styles.value}>{report.totalTransactions}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Highest Transaction:</Text>
            <Text style={styles.value}>{report.highestTransaction}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Lowest Transaction:</Text>
            <Text style={styles.value}>{report.lowestTransaction}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Amount Transferred:</Text>
            <Text style={styles.value}>{report.totalamounttransferred}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Report Created At:</Text>
            <Text style={styles.value}>{report.createdat}</Text>
          </View>

          {/* Display employee-specific transactions */}
          <Text style={styles.transactionsTitle}>Associated Transactions:</Text>
          {transactions.length > 0 ? (
            transactions.map((transaction: Transaction) => (
              <View
                key={transaction.employeeTransactionid}
                style={styles.transactionItem}
              >
                <Text style={styles.transactionLabel}>
                  Amount: {transaction.amount} {transaction.currency}
                </Text>
                <Text style={styles.transactionLabel}>
                  Created At: {transaction.createdat}
                </Text>
                <Text style={styles.transactionLabel}>
                  Username: {transaction.username}
                </Text>
                <Text style={styles.transactionLabel}>
                  Recipient Name: {transaction.recipientname}
                </Text>
                <Text style={styles.transactionLabel}>
                  Currency: {transaction.currency}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.noTransactionsView}>
              <Text style={styles.noTransactionsText}>
                No transactions available.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#cfcece4a",
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
  topsentenceView: {
    flexDirection: "row",
    marginVertical: 14,
    justifyContent: "center",
  },
  topsentenceText: {
    color: "#3a5e7a",
    fontWeight: "bold",
    fontSize: 25,
  },
  transactionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 5,
  },
  transactionLabel: {
    fontSize: 14,
    marginLeft: -9,
  },
  transactionsTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#3a5e7a",
  },
  errorText: {
    fontSize: 22,
  },
  noTransactionsView: {
    // position: "absolute",
    // left: 80,
    // top: "80%",
    // padding: 20,
    paddingTop: "40%",
  },
  noTransactionsText: {
    fontSize: 22,
  },
});

export default EmployeeReportDetail;
