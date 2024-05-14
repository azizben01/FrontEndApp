import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert } from "react-native";
// icons 
import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';







function LoginScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const handleSignup = () => {
        navigation.navigate("Signup")
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        // Retrieve user information from AsyncStorage
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const { email: storedEmail, password: storedPassword } = JSON.parse(userData);
                if (email === storedEmail && password === storedPassword) {
                    // Login successful
                    Alert.alert('Success', 'Logged in successfully!');
                    navigation.navigate("tabs")
                } else {
                    // Incorrect email or password
                    Alert.alert('Error', 'Invalid email or password.');
                }
            } else {
                // No user data found
                Alert.alert('Error', 'No user found. Please sign up first.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            Alert.alert('Error', 'Failed to log in. Please try again later.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding">
            <View style={styles.inputContainer}>
                <View style={styles.iconContainer1}>
                    <Fontisto name="email" size={18} color="black" />

                </View>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.iconContainer1}>
                    {/* <FontAwesome5 name="key" size={18} color="black" /> */}
                    <AntDesign name="lock" size={18} color="black" />
                </View>
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.Logbutton}
                    onPress={handleLogin}
                >
                    <Text style={styles.LogButtonText}>Login</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.text2} >
                <Text style={styles.accountSentence}> Don't have an account? </Text>
                <TouchableOpacity
                    style={styles.signButton}
                    onPress={handleSignup}
                >
                    <Text style={styles.signButtonText}>Sign up</Text>
                </TouchableOpacity>
            </View>

        </KeyboardAvoidingView>

    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    iconContainer1: {
        marginLeft: 10,
        marginHorizontal: 'auto'

    },

    text2: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 5

    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B0C4DE'

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        height: 50,
        marginBottom: 10,
        padding: 2,
        borderRadius: 20,
        backgroundColor: '#f2f2f2',

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
        marginHorizontal: 'auto'
    },

    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40

    },

    Logbutton: {
        backgroundColor: '#5b5f97', //0782F9
        width: '150%',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center'

    },

    LogButtonText: {
        color: 'white',
        fontSize: 15,

    },

    signButton: {
        marginTop: 5, // distance between the 2 buttons

    },

    signButtonText: {
        color: 'black',
        fontSize: 17,
        fontWeight: '500',
        textDecorationLine: 'underline'

    },

    accountSentence: {
        color: '#26344f',
        fontSize: 15,
        marginTop: 5,
    }
})
