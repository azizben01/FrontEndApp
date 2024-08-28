import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, FlatList, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from '@react-navigation/native';

// icon
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Transactions = {
  Username: string
  amount: number
  currency: string
  userid: number
  transactionid: number
  recipientname: string
  created: string
  isDeleted: boolean
}

function TransactionListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
   // Function to navigate to the transaction detail screen
  const HandleTransactionDetails = (transaction: Transactions) => {
    navigation.navigate('TransactionDetail', { transaction });
  }

  const [transactions, setTransactions] = useState<Transactions[]>([]);

  // Function to fetch transactions from the backend
  const handleTransaction = async () => {
    try {
     // const response = await fetch("http://192.168.1.2:1010/transactions", {
      const response = await fetch("http://192.168.1.87:1010/transactions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        setTransactions(data || []);
        console.log("Transactions retrieved successfully:", data);
      } else {
        console.error("Failed to retrieve transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      // Handle network errors or other unexpected errors
    }
  };

  // Function to soft delete a transaction (modification)
  const deleteTransaction = async (transactionId: number) => {
    try {
        const response = await fetch(`http://192.168.1.2:1010/deletetransactions/${transactionId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            // Remove the transaction from the frontend state after soft deletion
            setTransactions(prevTransactions =>
                prevTransactions.filter(transaction => transaction.transactionid !== transactionId)
            );
            console.log("Transaction soft deleted successfully");
        } else {
            console.error("Failed to delete transaction");
        }
    } catch (error) {
        console.error("Error deleting transaction:", error);
        // Handle network errors or other unexpected errors
    }
};

// handleLongPress function 
const handleLongPress = (transactionId: number) => {
  Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
          {
              text: "Cancel",
              style: "cancel",
          },
          {
              text: "Delete",
              style: "destructive",
              onPress: () => deleteTransaction(transactionId),
          },
      ]
  );
};



  useFocusEffect(
    React.useCallback(() => {
      // Run effect every time HomeScreen is focused
      handleTransaction();
      // Add your effect code here
      // For example, fetching data or updating state
      return () => {
        // Cleanup code (optional)
      };
    }, [])
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={styles.containerSafe}>
        <View style={{}}>
          <Text style={styles.sentence1}>Your Transactions</Text>
          <Text style={styles.sentence2}>Press on any transaction to see complete informations about this transaction.</Text>
        </View>

        <View style={styles.ContainerView}>
          {
            transactions.length > 0 ?
              <FlatList
                data={transactions}
                renderItem={({ item }) =>
                  <TouchableOpacity 
                  style={styles.touchableTransaction}
                  onPress={() => HandleTransactionDetails(item)} 
                  onLongPress={() =>handleLongPress(item.transactionid)}>
              
                    <Text style={styles.content}>{item.amount} </Text> 
                    <Text style={styles.content}>{item.currency} have been successfully transfered to </Text>
                    <Text style={styles.content}>{item.recipientname} on </Text>
                    <Text style={styles.content}>{item.created}</Text>
                  </TouchableOpacity>
                }
              />
              :
              <View style = {styles.noTransactionsView}>
              <Text style={styles.noTransactionsText}>
              No available transaction.
            </Text>
            </View>
          
          }
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default TransactionListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cfcece4a",
  },
  containerSafe: {
    flex: 1,
  },
  touchableTransaction: {
  padding: 12,
  marginVertical: 10,
  backgroundColor: '#3a5e7a',
  borderRadius: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 4,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start'
  },
  ContainerView: {
    flex: 1,
  paddingHorizontal: 20
   },
  content: {
    fontSize: 15,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    flexShrink: 1, // Allow items to shrink to avoid overflow
    color: 'white',
    marginBottom: 5,  // Add some spacing between items
    flexBasis: 'auto', // Allow items to take only as much space as needed
  },
 
  sentence1: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#3a5e7a'
  },
  sentence2: {
    fontSize: 18,
    paddingLeft: 15,
    marginBottom: 20,
  },

  noTransactionsText: {
    color: '#3a5e7a',
    fontSize: 17,
    textAlign: 'center'
  },
  noTransactionsView: {
    flex: 1, // display first in flex before justifying.
    justifyContent: 'center' // to move the whole text at the center of the page.
  }

});
