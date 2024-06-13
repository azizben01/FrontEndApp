import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Button, SafeAreaView } from "react-native";
import { Alert } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

function TransactionFormScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [Amount, setAmount] = useState("");
  const [Currency, setCurrency] = useState("");
  const [Sender_Phone, setSenderPhone] = useState("");
  const [UsernName, setUsernName] = useState("");
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
      UsernName: Number(UsernName)
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
        Alert.alert('Success', 'See your performed transactions in "Transactions" ')
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
      <SafeAreaView style={styles.safeview}>

        <Text style={styles.sentence} >
          Fill the form bellow to perform a transaction
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="User Name"
            style={styles.inputText}
            value={UsernName}
            onChangeText={setUsernName} />
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

      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default TransactionFormScreen

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#cfcece4a',
  },
  safeview: {
    height: '100%',
    display: 'flex',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sentence: {
    marginBottom: 30,
    fontSize: 20,
    fontWeight: '700'

  },
  inputContainer: {
    backgroundColor: '#cfcece4a',
    borderRadius: 25,
    marginBottom: 10,
    paddingLeft: 5,
    width: '80%'

  },
  inputText: {
    padding: 12

  },
  button: {
    backgroundColor: '#3a5e7a',
    width: '30%',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 25

  },
  buttonText: {
    color: 'white',
    padding: 12,
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  }

})

