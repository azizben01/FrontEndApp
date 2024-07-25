import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

type Transaction = {
  username: string
  amount: number
  currency: string
  userid: number
  transactionid: number
  recipient_name: string
  created: string
  recipient_phone: string
  sender_phone: string
  transaction_type: string

};

type ParamList = {
  TransactionDetail: {
    transaction: Transaction
  }
};

const TransactionDetailScreen = () => {
  // Use useRoute to get the passed transaction data
  const route = useRoute<RouteProp<ParamList, 'TransactionDetail'>>();
  const { transaction } = route.params;

  return (
    <View style={styles.container}>
         <View style={styles.row}>
        <Text style={styles.label}>User name:</Text>
        <Text style={styles.value}>{transaction.username}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Sender Phone:</Text>
        <Text style={styles.value}>{transaction.sender_phone}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Transactionid:</Text>
        <Text style={styles.value}>{transaction.transactionid}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>{transaction.amount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Currency:</Text>
        <Text style={styles.value}>{transaction.currency}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Recipient Name:</Text>
        <Text style={styles.value}>{transaction.recipient_name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Recipient Phone:</Text>
        <Text style={styles.value}>{transaction.recipient_phone}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Type of Transaction:</Text>
        <Text style={styles.value}>{transaction.transaction_type}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date Created:</Text>
        <Text style={styles.value}>{transaction.created}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginVertical: 14
    },

  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#cfcece4a',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 150,
    color: '#3a5e7a'
  },
  value: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TransactionDetailScreen;
