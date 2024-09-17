import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function AdminResetSuccess() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleLogin = () => {
    navigation.navigate("admin login");
  };

  return (
    <KeyboardAvoidingView style={styles.keyboardView}>
      <Text style={styles.textStyle}>
        Your password has been successfully updated. Go to the log in page then
        log in using your new password!
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in page</Text>
        <View style={styles.iconView}>
          <MaterialIcons name="arrow-forward-ios" size={17} color="white" />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export default AdminResetSuccess;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  textStyle: {
    padding: 10,
    color: "#3a5e7a",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 30,
    fontWeight: "bold",
  },
  button: {
    position: "absolute",
    bottom: 40, // Adjust to position the button vertically
    right: 20, // Adjust to position the button horizontally
    backgroundColor: "#3a5e7a",
    borderRadius: 25,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
  },
  iconView: {
    paddingLeft: 10, // Adjust as needed for spacing between text and icon
  },
});
