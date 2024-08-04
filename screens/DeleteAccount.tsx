import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


import Ionicons from '@expo/vector-icons/Ionicons';
const DeleteAccount = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const toggleShowingPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch('http://192.168.1.87:1010/deleteAccount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Remove user data from AsyncStorage
                await AsyncStorage.removeItem('userData');
                console.log('User data deleted:', data);

                Alert.alert('Success', 'Account deleted successfully.');
                navigation.navigate('Login'); // Navigate back to the sign-in screen
            } else {
                Alert.alert('Error', data.error || 'Failed to delete account');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred. Please try again later.');
        }
    };

    const confirmDelete = () => {
        Alert.alert(
            "Are you sure?",
            "Deleting your account will erase all your information and it will be irreversible.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: handleDelete }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeView}>

            <View style={styles.topSentenceView}>
                <Text style={styles.topSentence}>
                    To delete your account, please enter your username and password.
                </Text>
            </View>

            <View style={styles.inputView}>
                <View style={styles.labelView}>
                    <Text style={styles.labelText}>Enter username</Text>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder='Username'
                        style={styles.InputValue}
                        value={username}
                        onChangeText={setUsername}
                        keyboardType='default'
                    />
                </View>
            </View>

            <View style={styles.inputView}>
                <View style={styles.labelView}>
                    <Text style={styles.labelText}>Your password</Text>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder='Password'
                        style={styles.InputValue}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                        keyboardType='default'
                    />
                    <TouchableOpacity style={styles.eyebutton} onPress={toggleShowingPassword}>
                        <Ionicons name={showPassword ? "eye-off-outline" : 'eye-outline'} size={24} color="#3a5e7a" />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={confirmDelete}>
                <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default DeleteAccount

const styles = StyleSheet.create({

    safeView: {
       alignItems: 'center' 
    },

    topSentenceView: {
        padding: 10
    },

    topSentence: {
        textAlign: 'center',
        fontSize: 18,
    },

    inputView: {
        backgroundColor: '#cfcece4a',
        width: '95%',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
    },

    labelView: {
        fontSize: 25,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        marginVertical: 15,
        width: "95%",
        marginHorizontal: 10

    },

    labelText: {
        fontSize: 18,
        marginBottom: 7,
        color: '#3a5e7a',
        fontWeight: '500'

    },

    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
    },

    InputValue: {
        flex: 1,
        fontSize: 16,
    },

    eyebutton: {
padding: 10
    },

    button: {
        backgroundColor: '#3a5e7a',
        padding: 15,
        borderRadius: 30,
        width: '40%',
        marginVertical: 20,
    },

    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },

})