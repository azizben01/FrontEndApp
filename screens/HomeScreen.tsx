import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Button, Alert, FlatList, ActivityIndicator } from "react-native";
import { useNavigation, ParamListBase, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserProfile = {
    username: string;
    phone_number: string;
    email: string;
    // add a part for the full name
}

function HomepageScreen() {

    // Also add statistics in this page. eg: number of transa, how much in total, and so 

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const navigateToForm = () => {
        navigation.navigate("Transaction Form")
    }
  

    const fetchUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const parsedUserData = JSON.parse(userData);
                setUserProfile(parsedUserData);
            } else {
                console.log('No user data found in AsyncStorage');
            }
        } catch (error) {
            console.error("Error fetching user data from AsyncStorage:", error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchUserData();
        }, [])
    );
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">

            <View style={styles.header}>
                {userProfile && (
                    <Text style={styles.userName}>Hello {userProfile.username} !</Text>
                )}
            </View>

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

  header: {
        width: '100%',
        position: 'absolute',
        top: 50,
        left: 20
  },

userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3a5e7a', 
},


});





   