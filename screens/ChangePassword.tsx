import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowingPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <SafeAreaView style={styles.safeView}>

            <View style={styles.topSentenceView}>
                <Text style={styles.topSentence}>
                    To set a new password, please insert your current {'\n'} password first.
                </Text>
            </View>

            <View style={styles.inputView}>
                <View style={styles.labelView}>
                    <Text style={styles.labelText}>Your current password</Text>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder='old password'
                        style={styles.InputValue}
                        secureTextEntry={!showPassword}
                        keyboardType='default'
                    />
                    <TouchableOpacity style={styles.eyebutton} onPress={toggleShowingPassword}>
                        <Ionicons name={showPassword ? "eye-off-outline" : 'eye-outline'} size={24} color="#3a5e7a" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputView}>
                <View style={styles.labelView}>
                    <Text style={styles.labelText}>Your new password</Text>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder='new password'
                        style={styles.InputValue}
                        secureTextEntry={!showPassword}
                        keyboardType='default'
                    />
                    <TouchableOpacity style={styles.eyebutton} onPress={toggleShowingPassword}>
                        <Ionicons name={showPassword ? "eye-off-outline" : 'eye-outline'} size={24} color="#3a5e7a" />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.recoverButton}>
                <Text style={styles.passwordRecover}>Forgot your Password?</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ChangePassword;

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    topSentence: {
        textAlign: 'center',
        fontSize: 16,
    },
    topSentenceView: {
        padding: 10,
    },
    labelView: {
        marginBottom: 10,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#3a5e7a'
    },
    labelText: {
        fontSize: 18,
        color: '#3a5e7a',
        fontWeight: '500',
    },
    inputView: {
        backgroundColor: '#cfcece4a',
        width: '95%',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        //  borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
    },
    InputValue: {
        flex: 1,
        fontSize: 16,
    },
    eyebutton: {
        padding: 10,
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
    passwordRecover: {
        color: '#3a5e7a',
        fontSize: 13,
        textAlign: 'center',
    },
    recoverButton: {
        padding: 20,
    },
});
