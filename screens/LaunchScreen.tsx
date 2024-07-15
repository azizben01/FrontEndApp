import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LaunchScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        setIsCheckingLogin(false)
        if (userData) {
          setTimeout(() => {
            navigation.navigate("tabs"); // Navigate to home screen if logged in
          }, 3000); // 3 seconds delay
        } else {
          setTimeout(() => {
            navigation.navigate("Login"); // Navigate to login screen if not logged in
          }, 3000);
        }
      } catch (error) {
        console.error('Error checking login:', error);
        setIsCheckingLogin(false)
        setTimeout(() => {
          navigation.navigate("Login"); // Navigate to login screen if error occurs
        }, 3000);
      }
    };

    checkUserLogin();
  }, [navigation]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to SwiftPay 😁</Text>
      {isCheckingLogin && <ActivityIndicator size="large" color="#ffffff" />}
    </View>
  );
}

export default LaunchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a5e7a',
  },
  welcomeText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
