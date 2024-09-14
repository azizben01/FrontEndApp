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
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";

type Adminprofile = {
  adminname: string;
  email: string;
  status: string;
  fullname: string;
  phoneNumber: string;
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
        console.log("retrieved admin data:", adminData);
        const parsedAdminData = JSON.parse(adminData);
        setAdminProfile(parsedAdminData);
      } else {
        console.log("No admin data found in AsyncStorage", adminData);
      }
    } catch (error) {
      console.error("Error fetching user data from AsyncStorage:", error);
    }
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
            Welcome
            <View style={styles.nameview}>
              <Text style={styles.namevalue}>{AdminProfile.fullname} !</Text>
            </View>
          </Text>
        )}
      </View>
      {AdminProfile ? (
        <View style={styles.profileContainer}>
          <View style={styles.profileView}>
            <View style={styles.iconContainer1}>
              <Feather name="user" size={18} color="#fff" />
            </View>
            <Text style={styles.labelText}>Admin name: </Text>
            <Text style={styles.value}>{AdminProfile.fullname}</Text>
          </View>
          <View style={styles.profileView}>
            <View style={styles.iconContainer1}>
              <Feather name="user" size={18} color="#fff" />
            </View>
            <Text style={styles.labelText}>Admin username: </Text>
            <Text style={styles.value}>{AdminProfile.adminname}</Text>
          </View>
          <View style={styles.profileView}>
            <View style={styles.iconContainer1}>
              <Fontisto name="email" size={18} color="#fff" />
            </View>
            <Text style={styles.labelText}>Email: </Text>
            <Text style={styles.value}>{AdminProfile.email}</Text>
          </View>
          <View style={styles.profileView}>
            <View style={styles.iconContainer1}>
              <Feather name="phone" size={18} color="#fff" />
            </View>
            <Text style={styles.labelText}>Mobile number: </Text>
            <Text style={styles.value}>{AdminProfile.phoneNumber}</Text>
          </View>
          <View style={styles.profileView}>
            <View style={styles.iconContainer1}>
              <AntDesign name="poweroff" size={18} color="#fff" />
            </View>
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
    justifyContent: "center",
  },
  listView: {
    flex: 1,
    marginLeft: 15,
  },
  profileContainer: {
    padding: 20,
    flexDirection: "column",
    borderRadius: 15,
    marginTop: 10,
    width: "100%",
    backgroundColor: "transparent",
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
    color: "#ff6b6b",
    fontSize: 15,
    fontFamily: "Verdana",
  },
  logButton: {
    backgroundColor: "#fff",
    width: "47%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginBottom: 10,
    shadowColor: "#0000002c",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  editText: {
    color: "#3a5e7a",
    fontSize: 15,
  },
  editButton: {
    backgroundColor: "#fff",
    width: "47%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginBottom: 10,
    shadowColor: "#0000002c",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -30,
    padding: 20,
  },

  profileView: {
    flexDirection: "row",
    marginBottom: 5,
    backgroundColor: "#3a5e7a",
    padding: 14,
    paddingLeft: 15,
    borderRadius: 27,
  },

  labelText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },

  value: {
    textAlign: "center",
    fontSize: 15,
    paddingHorizontal: 5,
    color: "#fff",
  },

  header: {
    width: "100%",
    position: "absolute",
    top: 50,
    left: 20,
    marginBottom: 30,
  },
  AdminWelcome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#3a5e7a",
  },
  namevalue: {
    fontSize: 17,
    marginLeft: 5,
    color: "#3a5a7a",
    fontWeight: "bold",
  },
  nameview: {
    marginLeft: 10,
  },
  iconContainer1: {
    marginRight: 8,
  },
});
export default AdminProfileScreen;
