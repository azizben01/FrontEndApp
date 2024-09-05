import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

function AdminAccount() {
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
      <TouchableOpacity style={styles.button}>
        <View style={styles.iconContainer}>
          <Feather name="user" size={24} color="#fff" />
        </View>
        <Text style={styles.text1}>Account Information</Text>
        <View style={styles.arrowContainer}>
          <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <View style={styles.iconContainer}>
          <Ionicons name="key-outline" size={24} color="#fff" />
        </View>
        <Text style={styles.Passwordtext1}>Change Password</Text>
        <View style={styles.arrowContainer}>
          <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleChangeNumber}>
        <View style={styles.iconContainer}>
          <Feather name="smartphone" size={24} color="white" />
        </View>
        <Text style={styles.text1}>Change Number</Text>
        <View style={styles.arrowContainer}>
          <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="heart-broken-outline"
            size={24}
            color="#fff"
          />
        </View>
        <Text style={styles.text1}>Delete My admin Account</Text>
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#3a5e7a",
    padding: 10,
    borderRadius: 30,
    marginLeft: 20,
    marginBottom: 15,
    width: "90%",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text1: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    flex: 1,
  },

  Passwordtext1: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    flex: 1,
  },

  iconContainer: {
    paddingRight: 10,
    paddingBottom: 5,
  },

  arrowContainer: {},
});
export default AdminAccount;
