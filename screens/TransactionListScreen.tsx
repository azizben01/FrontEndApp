import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, FlatList} from "react-native";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";


type transaction = {
  Amount: number
}

function TransactionListScreen () {
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


    return (

        <KeyboardAvoidingView style={styles.container} behavior="padding">

         <View style={styles.content}>
            {
              transaction.length?
              <FlatList
              data={transaction}
              renderItem={({item})=>
               <View style = {styles.item}>
                <Text>{item.Amount}</Text>
              </View>}
              />
              :null
            }
          </View>


      <View style={styles.content}>
          <Text>Welcome to your Transactions!</Text>
          <TouchableOpacity style = {styles.ButtonStyle} onPress={handleTransaction}>
            <Text>Press to view your transactions</Text>
          </TouchableOpacity>

      </View>

        </KeyboardAvoidingView>

    )
}

    export default TransactionListScreen;
    const styles = StyleSheet.create ({
      item:{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },


ButtonStyle: {
  marginTop: 10,
  padding: 10,
  backgroundColor: 'white',
  borderRadius: 5,
},

        content : {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",

        },
        container : {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#B0C4DE",
        }
    })