import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import Ionicons from "@expo/vector-icons/Ionicons";

const ResetPassword = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleShowingPassword = () => {
    setShowPassword(!showPassword);
  };

  // withdraw the email from the asyncStorage
  useEffect(() => {
    const getEmail = async () => {
      const storedEmail = await AsyncStorage.getItem("resetEmail");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    };
    getEmail();
  }, []);

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.87:1010/ResetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Password reset successfully!");
        navigation.navigate("SuccessReset"); // Redirect to login page
      } else {
        alert(data.error || "Failed to reset password");
      }
    } catch (error) {
      alert("Error resetting password");
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.safeView} behavior="padding">
      <View style={styles.topSentenceView}>
        <Text style={styles.topSentence}>
          Update your password by providing a new one !
        </Text>
      </View>

      <View style={styles.inputView}>
        <View style={styles.labelView}>
          <Text style={styles.labelText}>Enter your password</Text>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="New password"
            style={styles.InputValue}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
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
          <Text style={styles.labelText}>Confirm your password</Text>
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="confirm new password"
            style={styles.InputValue}
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
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

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;

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
  },
  topSentenceView: {
    padding: 20,
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
