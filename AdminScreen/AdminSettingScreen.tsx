import {
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

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const AdminSettingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleHelp = (): void => {
    console.log("Opening help...");
    navigation.navigate("Help");
  };

  const handleAccount = (): void => {
    navigation.navigate("");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView style={styles.containerSafe}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Settings</Text>
        </View>

        <TouchableOpacity style={styles.settingButton} onPress={handleHelp}>
          <View style={styles.lefticon}>
            <Feather name="help-circle" size={18} color="white" />
          </View>
          <Text style={styles.settingText}>Help</Text>
          <View style={styles.RightIcon1}>
            <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={handleAccount}>
          <View style={styles.lefticon}>
            <FontAwesome name="language" size={18} color="white" />
          </View>
          <Text style={styles.settingText}> Language Preference</Text>
          <View style={styles.RightIcon2}>
            <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={handleAccount}>
          <View style={styles.lefticon}>
            <Ionicons name="invert-mode" size={18} color="white" />
          </View>
          <Text style={styles.settingText}> App Theme</Text>
          <View style={styles.RightIcon3}>
            <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButton} onPress={handleAccount}>
          <View style={styles.lefticon}>
            <FontAwesome name="bell-o" size={18} color="white" />
          </View>
          <Text style={styles.settingText}> Notifications </Text>
          <View style={styles.RightIcon4}>
            <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    // alignItems: 'flex-start',
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
});
