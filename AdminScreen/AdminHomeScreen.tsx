import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  useNavigation,
  ParamListBase,
  useFocusEffect,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Employees = {
  employeefullname: string;
  username: string;
  email: string;
  phonenumber: string;
  created: string;
  additionaldata: string;
  // add a positon and starting date for the employee
};

const AdminHomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [employees, setEmployees] = useState<Employees[]>([]);

  // Function to navigate to the employee detail screen
  const HandleEmployeeDetails = (employeedetail: Employees) => {
    console.log("Navigating with employees:", employeedetail);
    navigation.navigate("employeedetails", { employeedetail });
  };

  // Function to fetch transactions from the backend
  const handleDisplayEmployee = async () => {
    try {
      const response = await fetch(
        "http://172.20.10.2:1010/RetrieveEmployees",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        setEmployees(data || []);
        console.log("employees retrieved successfully:");
      } else {
        console.error("Failed to retrieve employees");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      // Handle network errors or other unexpected errors
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Run effect every time HomeScreen is focused
      handleDisplayEmployee();
      // Add your effect code here
      // For example, fetching data or updating state
      return () => {
        // Cleanup code (optional)
      };
    }, [])
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={styles.containerSafe}>
        <View style={{}}>
          <Text style={styles.sentence1}>Employee list</Text>
          <Text style={styles.sentence2}>
            Bellow is the list of all the current employees
          </Text>
        </View>

        <View style={styles.ContainerView}>
          {employees.length > 0 ? (
            <FlatList
              data={employees}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.touchableTransaction}
                  onPress={() => HandleEmployeeDetails(item)}
                >
                  <Text style={styles.content}>
                    Full name: {item.employeefullname}
                  </Text>
                  <Text style={styles.content}>
                    Phone number: {item.phonenumber}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.noTransactionsView}>
              <Text style={styles.noTransactionsText}>
                No employee registered yet.
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AdminHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000",
  },
  containerSafe: {
    flex: 1,
  },
  touchableTransaction: {
    padding: 12,
    marginVertical: 3,
    backgroundColor: "#fff",
    borderRadius: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    shadowColor: "#0000002c",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  ContainerView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    fontSize: 15,
    flexWrap: "wrap",
    // flexShrink: 1, // Allow items to shrink to avoid overflow
    color: "#3a5e7a",
    marginBottom: 5, // Add some spacing between items
    flexBasis: "auto", // Allow items to take only as much space as needed
  },

  sentence1: {
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 25,
    fontWeight: "bold",
    color: "#3a5e7a",
  },
  sentence2: {
    fontSize: 15,
    paddingLeft: 15,
    marginBottom: 20,
    color: "#3a5e7a",
  },

  noTransactionsText: {
    color: "#3a5e7a",
    fontSize: 17,
    textAlign: "center",
  },
  noTransactionsView: {
    flex: 1, // display first in flex before justifying.
    justifyContent: "center", // to move the whole text at the center of the page.
  },
});
