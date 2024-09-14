import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Employeereport = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState("June"); // Default to June
  const [username, setUsername] = useState(""); // New username state
  const [modalVisible, setModalVisible] = useState(false);
  const [createdby, setCreatedby] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // Updated to include months starting from June
  const periods = [
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Validation function to check if all fields are filled
  const validateFields = () => {
    if (!title || !description || !createdby || !username) {
      return false;
    }
    return true;
  };

  const handleGenerateEmployeeReport = async () => {
    // Check if fields are valid before proceeding
    if (!validateFields()) {
      Alert.alert(
        "Validation Error",
        "Please fill in all fields before generating the report",
        [
          {
            text: "OK",
            style: "destructive",
          },
        ]
      );
      return;
    }
    try {
      const response = await fetch(
        `http://192.168.1.87:1010/generateEmployeereport`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            period,
            createdby,
            username, // Include the username in the request body
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("User report generated successfully:", data);
        navigation.navigate("employeereportdetail", { reportData: data });
      } else {
        const errorData = await response.json(); // Capture and log detailed error
        console.error("Failed to generate user report", errorData);
      }
    } catch (error) {
      console.error("Error generating user report:", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.safeview} behavior="padding">
      <View style={styles.container}>
        <View style={styles.topsentenceview}>
          <Text style={styles.topsentencetext}>Make an employee report</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter report title"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Enter report description"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={createdby}
            onChangeText={setCreatedby}
            placeholder="Who is creating this report?"
            style={styles.input}
          />
        </View>

        {/* New input field for username */}
        <View style={styles.inputContainer}>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter employee username "
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.pickerButtonText}>{period}</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalContainer}>
            <FlatList
              data={periods}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setPeriod(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>

        <View style={styles.buttonview}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleGenerateEmployeeReport}
          >
            <Text style={styles.buttonText}>Generate Employee Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Employeereport;

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  pickerButton: {
    padding: 13,
    borderColor: "#ccc",
    borderRadius: 25,
    marginTop: 3,
    backgroundColor: "#fff",
    shadowColor: "#0000002c",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  pickerButtonText: {
    fontSize: 14,
    color: "#333",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
  },
  button: {
    backgroundColor: "#3a5e7a",
    width: "100%",
    padding: 13,
    borderRadius: 35,
    alignItems: "center",
  },
  buttonview: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalText: {
    fontSize: 16,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 13,
    marginBottom: -10,
    backgroundColor: "#fff",
    fontSize: 14,
    shadowColor: "#0000002c",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  topsentenceview: {
    padding: 15,
  },
  topsentencetext: {
    fontSize: 24,
    color: "#3a5e7a",
    fontWeight: "bold",
    textAlign: "center",
  },
});
