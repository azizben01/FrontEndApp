import React, {useEffect, useState} from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Button} from "react-native";
import {Alert} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

function TransactionFormScreen () {
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
    const transactionInput= [{

        Amount: Number(Amount),
        Currency,
        Sender_Phone,
        Recipient_phone,
        Recipient_name,
	      Transaction_Type,
        UserID: Number(UserID)
    }]
    
try {
  const response = await fetch("http://localhost:1010/transaction", {
    method: "POST",
    headers:{
      "content-type": "application/json"
    },
    body: JSON.stringify(transactionInput)
  });
  if (response.ok) {
      // Signup successful, navigate to login screen and show user's details
      await AsyncStorage.setItem('transactionDetail', JSON.stringify(transactionInput) )
      console.log(transactionInput, "created successfuly")
      navigation.navigate({
        name: 'Homepage',
        params: {post: Amount}
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

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Amount"
          style={styles.input}
          value={Amount}
          onChangeText={setAmount}
        />
        <TextInput
          placeholder="Choose amount currency"
          style={styles.input}
          value={Currency}
          onChangeText={setCurrency}
        />

        <TextInput
          placeholder="Enter sender phone"
          style={styles.input}
          value={Sender_Phone}
          onChangeText={setSenderPhone}
        />
        <TextInput
          placeholder="Enter recipient name"
          style={styles.input}
          value={Recipient_name}
          onChangeText={setRecipientName}
        />
        <TextInput
        placeholder="Enter recipient phone"
        style={styles.input}
        value={Recipient_phone}
        onChangeText={setRecipientPhone}
        />
        <TextInput
          placeholder="Enter transaction type"
          style={styles.input}
          value={Transaction_Type}
          onChangeText={setTransactionType}
        />
          <TextInput
          placeholder="Enter userID"
          style={styles.input}
          value={UserID}
          onChangeText={setUserID}
        />
      </View>
      <Button 
      title="DONE"
      onPress={handleAlert}
      />

    </KeyboardAvoidingView>
  );
};
export default TransactionFormScreen

const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B0C4DE'
        },

inputContainer:{
        width: '80%',
        padding: 5
        },
input:{
    backgroundColor: '#ecf5ff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 10,
    fontWeight: '400',
},
buttonContainer:{
    backgroundColor: '#0782F9',
    width: '50%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40
},
button:{
},

})