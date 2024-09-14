import {
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";

type UserProfile = {
  username: string;
  phone_number: string;
  email: string;
  Fullname: string;
  position: string;
};

function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

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
            await AsyncStorage.removeItem("userData");
            navigation.navigate("Login");
          },
        },
      ]);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate("Account");
  };

  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUserProfile(parsedUserData);
      } else {
        console.log("No user data found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error fetching user data from AsyncStorage:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.containerSafe}>
      <View style={styles.profilesentenceview}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {userProfile ? (
        <View style={styles.profileContainer}>
          <View style={styles.profileView}>
            <View style={styles.iconContainer1}>
              <Feather name="user" size={15} color="#fff" />
            </View>
            <Text style={styles.labelText}>Name: </Text>
            <Text style={styles.value}>{userProfile.Fullname}</Text>
          </View>
          <View style={styles.profileView}>
            <View style={styles.iconContainer1}>
              <Feather name="user" size={15} color="#fff" />
            </View>
            <Text style={styles.labelText}>Username: </Text>
            <Text style={styles.value}>{userProfile.username}</Text>
          </View>
          <View style={styles.profileView}>
            <View style={styles.iconContainer1}>
              <Fontisto name="email" size={15} color="#fff" />
            </View>
            <Text style={styles.labelText}>Email: </Text>
            <Text style={styles.value}>{userProfile.email}</Text>
          </View>
          <View style={styles.profileView}>
            <View style={styles.iconContainer1}>
              <Feather name="phone" size={15} color="#fff" />
            </View>
            <Text style={styles.labelText}>Mobile Number: </Text>
            <Text style={styles.value}>{userProfile.phone_number}</Text>
          </View>
          <View style={styles.profileView}>
            <View style={styles.iconContainer1}>
              <Ionicons name="briefcase-outline" size={15} color="#fff" />
            </View>
            <Text style={styles.labelText}>Position: </Text>
            <Text style={styles.value}>{userProfile.position}</Text>
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
}

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
    color: "#3a5e7a",
    textAlign: "center",
  },
  profilesentenceview: {},
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
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },

  value: {
    textAlign: "center",
    fontSize: 14,
    paddingHorizontal: 5,
    color: "#fff",
  },

  iconContainer1: {
    marginRight: 8,
  },
});

export default ProfileScreen;
