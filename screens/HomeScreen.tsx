import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Button, Alert, FlatList, ActivityIndicator } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomepageScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const navigateToForm =() => {
        navigation.navigate("TransactionForm")
    }
    const TransactionListScreen = () => {
        navigation.navigate("TransactionList")
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.pagecontainer}>

                <Button
                title="View all transactions"
                onPress={TransactionListScreen}
                />
            </View>
            <TouchableOpacity
            onPress={navigateToForm}
            style = {styles.transactionButton}>
                <Text style = { styles.TransactionbuttonText}>Add transaction</Text>
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
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderColor: 'blue',
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
        marginTop: 10,
        marginBottom: 0
    },
    button: {
        alignItems: "center",
        marginBottom: 20
    },
    buttonText: {
        marginTop: 5,
        fontSize: 14,
        color: "#333",
    },

    viewposition:{
        justifyContent: 'flex-end',
        marginBottom: 10,
        backgroundColor: 'blue',
        marginTop: 'auto'

    },

    view:{
      backgroundColor: 'yellow'

    },

pagecontainer: {
    borderWidth: 1,
    justifyContent: 'flex-end',
    color: 'red',
    paddingHorizontal: '25%',
    paddingVertical:'65%',
    borderRadius: 60,
    marginBottom: 'auto',
    marginTop: '30%',
    borderBottomWidth: 10,
    backgroundColor: 'white'

},

transactionButton:{
alignItems: "center",
marginBottom: 10, // Adjust spacing as needed
marginTop: 10,
backgroundColor: "#f0f0f0", // Optional background color for the Add button
padding: 10, // Optional padding for the Add button
borderWidth: 2,
borderColor:"#0782F9",
width:110,
borderRadius: 30,
alignContent: 'center'
},

TransactionbuttonText:{
color:'#0782F9',
fontSize: 15,
fontWeight: '500',
},


});

