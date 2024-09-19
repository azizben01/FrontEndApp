import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const AdminSettingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleHelp = () => {
    navigation.navigate("Help");
  };

  const HandlePrivacyPolicy = () => {
    navigation.navigate("Privacy Policy");
  };

  const HandleToS = () => {
    navigation.navigate("Terms of Services");
  };
  const handleContactSupport = (): void => {
    Alert.alert(
      "Contact Support",
      "Please email us at swiftpay24.dev@gmail.com"
    );
  };

  return (
    <SafeAreaView style={styles.containerSafe}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.containerview}>
        <TouchableOpacity style={styles.settingButton} onPress={handleHelp}>
          <View style={styles.lefticon}>
            <Feather name="help-circle" size={18} color="white" />
          </View>
          <Text style={styles.settingText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={HandlePrivacyPolicy}
        >
          <View style={styles.lefticon}>
            <Feather name="shield" size={18} color="white" />
          </View>
          <Text style={styles.settingText}> Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={HandleToS}>
          <View style={styles.lefticon}>
            <FontAwesome5 name="file-contract" size={18} color="white" />
          </View>
          <Text style={styles.settingText}> Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={HandleToS}>
          <View style={styles.lefticon}>
            <Ionicons name="information" size={20} color="white" />
          </View>
          <Text style={styles.settingText}> App Version Information </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.settingButton}
          onPress={handleContactSupport}
        >
          <View style={styles.lefticon}>
            <Feather name="phone" size={18} color="white" />
          </View>
          <Text style={styles.settingText}> Contact Support </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AdminSettingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cfcece4a",
  },
  containerSafe: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    marginLeft: 20,
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
    color: "#3a5e7a",
  },
  titleView: {
    padding: 25,
  },
  settingButton: {
    // marginLeft: 15,
    padding: 10,
    margin: 5,
    backgroundColor: "#3a5e7a",
    borderRadius: 30,
    width: "90%",
    flexDirection: "row",
  },
  settingText: {
    fontSize: 18,
    color: "white",
    padding: 4,
  },

  RightIcon1: {
    paddingLeft: "70%",
  },
  RightIcon2: {
    // paddingLeft: 96
    paddingLeft: "20%",
  },
  RightIcon3: {
    // paddingLeft: 174
    paddingLeft: "50%",
  },
  RightIcon4: {
    // paddingLeft: 163
    paddingLeft: "40%",
  },
  lefticon: {
    padding: 5,
  },
  containerview: {
    justifyContent: "center",
    marginLeft: 15,
  },
});
