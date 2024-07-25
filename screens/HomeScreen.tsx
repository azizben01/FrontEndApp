import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Button, Alert, FlatList, ActivityIndicator } from "react-native";
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

function HomepageScreen() {

    // Also add statistics in this page. eg: number of transa, how much in total, and so 

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
        backgroundColor: "#cfcece4a",
    },
    transactionView: {
        color: 'black',
        fontSize: 24,
        fontWeight: '400',
        marginBottom: 15
    },

    addTransactionButton: {
        backgroundColor: '#3a5e7a',
        width: '40%',
        padding: 18,
        borderRadius: 25,
        alignItems: 'center'
    },

    TransactionbuttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',

  },


});

