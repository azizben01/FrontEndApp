import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";

// icons
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function AccountScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handleChangeNumber = () => {
    navigation.navigate("Change number");
  };
  const handleChangePassword = () => {
    navigation.navigate("Change password");
  };

  const handleDeleteAccount = () => {
    navigation.navigate("Delete");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topsentenceview}>
        <Text style={styles.topsentencetext}>Edit your profile</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          <Feather name="user" size={18} color="#fff" />
        </View>
        <Text style={styles.text1}>Change Email</Text>
        <View style={styles.arrowContainer}>
          <MaterialIcons name="arrow-forward-ios" size={18} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <View style={styles.iconContainer}>
          <Ionicons name="key-outline" size={18} color="#fff" />
        </View>
        <Text style={styles.Passwordtext1}>Change Password</Text>
        <View style={styles.arrowContainer}>
          <MaterialIcons name="arrow-forward-ios" size={18} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleChangeNumber}>
        <View style={styles.iconContainer}>
          <Feather name="smartphone" size={18} color="white" />
        </View>
        <Text style={styles.text1}>Change Number</Text>
        <View style={styles.arrowContainer}>
          <MaterialIcons name="arrow-forward-ios" size={18} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
        <View style={styles.iconContainer}>
          <EvilIcons name="trash" size={24} color="#fff" />
        </View>
        <Text style={styles.text1}>Delete My Account</Text>
        <View style={styles.arrowContainer}>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    backgroundColor: "#cfcece4a",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  button: {
    backgroundColor: "#3a5e7a",
    padding: 10,
    borderRadius: 30,
    marginLeft: 20,
    marginBottom: 5,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text1: {
    fontSize: 16,
    color: "white",
    flex: 1,
  },

  Passwordtext1: {
    fontSize: 16,
    color: "white",
    flex: 1,
  },
  iconContainer: {
    paddingRight: 10,
    paddingBottom: 5,
  },

  arrowContainer: {},
  topsentenceview: {
    width: "100%",
    padding: 15,
  },
  topsentencetext: {
    fontSize: 24,
    textAlign: "center",
    color: "#3a5e7a",
    fontWeight: "bold",
  },
});

export default AccountScreen;
