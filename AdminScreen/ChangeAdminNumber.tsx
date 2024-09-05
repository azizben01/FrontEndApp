import {
  Alert,
  ImageBackground,
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

function ChangeAdminNumber() {
  const [oldPhoneNumber, setOldPhoneNumber] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://192.168.1.3:1010/changeNumber", {
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
    <SafeAreaView style={styles.safeView}>
      <Text style={styles.topsentence}>
        Provide your old and new number to update mobile number.
      </Text>
      <View style={styles.inputView}>
        <View style={styles.labelView}>
          <Text style={styles.labelText}>Your old phone number:</Text>
        </View>
        <TextInput
          placeholder="old phone number"
          style={styles.InputValue}
          value={oldPhoneNumber}
          onChangeText={setOldPhoneNumber}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputView}>
        <View style={styles.labelView}>
          <Text style={styles.labelText}>Your new phone number</Text>
        </View>
        <TextInput
          placeholder="new phone number"
          style={styles.InputValue}
          value={newPhoneNumber}
          onChangeText={setNewPhoneNumber}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ChangeAdminNumber;

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
  inputView: {
    backgroundColor: "#cfcece4a",
    width: "95%",
    height: 100,
    borderRadius: 10,
    fontWeight: "400",
    marginVertical: 20,
  },

  button: {
    backgroundColor: "#3a5e7a",
    width: "40%",
    padding: 18,
    borderRadius: 25,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
});
