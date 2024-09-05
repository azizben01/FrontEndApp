import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";

function VerifyAdminCodeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [code, setCode] = useState("");

  const handleVerifyCode = async () => {
    try {
      // const response = await fetch('http://192.168.1.2:1010/ResetCode', {
      const response = await fetch("http://192.168.1.87:1010/ResetCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      if (response.ok) {
        //  navigation.navigate('') // , { email: data.email });
        Alert.alert("The provided code is correct!");
        navigation.navigate("UpdatePassword");
      } else {
        alert(data.error || "Invalid code");
      }
    } catch (error) {
      console.error("Navigation error:", error);
      alert("An error occurred during navigation.");
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.safeView} behavior="padding">
      <View style={styles.textView}>
        <Text style={styles.CodeAreaTopText}>
          Enter the 6 digits code sent to your email account below.
        </Text>
      </View>
      <View style={styles.inputView}>
        <View style={styles.labelView}>
          <Text style={styles.labelText}>Your code </Text>
        </View>
        <TextInput
          placeholder="Enter reset code"
          style={styles.InputValue}
          value={code}
          onChangeText={setCode}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default VerifyAdminCodeScreen;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cfcece4a",
  },

  textView: {
    padding: 10,
  },

  CodeAreaTopText: {
    color: "#3a5e7a",
    fontSize: 18,
    textAlign: "center",
  },

  inputView: {
    backgroundColor: "#cfcece4a",
    width: "95%",
    height: 100,
    borderRadius: 10,
    fontWeight: "400",
    marginVertical: 20,
  },

  labelView: {
    fontSize: 25,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginVertical: 15,
    width: "95%",
    marginHorizontal: 10,
  },

  labelText: {
    fontSize: 18,
    marginBottom: 7,
    color: "#3a5e7a",
    fontWeight: "500",
  },

  InputValue: {
    paddingLeft: 15,
    height: "20%",
  },

  button: {
    backgroundColor: "#3a5e7a",
    borderRadius: 25,
    padding: 15,
    width: "30%",
  },

  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "500",
  },

  buttonView: {
    padding: 10,
    width: "90%",
    alignItems: "center",
  },
});
