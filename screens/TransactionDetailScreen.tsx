import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { NavigationProp } from '@react-navigation/native';
import Icon from '@expo/vector-icons/Ionicons';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';



const TransactionScreen = () => {


    return (
              <KeyboardAvoidingView style={styles.container} behavior="padding">

              <TouchableOpacity  style={styles.footer} >
                    <Icon name ="reorder-three" size={30} color = "#333"/>
                </TouchableOpacity>

            <View style={styles.content}>
                <Text>Welcome to your Transactions!</Text>
            </View>

              </KeyboardAvoidingView>

          );
};

export default TransactionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
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

    option:{
         position: 'absolute',
        bottom: 770, // Adjust top for desired position
        right: 150, // Adjust left for desired position
        padding: 10, // Optional padding around the button
     }
});
