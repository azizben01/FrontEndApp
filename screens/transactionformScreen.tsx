import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function TransactionFormScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [Amount, setAmount] = useState("");
  const [Currency, setCurrency] = useState("");
  const [Sender_Phone, setSenderPhone] = useState("");
  const [UserName, setUserName] = useState("");
  const [Recipient_name, setRecipientName] = useState("");
  const [Recipient_phone, setRecipientPhone] = useState("");
  const [Transaction_Type, setTransactionType] = useState("");

  const handleAlert = () => {
    Alert.alert(
      "",
      "Do you wish to complete the following transaction?",
      [
        { text: "Cancel", onPress: () => console.log("Transaction cancelled"), style: "cancel" },
        { text: "Yes", onPress: handleTransaction }
      ]
    );
  }

  const handleTransaction = async () => {

    const transactionInput = {
      UserName: String(UserName),
      Amount: Number(Amount),
      Currency: String(Currency),
      Sender_Phone,
      Recipient_phone,
      Recipient_name,
      Transaction_Type,
     
    };

    try {
      const response = await fetch("http://192.168.1.87:1010/transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(transactionInput)
      });

      if (response.ok) {
        await AsyncStorage.setItem('transactionDetail', JSON.stringify(transactionInput));

        console.log(transactionInput, "created successfully");

        Alert.alert('Success', 'See your list of transactions in "Transactions" at the bottom page');

        navigation.navigate('Homepage', { post: Amount });

      } else {
        console.log("Transaction failed");
        const errorMessage = await response.text();
        Alert.alert("Transaction failed", errorMessage);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "There was a problem performing the transaction. Please try again later.");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
    >
      <SafeAreaView style={styles.safeview}>
        <Text style={styles.sentence}>
          Fill the form below to perform a transaction
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="User Name"
            style={styles.inputText}
            value={UserName}
            onChangeText={setUserName}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Amount"
            style={styles.inputText}
            value={Amount}
            onChangeText={setAmount}
            keyboardType="numeric" // gives the numerical keyboard with only dot and no symbols
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Currency"
            style={styles.inputText}
            value={Currency}
            onChangeText={setCurrency}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Sender Phone"
            style={styles.inputText}
            value={Sender_Phone}
            onChangeText={setSenderPhone}
            keyboardType="phone-pad" // gives the numerical keyboard with the symbols
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Recipient Name"
            style={styles.inputText}
            value={Recipient_name}
            onChangeText={setRecipientName}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Recipient Phone"
            style={styles.inputText}
            value={Recipient_phone}
            onChangeText={setRecipientPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Transaction Type"
            style={styles.inputText}
            value={Transaction_Type}
            onChangeText={setTransactionType}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAlert}>
          <Text style={styles.buttonText}>DONE</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default TransactionFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cfcece4a',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeview: {
    width: '100%',
    alignItems: 'center',
  },
  sentence: {
    marginBottom: 30,
    fontSize: 20,
    fontWeight: '700',
  },
  inputContainer: {
    backgroundColor: '#cfcece4a',
    borderRadius: 25,
    marginBottom: 10,
    paddingLeft: 5,
    width: '80%',
  },
  inputText: {
    padding: 12,
  },
  button: {
    backgroundColor: '#3a5e7a',
    width: '30%',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: 'white',
    padding: 12,
  },
});
