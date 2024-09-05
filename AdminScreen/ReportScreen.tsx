import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from "react-native";

const ReportScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState("monthly");
  const [modalVisible, setModalVisible] = useState(false);
  const [createdby, setCreatedby] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const periods = ["monthly", "trimonthly", "yearly"];

  // Validation function to check if all fields are filled
  const validateFields = () => {
    if (!title || !description || !createdby) {
      return false;
    }
    return true;
  };

  const handleGenerateReport = async () => {
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
      const response = await fetch(`http://192.168.1.87:1010/generateReport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          period,
          createdby,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Report generated successfully:", data);
        navigation.navigate("Report detail", { reportData: data });
      } else {
        const errorData = await response.json(); // Capture and log detailed error
        console.error("Failed to generate report", errorData);
      }
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter report title"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Enter report description"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Created by:</Text>
          <TextInput
            value={createdby}
            onChangeText={setCreatedby}
            placeholder="Who is creating this report?"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Report Period:</Text>
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
            onPress={handleGenerateReport}
          >
            <Text style={styles.buttonText}>Generate Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  safeview: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  pickerButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginTop: 8,
    backgroundColor: "#fff",
  },
  pickerButtonText: {
    fontSize: 16,
    color: "#333",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#3a5e7a",
    width: 180,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  buttonview: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
});
