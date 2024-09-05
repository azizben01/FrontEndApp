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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Ionicons from "@expo/vector-icons/Ionicons";

function ChangeAdminPassword() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleForgotPassword = () => {
    navigation.navigate("Request code");
  };

  const toggleShowingPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://192.168.1.3:1010/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, oldPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // Ensure that 'data' contains updated user data
        await AsyncStorage.setItem("userData", JSON.stringify(data));
        console.log("Updated userData:", data);

        Alert.alert("Success", "Password updated successfully.");
        navigation.navigate("Login"); // Navigate back to the profile screen
      } else {
        Alert.alert("Error", data.error || "Failed to update password");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.safeView} behavior="padding">
      <View style={styles.topSentenceView}>
        <Text style={styles.topSentence}>
          To set a new password, please insert your current password first.
        </Text>
      </View>

      <View style={styles.inputView}>
        <View style={styles.labelView}>
          <Text style={styles.labelText}>Enter user name</Text>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="User name"
            style={styles.InputValue}
            value={username}
            onChangeText={setUsername}
            keyboardType="default"
          />
        </View>
      </View>

      <View style={styles.inputView}>
        <View style={styles.labelView}>
          <Text style={styles.labelText}>Your current password</Text>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="old password"
            style={styles.InputValue}
            secureTextEntry={!showPassword}
            value={oldPassword}
            onChangeText={setOldPassword}
            keyboardType="default"
          />
          <TouchableOpacity
            style={styles.eyebutton}
            onPress={toggleShowingPassword}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#3a5e7a"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputView}>
        <View style={styles.labelView}>
          <Text style={styles.labelText}>Your new password</Text>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="new password"
            style={styles.InputValue}
            secureTextEntry={!showPassword}
            value={newPassword}
            onChangeText={setNewPassword}
            keyboardType="default"
          />
          <TouchableOpacity
            style={styles.eyebutton}
            onPress={toggleShowingPassword}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#3a5e7a"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.recoverButton}
        onPress={handleForgotPassword}
      >
        <Text style={styles.passwordRecover}>Forgot your Password?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export default ChangeAdminPassword;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  topSentence: {
    textAlign: "center",
    fontSize: 18,
    color: "#3a5e7a",
    fontWeight: "500",
  },
  topSentenceView: {
    padding: 10,
  },
  labelView: {
    marginBottom: 10,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: "#3a5e7a",
  },
  labelText: {
    fontSize: 18,
    color: "#3a5e7a",
    fontWeight: "500",
  },
  inputView: {
    backgroundColor: "#cfcece4a",
    width: "95%",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
  },
  InputValue: {
    flex: 1,
    fontSize: 16,
  },
  eyebutton: {
    padding: 10,
  },
  button: {
    backgroundColor: "#3a5e7a",
    padding: 15,
    borderRadius: 30,
    width: "40%",
    marginVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  passwordRecover: {
    color: "#3a5e7a",
    fontSize: 13,
    textAlign: "center",
  },
  recoverButton: {
    padding: 20,
  },
});
