import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import {
  useNavigation,
  ParamListBase,
  useFocusEffect,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient"; // Import LinearGradient

type UserProfile = {
  username: string;
  phone_number: string;
  email: string;
  Fullname: string;
};

function HomepageScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const navigateToForm = () => {
    navigation.navigate("Transaction Form");
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground
        source={require("../assets/twoHandsWallet.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Add LinearGradient here */}
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "rgba(0,0,0,0)"]} // Customize gradient colors
          style={styles.gradient}
        >
          <View style={styles.header}>
            {userProfile && (
              <Text style={styles.userName}>
                Hello
                <View style={styles.nameview}>
                  <Text style={styles.nametext}> {userProfile.Fullname} !</Text>
                </View>
              </Text>
            )}

            {/* Content for the text and button */}
            <View style={styles.addtransactionview}>
              <Text style={styles.transactiontext}>
                Press the button below to perform {"\n"} a new transaction.👇🏾
              </Text>

              <TouchableOpacity
                onPress={navigateToForm}
                style={styles.addTransactionButton}
              >
                <Text style={styles.TransactionbuttonText}>
                  Add transaction
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

export default HomepageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
  },
  addTransactionButton: {
    backgroundColor: "#3a5e7a",
    width: "40%",
    padding: 18,
    borderRadius: 25,
    alignItems: "center",
  },
  TransactionbuttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
  },
  header: {
    width: "100%",
    position: "absolute",
    top: 50,
    left: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff", // Use white text for better contrast with background
  },
  nameview: {
    marginLeft: 10,
  },
  nametext: {
    fontSize: 15,
    color: "#ffffff",
  },
  addtransactionview: {
    height: "500%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  transactiontext: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "400",
    textAlign: "center",
  },
});
