import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const currencies = ["RWF"];
const websocketURL = "http://192.168.1.74:1010/ws";

const AdminTransactionForm = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [Amount, setAmount] = useState("");
  const [Currency, setCurrency] = useState("");
  const [AdminPhone, setAdminphone] = useState("");
  const [Adminname, setAdminname] = useState("");
  const [Username, setUsername] = useState("");
  const [EmployeePhone, setEmployeephone] = useState("");
  const [Transactiontype, setTransactiontype] = useState("");
  // web socket
  const [ws, setWs] = useState<WebSocket | null>(null);

  // currency handlers
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const handleCurrencySelect = (selectedCurrency: string) => {
    setCurrency(selectedCurrency);
    setShowCurrencyDropdown(false);
  };
  const handleCurrencyFieldPress = () => {
    setShowCurrencyDropdown(!showCurrencyDropdown);
  };
  //end of currency handlers

  // WebSocket Connection (runs on component mount)
  useEffect(() => {
    const wsConnection = new WebSocket(websocketURL);
    setWs(wsConnection);

    wsConnection.onopen = () => {
      console.log("WebSocket connectedd");
    };

    wsConnection.onmessage = (event) => {
      console.log("Message received from WebSocket:", event.data);
    };

    wsConnection.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      wsConnection.close(); // Clean up WebSocket connection when component unmounts
    };
  }, []);

  const handleAlert = () => {
    Alert.alert("", "Do you wish to complete the following transaction?", [
      {
        text: "Cancel",
        onPress: () => console.log("Transaction cancelled"),
        style: "cancel",
      },
      { text: "Yes", onPress: handleAdminTransaction },
    ]);
  };

  const handleAdminTransaction = async () => {
    const transactionInput = {
      Username,
      Amount: Number(Amount),
      Currency: String(Currency),
      EmployeePhone,
      AdminPhone,
      Adminname,
      Transactiontype,
    };

    try {
      const response = await fetch(
        "http://192.168.1.74:1010/admintransaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transactionInput),
        }
      );

      if (response.ok) {
        await AsyncStorage.setItem(
          "transactionDetail",
          JSON.stringify(transactionInput)
        );

        console.log(transactionInput, "created successfully");

        Alert.alert(
          "Success",
          'See your list of transactions in "Transactions" at the bottom page'
        );

        // Send transaction data over WebSocket
        if (ws) {
          ws.send(
            JSON.stringify({ type: "new_transaction", data: transactionInput })
          );
          console.log("Transaction data sent via WebSocket:", transactionInput);
        }

        navigation.navigate("AdminHome");
      } else {
        console.log("Transaction failed");
        const errorMessage = await response.text();
        Alert.alert("Transaction failed", errorMessage);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        "There was a problem performing the transaction. Please try again later."
      );
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <SafeAreaView style={styles.safeview}>
        <View style={styles.topsentenceview}>
          <Text style={styles.topsentence}>
            Fill out the form to pay an employee.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Admin Name"
            style={styles.inputText}
            value={Adminname}
            onChangeText={setAdminname}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Amount"
            style={styles.inputText}
            value={Amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={handleCurrencyFieldPress}
            style={styles.inputText}
          >
            <Text>{Currency || "Currency"}</Text>
          </TouchableOpacity>
          {showCurrencyDropdown && (
            <View style={styles.currencyDropdown}>
              {currencies.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.currencyItem}
                  onPress={() => handleCurrencySelect(item)}
                >
                  <Text style={styles.currencyItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Admin phone"
            style={styles.inputText}
            value={AdminPhone}
            onChangeText={setAdminphone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Username of the Employee"
            style={styles.inputText}
            value={Username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Employee Phone"
            style={styles.inputText}
            value={EmployeePhone}
            onChangeText={setEmployeephone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Transaction Type"
            style={styles.inputText}
            value={Transactiontype}
            onChangeText={setTransactiontype}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAlert}>
          <Text style={styles.buttonText}>DONE</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default AdminTransactionForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cfcece4a",
  },
  contentContainer: {
    flexGrow: 1,
  },
  safeview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topsentenceview: {
    padding: 7,
  },
  topsentence: {
    marginBottom: 30,
    fontSize: 18,
    fontWeight: "700",
    color: "#3a5e7a",
  },
  inputContainer: {
    backgroundColor: "#cfcece4a",
    borderRadius: 25,
    marginBottom: 10,
    paddingLeft: 5,
    width: "80%",
  },
  inputText: {
    padding: 12,
  },
  button: {
    backgroundColor: "#3a5e7a",
    width: "30%",
    borderRadius: 25,
    alignItems: "center",
    marginTop: 25,
  },
  buttonText: {
    color: "white",
    padding: 12,
  },

  // currency styles

  currencyDropdown: {
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    maxHeight: 100,
  },
  currencyItem: {
    padding: 10,
  },
  currencyItemText: {
    fontSize: 16,
  },
});
