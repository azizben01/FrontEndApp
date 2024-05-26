import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { NavigationProp } from '@react-navigation/native';
import Icon from '@expo/vector-icons/Ionicons';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';



const TransactionScreen = () => {

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">

            <Text style={styles.title} >
                Here is the user profile
            </Text>
        </KeyboardAvoidingView>

    );
};

export default TransactionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B0C4DE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#663399'
    },
});
