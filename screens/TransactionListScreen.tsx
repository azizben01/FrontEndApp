import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from '@react-navigation/native';

// icon
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


type transaction = {
  amount: number
  currency: string
  userid: number
  transactionid: number
  recipient_name: string
}
function TransactionListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const HandleTransactionDetails = () => {
    navigation.navigate('TransactionDetail')
  }
  const [transaction, setTransaction] = useState<transaction[]>([]);


  const handleTransaction = async () => {
    try {
      const response = await fetch("http://localhost:1010/transactions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        setTransaction(data)
        console.log("Transactions retrieved successfully:", data);
        // navigation.navigate('TransactionList')
      } else {
        console.error("Failed to retrieve transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      // Handle network errors or other unexpected errors
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      // Run effect every time HomeScreen is focused (displayed)
      handleTransaction()
      // Add your effect code here
      // For example, fetching data or updating state
      return () => {
        // Cleanup code (optional)
      };
    }, [])
  );

  // do so that when you perform a transaction and press "DONE" it takes you to a page that says: you have successfuly sent "amount" to employee "userID"
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={styles.containerSafe}>
        <View style={{}}>
          <Text style={styles.sentence1}>Your transactions</Text>
          <Text style={styles.sentence2}>Here you can see the summary of your recent transactions. {'\n'}Press on any transaction to see the details of the transaction.</Text>
        </View>

        <View style={styles.ContainerView}>
          {
            transaction.length ?
              <FlatList
                data={transaction}
                renderItem={({ item }) =>
                  <TouchableOpacity style={styles.touchableTransaction} onPress={HandleTransactionDetails}>
                    <Text style={styles.content}>               {item.amount}</Text>
                    <Text style={styles.content}>{item.currency} sent to</Text>
                    <Text style={styles.content}>{item.recipient_name}.</Text>
                  </TouchableOpacity>}
              />
              : null
          }
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>

  )
}
export default TransactionListScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cfcece4a",
  },
  containerSafe: {
    flex: 1,
    marginBottom: -34
  },

  touchableTransaction: {
    padding: 10,
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#3a5e7a',
    borderRadius: 15,
    marginTop: 10,
    width: 350,

  },

  ContainerView: {
    flex: 1,
    marginLeft: 15,

  },
  content: {
    marginLeft: 10,
    paddingTop: 5,
    color: 'white'
  },
  iconContainer: {
    paddingTop: 5,
    paddingLeft: 15
  },
  sentence1: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 25,
    fontWeight: '700',
    color: '#3a5e7a'
  },
  sentence2: {
    fontSize: 15,
    marginLeft: 10,
  },
})