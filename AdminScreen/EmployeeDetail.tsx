import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  useRoute,
  RouteProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlipInEasyX } from "react-native-reanimated";

type Employees = {
  employeefullname: string;
  username: string;
  email: string;
  phonenumber: string;
  created: string;
  additionaldata: string;
  position: string; // Include position field for display
};

type ParamList = {
  employeedetails: {
    employeedetail: Employees;
  };
};

const EmployeeDetail = () => {
  const route = useRoute<RouteProp<ParamList, "employeedetails">>();
  const { employeedetail } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // Function to delete the employee
  const handleRemoveEmployee = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.87:1010/deleteemployee/${employeedetail.username}`, // Make sure your DELETE API is set up correctly
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        Alert.alert("Success", "Employee removed successfully.");
        navigation.goBack(); // Go back to the previous screen
      } else {
        Alert.alert("Error", "Failed to remove employee.");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      Alert.alert("Error", "An error occurred while deleting the employee.");
    }
  };

  // Function to confirm employee deletion
  const confirmRemoveEmployee = () => {
    Alert.alert(
      "Remove Employee",
      "Are you sure you want to remove this employee?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", style: "destructive", onPress: handleRemoveEmployee },
      ]
    );
  };

  // Function to navigate to add transaction screen
  const handleAddTransaction = () => {
    navigation.navigate("admin transaction form", { employee: employeedetail });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Full Name:</Text>
        <Text style={styles.value}>{employeedetail.employeefullname}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{employeedetail.username}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{employeedetail.email}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{employeedetail.phonenumber}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Position:</Text>
        <Text style={styles.value}>{employeedetail.position}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Date Created:</Text>
        <Text style={styles.value}>{employeedetail.created}</Text>
      </View>
      <View style={styles.buttonview}>
        {/* TouchableOpacity for removing employee */}
        <TouchableOpacity
          style={styles.buttonRemove}
          onPress={confirmRemoveEmployee}
        >
          <Text style={styles.buttonText}>Remove Employee</Text>
        </TouchableOpacity>

        {/* TouchableOpacity for adding a transaction */}
        <TouchableOpacity
          style={styles.buttonAddTransaction}
          onPress={handleAddTransaction}
        >
          <Text style={styles.buttonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EmployeeDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#cfcece4a",
  },
  row: {
    flexDirection: "row",
    marginVertical: 14,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    width: 150,
    color: "#3a5e7a",
  },
  value: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonAddTransaction: {
    padding: 10,
    backgroundColor: "#3a5e7a",
    borderRadius: 25,
    margin: 10,
  },
  buttonRemove: {
    padding: 10,
    backgroundColor: "#3a5e7a",
    borderRadius: 25,
    margin: 10,
  },
  buttonText: {
    color: "white",
  },
  buttonview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
  },
});
