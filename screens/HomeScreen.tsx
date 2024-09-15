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
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg"; // Import LinearGradient from react-native-svg

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
        source={require("../assets/piggybank.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Add Svg with LinearGradient here */}
        <Svg height="100%" width="100%" style={styles.gradientOverlay}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="rgba(0, 0, 0, 0.8)" stopOpacity="1" />
              <Stop offset="1" stopColor="rgba(0, 0, 0, 0)" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#grad)" />
        </Svg>

        <View style={styles.header}>
          {userProfile && (
            <Text style={styles.userName}>
              Hello
              <View style={styles.nameview}>
                <Text style={styles.nametext}> {userProfile.Fullname} !</Text>
              </View>
            </Text>
          )}

          <View style={styles.addtransactionview}>
            <View style={styles.transactiontextview}>
              <Text style={styles.transactiontext}>
                Press the button below to perform {"\n"} a new transaction.👇🏾
              </Text>
            </View>

            <View style={styles.buttonview}>
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
        </View>
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
  gradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  addTransactionButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#0000002c",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  buttonview: {
    paddingTop: 10,
  },
  TransactionbuttonText: {
    color: "#3a5e7a",
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
    color: "#ffffff", // White text for contrast
  },
  nameview: {
    marginLeft: 10,
    marginBottom: -2,
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
  transactiontextview: {
    marginBottom: 10,
  },
});
