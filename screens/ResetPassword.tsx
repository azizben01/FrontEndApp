import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

const ResetPassword = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // withdraw the email from the asyncStorage
    useEffect(() => {
     const getEmail = async () => {
     const storedEmail = await AsyncStorage.getItem('resetEmail');
     if (storedEmail) {
      setEmail(storedEmail);
     }
     };
     getEmail();
    }, []);
    
 const handleResetPassword = async () => {
 if (password !== confirmPassword) {
 alert("Passwords don't match");
 return;
}
    
   try {
   const response = await fetch('http://192.168.1.87:1010/ResetPassword', {
 method: 'POST',
headers: {
  'Content-Type': 'application/json',
   },
 body: JSON.stringify({
    email,
    password,
    }),
    });
    
    const data = await response.json();
  if (response.ok) {
 alert('Password reset successfully!');
    navigation.navigate('Login'); // Redirect to login page
   } else {
   alert(data.error || 'Failed to reset password');
 }
   } catch (error) {
     alert('Error resetting password');
     console.error(error);
    }
    };
  return (
    <SafeAreaView>
    <TextInput
    placeholder="New Password"
    value={password}
    secureTextEntry
    onChangeText={setPassword}
/>
<TextInput
    placeholder="Confirm New Password"
    value={confirmPassword}
    secureTextEntry
    onChangeText={setConfirmPassword}
/>
<TouchableOpacity onPress={handleResetPassword} >
    <Text> Update </Text>
</TouchableOpacity>
</SafeAreaView>

  )
}

export default ResetPassword

const styles = StyleSheet.create({})