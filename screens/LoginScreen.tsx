import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from "react-native";

// icons 
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';

function LoginScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = () => {
        navigation.navigate("Signup") 
    }
    const handleForgotPassword = () =>{
        navigation.navigate('RequestPasswordReset')
    }
    

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.1.87:1010/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            console.log('Login response:', result);
            if (response.ok) {
                // Store user data in AsyncStorage
                await AsyncStorage.setItem('userData', JSON.stringify(result));
                console.log('User data saved to AsyncStorage', result);
                Alert.alert('Success', 'Logged in successfully!');
                setEmail('');
                setPassword('');
                navigation.navigate("tabs");
            } else {
                Alert.alert('Error', result.error || 'Invalid email or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            Alert.alert('Error', 'Failed to log in. Please try again later.');
        }
    };
    const toggleShowingPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">
            <Text style={styles.topsentence}>Log in to Your Account</Text>

            <View style={styles.inputContainer}>
                <View style={styles.iconContainer1}>
                    <Fontisto name="email" size={16} color="#3a5e7a" />
                </View>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                />
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.iconContainer1}>
                    <Ionicons name="lock-open-outline" size={17} color="#3a5e7a" />
                </View>
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity style={styles.eyebutton} onPress={toggleShowingPassword}>
                    <Ionicons name={showPassword ? "eye-off-outline" : 'eye-outline'} size={19} color="#3a5e7a" />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.Logbutton, styles.buttonShadow]}
                    onPress={handleLogin}
                >
                    <Text style={styles.LogButtonText}>Login</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.recoverContainer}>
                <TouchableOpacity style={styles.recoverButton} onPress={handleForgotPassword}>
                    <Text style={styles.passwordRecover}>Forgot your Password ?</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.text2} >
                <Text style={styles.accountSentence}> Don't have an account? </Text>
                <TouchableOpacity
                    style={styles.signButton}
                    onPress={handleSignup}
                >
                    <Text style={styles.signButtonText}>Sign up.</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({

    iconContainer1: {
        marginLeft: 10,
        padding: 5
    },

    topsentence: {
        paddingBottom: 50,
        fontSize: 22,
        fontWeight: '700',
        color: '#3a5e7a',
        fontFamily: 'NotoMusic-Regular'
    },

    text2: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 5,
        justifyContent: 'flex-end'
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cfcece4a'

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        marginBottom: 10,
        paddingLeft: 5,
        borderRadius: 25,
        backgroundColor: '#cfcece4a',

    },
    input: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 5,
        borderRadius: 10,
        fontWeight: '400',
        height: 45,
    },

    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },

    Logbutton: {
        backgroundColor: '#3a5e7a',
        width: '130%',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
    },

    LogButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
    },

    signButton: {
        marginTop: 5,
    },

    signButtonText: {
        color: '#3a5e7a',
        fontSize: 13,
        fontWeight: '500',
        fontFamily: 'NotoMusic-Regular'
    },

    accountSentence: {
        color: 'black',
        fontSize: 13,
        marginTop: 5,
        fontFamily: 'NotoMusic-Regular'
    },

    eyebutton: {
        padding: 10,
    },

    passwordRecover: {
        color: '#3a5e7a',
        fontFamily: 'NotoMusic-Regular',
        fontSize: 13
    },

    recoverContainer: {},
    recoverButton: {
        padding: 20
    },
    
    buttonShadow: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
})
