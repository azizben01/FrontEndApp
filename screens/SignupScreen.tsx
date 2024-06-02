import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as SplashScreen from 'expo-splash-screen';

//icons

import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from "expo-font";

function SignupScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      return; // Prevent sending request if passwords don't match
    }
    const userData = {
      name,
      email,
      phone_number,
      password,
    };
    try {
      const response = await fetch("http://localhost:1010/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // tells the server that the data being sent in the request body is in JSON format
        },
        body: JSON.stringify(userData), // converts javaScript object userData into json string
      });

      if (response.ok) {
        // Signup successful, navigate to login screen and show user's details
        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        console.log(userData, "created successfuly");
        navigation.navigate("Login");
      } else {
        // Signup failed, handle error
        const errorMessage = await response.text();
        Alert.alert("Signup failed", errorMessage);
      }
    } catch (error) {
      // Network error or other unexpected error
      console.error(error);
      Alert.alert("Error", "Failed to signup. Please try again later.");
    }
  };

  const toggleShowingPassword = () => {
    setShowPassword(!showPassword)
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.topsentence}>Create Your Acccount</Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer1}>
          <Feather name="user" size={17} color="#3a5e7a" />
        </View>
        <TextInput
          placeholder="UserID"
          style={styles.input}
          value={name}
          onChangeText={setName} //whenever the text changes, the setName function is called and updates the name to that new input
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer1}>
          <Fontisto name="email" size={17} color="#3a5e7a" />
        </View>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer1}>
          <Feather name="phone" size={17} color="#3a5e7a" />
        </View>
        <TextInput
          placeholder="Phone Number"
          style={styles.input}
          value={phone_number}
          onChangeText={setPhone_number}
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
        <TouchableOpacity style={styles.eyebutton} onPress={toggleShowingPassword}>
          <Ionicons name={showPassword ? "eye-off-outline" : 'eye-outline'} size={19} color="#3a5e7a" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.iconContainer1}>
          <Ionicons name="lock-open-outline" size={17} color="#3a5e7a" />
        </View>
        <TextInput
          placeholder="Confirm Password"
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.eyebutton} onPress={toggleShowingPassword}>
          <Ionicons name={showPassword ? "eye-off-outline" : 'eye-outline'} size={19} color="#3a5e7a" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={handleSignup}>
        <Text style={styles.Signbutton}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.text1}>
        <Text style={styles.accountSentence}>Have an account already?</Text>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.LogButtonText}> Log in.</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignupScreen;

const styles = StyleSheet.create({
  iconContainer1: {
    marginLeft: 8,
    paddingTop: 5
  },
  topsentence: {
    paddingBottom: 50,
    fontSize: 20,
    fontWeight: '700',
    color: '#3a5e7a',
    fontFamily: 'NotoSerifDisplayBlack'
  },

  loginButton: {
    marginTop: 5,
    fontWeight: "500",
  },

  text1: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
  },

  container: {
    backgroundColor: "#cfcece4a",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 25,
    backgroundColor: "#cfcece4a",
    height: 45,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 8,
    borderRadius: 10,
    fontWeight: '400',
    height: 50,
    paddingLeft: 15
  },
  buttonContainer: {
    backgroundColor: "#3a5e7a",
    width: "80%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },

  Signbutton: {
    color: "white",
    fontSize: 13,
    textTransform: 'uppercase',
  },

  accountSentence: {
    color: "black",
    marginTop: 5,
    fontSize: 13
  },
  LogButtonText: {
    color: "#3a5e7a",
    fontWeight: "500",
    fontSize: 13,
  },
  eyebutton: {
    padding: 10
  }
});
