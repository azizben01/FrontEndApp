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
  numberofemployees: number;
  totalTransactions: number;
  highestTransaction: number;
  lowestTransaction: number;
  totalamounttransferred: number;
  createdat: string;
};
type Transaction = {
  adminTransactionid: number;
  username: string;
  currency: string;
  amount: number;
  adminname: string;
  created: string;
};

type ParamList = {
  ReportDetail: {
    reportData: Report;
  };
};

const ReportDetailScreen = () => {
  const route = useRoute<RouteProp<ParamList, "ReportDetail">>();
  const { reportData } = route.params;
  console.log("Report Data:", reportData);

  if (!reportData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No report details available.</Text>
      </View>
    );
  }
  const report = reportData.report;
  const transactions = reportData.transactions || []; // <-- Extract transactions here

  return (
    <SafeAreaView style={styles.safeview}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Display report details */}
          <View style={styles.topsentenceView}>
            <Text style={styles.topsentenceText}>Company Report</Text>
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
            <Text style={styles.label}>Number of Employees:</Text>
            <Text style={styles.value}>{report.numberofemployees}</Text>
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

          {/* Display transactions */}
          <Text style={styles.transactionsTitle}>
            Associated transactions:{" "}
          </Text>
          {transactions.length > 0 ? (
            transactions.map((transaction: Transaction) => (
              <View
                key={transaction.adminTransactionid}
                style={styles.transactionItem}
              >
                <Text style={styles.transactionLabel}>
                  Amount: {transaction.amount} of
                </Text>
                <Text style={styles.transactionLabel}>
                  Currency: {transaction.currency} {""} transferred to
                </Text>
                <Text style={styles.transactionLabel}>
                  Username: {transaction.username} by the administrator
                </Text>

                <Text style={styles.transactionLabel}>
                  Admin Name: {transaction.adminname} on
                </Text>
                <Text style={styles.transactionLabel}>
                  Created At: {transaction.created}
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
    paddingTop: "20%",
  },
  noTransactionsText: {
    fontSize: 22,
  },
});

export default ReportDetailScreen;
