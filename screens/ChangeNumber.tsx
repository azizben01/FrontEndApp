import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
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

const ChangeNumber = () => {
  const [oldPhoneNumber, setOldPhoneNumber] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://172.20.10.2:1010/changeNumber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPhoneNumber, newPhoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        // Ensure that 'data' contains updated user data
        await AsyncStorage.setItem("userData", JSON.stringify(data));
        console.log("Updated userData:", data);

        Alert.alert("Success", "Phone number updated successfully.");
        navigation.navigate("Profilepage"); // Navigate back to the profile screen
      } else {
        Alert.alert("Error", data.error || "Failed to update phone number");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.safeView} behavior="padding">
      <View style={styles.topsentenceview}>
        <Text style={styles.topsentence}>
          Provide your old and new number to update mobile number.
        </Text>
      </View>
      <View style={styles.generalinputview}>
        <View style={styles.inputView}>
          <TextInput
            placeholder="old phone number"
            style={styles.InputValue}
            value={oldPhoneNumber}
            onChangeText={setOldPhoneNumber}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            placeholder="new phone number"
            style={styles.InputValue}
            value={newPhoneNumber}
            onChangeText={setNewPhoneNumber}
            keyboardType="numeric"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ChangeNumber;

const styles = StyleSheet.create({
  topsentence: {
    padding: 10,
    fontSize: 18,
    textAlign: "center",
    color: "#3a5e7a",
    fontWeight: "500",
  },
  safeView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  InputValue: {
    paddingLeft: 15,
    backgroundColor: "#cfcece4a",
    padding: 15,
    borderRadius: 30,
    width: "100%",
    marginBottom: 10,
  },
  inputView: {
    backgroundColor: "transparent", //#cfcece4a
    width: "95%",
    borderRadius: 10,
    fontWeight: "400",
  },

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
  generalinputview: {
    paddingLeft: 18,
    width: "100%",
  },
  topsentenceview: {
    marginBottom: 20,
  },
});
