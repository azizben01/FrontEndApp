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
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminRequestReset = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [email, setEmail] = useState("");

  const handleRequestReset = async () => {
    try {
      const response = await fetch("http://172.20.10.2:1010/requestCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("resetEmail", email); // Store email in AsyncStorage
        Alert.alert("Success", "Password reset link sent to your email.");
        navigation.navigate("admin verify code");
      } else {
        Alert.alert(
          "Error",
          data.error || "Failed to send password reset link"
        );
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again later.");
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.safeView} behavior="padding">
      <View style={styles.containerview}>
        <View style={styles.resetView}>
          <Text style={styles.resetTopText}>
            Enter a valid email address below to receive a reset link to reset
            your password.
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Email"
            style={styles.InputValue}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.touchablebutton}
        onPress={handleRequestReset}
      >
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default AdminRequestReset;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cfcece4a",
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
  InputValue: {
    fontSize: 16,
  },
  inputView: {
    backgroundColor: "#cfcece4a",
    borderRadius: 30,
    fontWeight: "400",
    marginVertical: 20,
    padding: 12,
  },
  labelText: {
    fontSize: 18,
    marginBottom: 7,
    color: "#3a5e7a",
    fontWeight: "500",
  },
  resetView: {
    padding: 10,
    width: "90%",
  },
  resetTopText: {
    color: "#3a5e7a",
    fontSize: 18,
    textAlign: "center",
  },
  containerview: {},
  touchablebutton: {
    backgroundColor: "#3a5e7a",
    width: "90%",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "500",
  },
  buttonview: {
    width: "100%",
  },
});
