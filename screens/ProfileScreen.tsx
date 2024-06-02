import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Button, } from 'react-native';

//icons
import { Ionicons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';


function AccountInfoScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const HandleLogout = () => {
        Alert.alert(
            "",
            "Are you sure you want to log out?",
            [
                { text: "cancel", onPress: () => console.log("Log out failed"), style: "cancel" },
                { text: "Log out", onPress: () => (navigation.navigate('Login')) }
            ],
        )
    }
    const handleEditProfile = () => {
        navigation.navigate('Account')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginLeft: -270 }}>
                <Text style={styles.title}>Profile</Text>
            </View>


            <TouchableOpacity style={styles.button}>
                <View style={styles.icons}><Feather name="user" size={17} color="#3a5e7a" /></View>
                <Text style={styles.text1}>Username:</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <View style={styles.icons}><Feather name="phone" size={17} color="#3a5e7a" /></View>
                <Text style={styles.text1}>Phone:</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <View style={styles.icons}><Fontisto name="email" size={16} color="#3a5e7a" /></View>
                <Text style={styles.text1}>Email:</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <View style={styles.icons}><Ionicons name="location-outline" size={16} color="#3a5e7a" /></View>
                <Text style={styles.text1}>Country:</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                <Text style={styles.editText}>Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logButton} onPress={HandleLogout}>
                <Text style={styles.logText}>Log Out</Text>
            </TouchableOpacity>


        </SafeAreaView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#cfcece4a',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        padding: 20,
        color: '#3a5e7a'

    },
    button: {
        marginLeft: 5,
        marginBottom: 20,
        width: '90%',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'black',
        flexDirection: 'row'
    },
    text1: {
        fontSize: 16,
        color: '#3a5e7a',
        fontWeight: 'bold',
        padding: 5
    },
    logText: {
        color: '#B22222',
        marginTop: 20,
        fontSize: 17,
        fontFamily: 'Verdana',

    },

    logButton: {
    },
    icons: {
        padding: 5
    },
    editText: {
        color: 'white',

    },
    editButton: {
        backgroundColor: "#3a5e7a",
        width: "40%",
        height: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25
    }
});

export default AccountInfoScreen;

