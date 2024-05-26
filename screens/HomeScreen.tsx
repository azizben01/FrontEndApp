import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Button, Alert, FlatList, ActivityIndicator } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

function HomepageScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const navigateToForm = () => {
        navigation.navigate("Transaction Form")
    }
    const TransactionListScreen = () => {
        navigation.navigate("TransactionList")
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">

            <Text style={styles.transactionView}>Press the button bellow to perform {'\n'}               new a transactions.👇🏾</Text>

            <TouchableOpacity
                onPress={navigateToForm}
                style={styles.addTransactionButton}>
                <Text style={styles.TransactionbuttonText}>Add transaction</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

export default HomepageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#B0C4DE",
    },
    transactionView: {
        color: '#663399',
        fontSize: 24,
        fontWeight: '400',
        marginBottom: 120

    },

    addTransactionButton: {
        backgroundColor: '#5b5f97',
        width: '40%',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center'
    },

    TransactionbuttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
    },


});

