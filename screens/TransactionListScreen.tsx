import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  useEffect(() => {
    handleTransaction()
  }, [])

  // do so that when you perform a transaction and press "DONE" it takes you to a page that says: you have successfuly send "amount" to employee "userID"
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={styles.containerSafe}>
        <ScrollView>
          <Text style={styles.sentence1}>Your transactions</Text>
          <Text style={styles.sentence2}>Here you can see the summary of your recent transactions.</Text>
          <Text style={styles.sentence3}>Press on any transaction to see the details of the transaction.</Text>

          <View style={styles.ContainerView}>
            {
              transaction.length ?
                <FlatList
                  data={transaction}
                  renderItem={({ item }) =>
                    <TouchableOpacity style={styles.touchableTransaction} onPress={HandleTransactionDetails}>
                      <Text style={styles.content}>UserId:{item.userid}   to</Text>
                      <Text style={styles.content}>Recipient:{item.recipient_name}</Text>
                      <Text style={styles.content}>{item.amount}</Text>
                      <Text style={styles.content}>{item.currency}</Text>
                      <View style={styles.iconContainer}>
                        <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
                      </View>
                    </TouchableOpacity>}
                />
                : null
            }
          </View>
        </ScrollView>

      </SafeAreaView>
    </KeyboardAvoidingView>

  )
}
export default TransactionListScreen;
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#B0C4DE",
  },
  containerSafe: {
  },

  touchableTransaction: {
    padding: 10,
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#99B3D3',
    borderRadius: 15,
    marginTop: 10,
    width: 350,

  },

  ContainerView: {
    marginLeft: 15,

  },
  content: {
    marginLeft: 10,
    paddingTop: 5
  },
  iconContainer: {
    paddingTop: 5,
    paddingLeft: 15
  },
  sentence1: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 25,
    marginTop: -30,
    fontWeight: '500'
  },
  sentence2: {
    fontSize: 15,
    marginLeft: 10
  },
  sentence3: {
    fontSize: 13,
    marginLeft: 10,
    marginBottom: 20
  }
})