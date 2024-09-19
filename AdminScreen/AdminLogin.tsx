import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AdminLogin() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleShowingPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    navigation.navigate("Request code");
  };

  const handleAdminLogin = async () => {
    try {
      const response = await fetch("http://172.20.10.2:1010/adminLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log("Login response:", result);
      if (response.ok) {
        // Store user data in AsyncStorage
        await AsyncStorage.setItem("AdminData", JSON.stringify(result));
        console.log("Admin data saved to AsyncStorage", result);
        Alert.alert("Success", "Logged in successfully!");
        setEmail("");
        setPassword("");
        navigation.navigate("admintabs");
      } else {
        Alert.alert("Error", result.error || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Error", "Failed to log in. Please try again later.");
    }
  };

  const HandleEmployeeLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.topsentence}>Administrator Log in</Text>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer1}>
          <Fontisto name="email" size={16} color="#3a5e7a" />
        </View>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer1}>
          <Ionicons name="lock-open-outline" size={17} color="#3a5e7a" />
        </View>
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyebutton}
          onPress={toggleShowingPassword}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={19}
            color="#3a5e7a"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.Logbutton, styles.buttonShadow]}
          onPress={handleAdminLogin}
        >
          <Text style={styles.LogButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recoverContainer}>
        <TouchableOpacity
          style={styles.recoverButton}
          onPress={handleForgotPassword}
        >
          <Text style={styles.passwordRecover}>Forgot your Password ?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.adminView}>
        <TouchableOpacity
          style={styles.adminButton}
          onPress={HandleEmployeeLogin}
        >
          <Text style={styles.adminText}>Are you an Employee?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default AdminLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3a5e7a", //"#003554",
    // backgroundColor: '#cfcece4a'
  },

  iconContainer1: {
    marginLeft: 10,
    padding: 5,
  },

  topsentence: {
    paddingBottom: 50,
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    // color: '#3a5e7a',
    fontFamily: "NotoMusic-Regular",
  },

  text2: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 5,
    justifyContent: "flex-end",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 10,
    paddingLeft: 5,
    borderRadius: 25,
    backgroundColor: "white",
    // backgroundColor: '#cfcece4a',
    height: 45,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 10,
    fontWeight: "400",
    height: 45,
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  Logbutton: {
    backgroundColor: "#141b1fda",
    width: "130%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },

  LogButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  eyebutton: {
    padding: 10,
  },

  passwordRecover: {
    color: "white",
    fontFamily: "NotoMusic-Regular",
    fontSize: 13,
  },

  recoverContainer: {},
  recoverButton: {
    padding: 20,
  },

  buttonShadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  adminView: {
    position: "absolute",
    bottom: 40,
    right: 20,
  },
  adminButton: {},
  adminText: {
    color: "white",
    fontFamily: "NotoMusic-Regular",
    fontSize: 15,
    textDecorationLine: "underline",
  },
});
