import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import AdminProfileScreen from '../AdminScreen/AdminProfileScreen';  // Example screen
import { View, Text, StyleSheet } from "react-native";
const Tab = createBottomTabNavigator();

import { Feather } from "@expo/vector-icons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AdminProfileScreen from "../AdminScreen/AdminProfileScreen";
import AdminHomeScreen from "../AdminScreen/AdminHomeScreen";
import AdminTransactionListScreen from "../AdminScreen/AdminTransactionListScreen";
import ReportScreen from "../AdminScreen/ReportScreen";
import AdminSettingScreen from "../AdminScreen/AdminSettingScreen";

function AdminTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="AdminHome"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "white", elevation: 5 },
      }}
    >
      <Tab.Screen
        name="AdminHome"
        component={AdminHomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.iconContainer}>
                <Feather
                  name="home"
                  size={20}
                  color={focused ? "#3a5e7a" : "black"}
                />
                <Text style={focused ? styles.TextOnFocus : styles.normalIcon}>
                  Home
                </Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="AdminProfile"
        component={AdminProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.iconContainer}>
                <Feather
                  name="user"
                  size={20}
                  color={focused ? "#3a5e7a" : "black"}
                />
                <Text style={focused ? styles.TextOnFocus : styles.normalIcon}>
                  Profile
                </Text>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="AdminTransactionList"
        component={AdminTransactionListScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.iconContainer}>
                <Ionicons
                  name="wallet-outline"
                  size={20}
                  color={focused ? "#3a5e7a" : "black"}
                />
                <Text style={focused ? styles.TextOnFocus : styles.normalIcon}>
                  Transaction List
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.iconContainer}>
                <FontAwesome6
                  name="money-bill-trend-up"
                  size={20}
                  color={focused ? "#3a5e7a" : "black"}
                />
                <Text style={focused ? styles.TextOnFocus : styles.normalIcon}>
                  Report
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Adminsettings"
        component={AdminSettingScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={styles.iconContainer}>
                <SimpleLineIcons
                  name="settings"
                  size={20}
                  color={focused ? "#3a5e7a" : "black"}
                />
                <Text style={focused ? styles.TextOnFocus : styles.normalIcon}>
                  Settings
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    marginTop: 10,
  },
  TextOnFocus: {
    // text
    color: "#3a5e7a",
    fontSize: 11,
    textAlign: "center",
  },
  normalIcon: {
    color: "black",
    fontSize: 11,
    textAlign: "center",
  },
});
export default AdminTabNavigator;
