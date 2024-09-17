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

const ChangeAdminEmail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [oldPassword, setOldPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [adminname, setAdminname] = useState("");

  const handleForgotPassword = () => {
    navigation.navigate("RequestPasswordReset");
  };

  const handleUpdateEmail = async () => {
    try {
      const response = await fetch(
        "http://192.168.1.74:1010/changeadminemail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ adminname, oldPassword, newEmail }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Ensure that 'data' contains updated user data
        await AsyncStorage.setItem("userData", JSON.stringify(data));
        console.log("Updated userData:", data);

        Alert.alert("Success", "Email updated successfully.");
        navigation.navigate("admin login"); // Navigate back to the profile screen
      } else {
        if (data.error === "Adminname incorrect.") {
          Alert.alert(
            "Error",
            "Adminname is incorrect. Please check and try again."
          );
        } else if (data.error === "Current password is incorrect.") {
          Alert.alert(
            "Error",
            "Current password is incorrect. Please try again."
          );
        } else {
          Alert.alert("Error", data.error || "Failed to update email");
        }
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.safeView} behavior="padding">
      <View style={styles.topSentenceView}>
        <Text style={styles.topSentence}>
          To change your email, please insert your current password and the new
          email.
        </Text>
      </View>

      <View style={styles.inputView}>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Admin user name"
            style={styles.InputValue}
            value={adminname}
            onChangeText={setAdminname}
            keyboardType="default"
          />
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Current password"
            style={styles.InputValue}
            secureTextEntry={true}
            value={oldPassword}
            onChangeText={setOldPassword}
            keyboardType="default"
          />
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="New email"
            style={styles.InputValue}
            value={newEmail}
            onChangeText={setNewEmail}
            keyboardType="email-address"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdateEmail}>
        <Text style={styles.buttonText}>Update Email</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.recoverButton}
        onPress={handleForgotPassword}
      >
        <Text style={styles.passwordRecover}>Forgot your Password?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ChangeAdminEmail;

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
    borderColor: "#3a5e7a",
  },
  labelText: {
    fontSize: 18,
    color: "#3a5e7a",
    fontWeight: "500",
  },
  inputView: {
    backgroundColor: "transparent",
    width: "100%",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#cfcece4a",
    padding: 12,
    borderRadius: 30,
    marginBottom: 10,
  },
  InputValue: {
    flex: 1,
    fontSize: 16,
  },
  eyebutton: {},
  button: {
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
  passwordRecover: {
    color: "#3a5e7a",
    fontSize: 13,
    textAlign: "center",
  },
  recoverButton: {
    padding: 20,
  },
});
