import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from "react-native";
import { Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

function TransactionFormScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [Amount, setAmount] = useState("");
  const [Currency, setCurrency] = useState("");
  const [Sender_Phone, setSenderPhone] = useState("");
  const [UserID, setUserID] = useState("");
  const [Recipient_name, setRecipientName] = useState("");
  const [Recipient_phone, setRecipientPhone] = useState("");
  const [Transaction_Type, setTransactionType] = useState("");

  const handleAlert = () => {
    Alert.alert(
      "",
      "Do you wish to complete the following transaction?",
      [
        { text: "cancel", onPress: () => console.log("Transaction cancelled"), style: "cancel" },
        { text: "Yes", onPress: () => (handleTransaction()) }
      ]
    );

  }
  const handleTransaction = async () => {
    const transactionInput = {

      Amount: Number(Amount),
      Currency,
      Sender_Phone,
      Recipient_phone,
      Recipient_name,
      Transaction_Type,
      UserID: Number(UserID)
    }

    try {
      const response = await fetch("http://localhost:1010/transaction", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(transactionInput)
      });
      if (response.ok) {
        // Signup successful, navigate to login screen and show user's details
        await AsyncStorage.setItem('transactionDetail', JSON.stringify(transactionInput))
        console.log(transactionInput, "created successfuly")
        navigation.navigate({
          name: 'Homepage',
          params: { post: Amount }
        })

      } else {
        console.log("Transaction failed")
        // Signup failed, handle error
        const errorMessage = await response.text();
        Alert.alert("Transaction failed", errorMessage);
      }
    }
    catch (error) {
      // Network error or other unexpected error
      console.error(error);
      Alert.alert("Error", "there was a problem performing the transaction . Please try again later.");
    }
  }


  return (
    <KeyboardAvoidingView style={styles.container}>

      <Text style={styles.sentence} >
        Fill the form bellow {'\n'}to perform a transaction
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="UserID"
          style={styles.inputText}
          value={UserID}
          onChangeText={setUserID} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Amount"
          style={styles.inputText}
          value={Amount}
          onChangeText={setAmount} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Currency"
          style={styles.inputText}
          value={Currency}
          onChangeText={setCurrency} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Sender phone"
          style={styles.inputText}
          value={Sender_Phone}
          onChangeText={setSenderPhone} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Recipient name"
          style={styles.inputText}
          value={Recipient_name}
          onChangeText={setRecipientName} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Recipient phone"
          style={styles.inputText}
          value={Recipient_phone}
          onChangeText={setRecipientPhone} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Transaction type"
          style={styles.inputText}
          value={Transaction_Type}
          onChangeText={setTransactionType} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAlert}>
        <Text style={styles.buttonText}>DONE</Text>

      </TouchableOpacity>

    </KeyboardAvoidingView>
  );
};
export default TransactionFormScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 40,
    backgroundColor: '#B0C4DE'
  },
  sentence: {
    paddingBottom: 30,
    fontSize: 17,
    marginLeft: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 50,
    marginBottom: 10,
    borderRadius: 20,
    marginLeft: 30,
    backgroundColor: '#f2f2f2',
  },
  inputText: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 10,
    fontWeight: '400',
    height: 45,
    marginLeft: 10,
    paddingLeft: 10
  },
  button: {
    backgroundColor: '#5b5f97',
    marginHorizontal: 140,
    marginTop: 20,
    borderRadius: 20,
    width: '30%',
    height: '5%',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Verdana'

  }
})