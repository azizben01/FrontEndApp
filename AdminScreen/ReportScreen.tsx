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
} from "react-native";

const ReportScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState("monthly");
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const periods = ["monthly", "trimonthly", "yearly"];

  const handleGenerateReport = async () => {
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
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Report generated successfully:", data);
        navigation.navigate("Report detail");
      } else {
        console.error("Failed to generate report");
      }
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.inputContainer}>
        <Text>Title:</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter report title"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Description:</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Enter report description"
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Select Report Period:</Text>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.pickerButtonText}>{period}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
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
      </View>
      <View style={styles.buttonview}>
        <TouchableOpacity style={styles.button} onPress={handleGenerateReport}>
          <Text style={styles.buttonText}>Generate Report</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReportScreen;
const styles = StyleSheet.create({
  safeview: {
    flex: 1,
  },
  container: {
    padding: 16,
  },

  pickerButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginVertical: 8,
  },
  pickerButtonText: {
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#3a5e7a",
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonview: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    position: "absolute",
    top: 60,
    left: 110,

    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 4,
    borderRadius: 4,
    width: 200,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 10,
    paddingLeft: 5,
    borderRadius: 25,
    backgroundColor: "white",
    // backgroundColor: '#cfcece4a',
    height: 45,
  },
  input: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    borderRadius: 10,
    fontWeight: "400",
    height: 45,
  },
});
