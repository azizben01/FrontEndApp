import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useNavigation,
  ParamListBase,
  useFocusEffect,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Adminprofile = {
  adminname: string;
  email: string;
  status: string;
  firstname: string;
  // add a part for the full name
};
const AdminProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [AdminProfile, setAdminProfile] = useState<Adminprofile | null>(null);

  const HandleLogout = async () => {
    try {
      Alert.alert("", "Are you sure you want to log out?", [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log("Log out canceled"),
        },
        {
          text: "Log out",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("AdminData");
            navigation.navigate("admin login");
          },
        },
      ]);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate("admin account");
  };

  const fetchAdminData = async () => {
    try {
      const adminData = await AsyncStorage.getItem("AdminData");
      if (adminData) {
        const parsedAdminData = JSON.parse(adminData);
        setAdminProfile(parsedAdminData);
      } else {
        console.log("No admin data found in AsyncStorage", adminData);
      }
    } catch (error) {
      console.error("Error fetching user data from AsyncStorage:", error);
    }
  };

  const handleAddTransaction = () => {
    navigation.navigate("admin transaction form");
  };

  useFocusEffect(
    useCallback(() => {
      fetchAdminData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.containerSafe}>
      <View style={styles.header}>
        {AdminProfile && (
          <Text style={styles.AdminWelcome}>
            Welcome {AdminProfile.firstname} !
          </Text>
        )}
      </View>
      {/* <View>
        <Text style={styles.title}>Profile</Text>
      </View> */}

      {AdminProfile ? (
        <View style={styles.profileContainer}>
          <View style={styles.profileView}>
            <Text style={styles.labelText}>Adminname: </Text>
            <Text style={styles.value}>{AdminProfile.adminname}</Text>
          </View>
          <View style={styles.profileView}>
            <Text style={styles.labelText}>Email: </Text>
            <Text style={styles.value}>{AdminProfile.email}</Text>
          </View>
          <View style={styles.profileView}>
            <Text style={styles.labelText}>Status: </Text>
            <Text style={styles.value}>{AdminProfile.status}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.noProfileContainer}>
          <Text style={styles.noProfileText}>
            No profile information available
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editText}>Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logButton} onPress={HandleLogout}>
          <Text style={styles.logText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSafe: {
    flex: 1,
  },
  listView: {
    flex: 1,
    marginLeft: 15,
  },
  profileContainer: {
    padding: 20,
    flexDirection: "column",
    borderRadius: 15,
    marginTop: 80,
    marginLeft: 20,
    width: "87%",
    backgroundColor: "#cfcece4a",
  },
  content: {
    marginLeft: 10,
    paddingTop: 5,
    color: "black",
    fontSize: 15,
  },
  noProfileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noProfileText: {
    fontSize: 18,
    color: "gray",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    padding: 20,
    color: "#3a5e7a",
  },
  logText: {
    color: "#B22222",
    fontSize: 17,
    fontFamily: "Verdana",
  },
  logButton: {
    backgroundColor: "#f8d7da",
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginBottom: 10,
  },
  editText: {
    color: "white",
    fontSize: 15,
  },
  editButton: {
    backgroundColor: "#3a5e7a",
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginBottom: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  profileView: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
  },

  labelText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#3a5e7a",
  },

  value: {
    textAlign: "center",
    fontSize: 16,
    paddingHorizontal: 12,
  },

  header: {
    width: "100%",
    position: "absolute",
    top: 50,
    left: 20,
    marginBottom: 30,
  },
  AdminWelcome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3a5e7a",
  },
});
export default AdminProfileScreen;
