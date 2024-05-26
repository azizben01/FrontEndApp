
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';

// icons
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

function AccountScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const HandleLogout = () => {
        Alert.alert(
            "",
            "Are you sure you want to log out?",
            [
                { text: "cancel", onPress: () => console.log("Log out failed"), style: "cancel" },
                { text: "Log out", onPress: () => (navigation.navigate('Login')) }
            ]
        )
    }
    const HandleAccountInfo = () => {
        navigation.navigate('Account Information')
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.title}>Account</Text> */}

            <TouchableOpacity style={styles.button} onPress={HandleAccountInfo}>
                <View style={styles.iconContainer} >
                    <Feather name="user" size={24} color="black" />
                </View>
                <Text style={styles.text1}>Account Information</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <View style={styles.iconContainer}>
                    <Ionicons name="key-outline" size={24} color="black" />
                </View>
                <Text style={styles.Passwordtext1}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <View style={styles.iconContainer}>
                    <Feather name="smartphone" size={24} color="black" />
                </View>
                <Text style={styles.text1}>Change Number</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="heart-broken-outline" size={24} color="black" />
                </View>
                <Text style={styles.text1}>Delete My Account</Text>
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
        backgroundColor: '#B0C4DE',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 10
    },
    button: {
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 5,
        marginLeft: 20,
        marginBottom: 15,
        width: '90%',
        borderWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'black',
        flexDirection: 'row',
        alignItems: 'baseline',
        paddingBottom: -10
    },
    text1: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        width: '100%',
        borderTopColor: 'black',
        // paddingBottom: 5
    },
    Passwordtext1: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        width: '100%',
        borderTopColor: 'black',
        paddingBottom: 5

    },
    logText: {
        color: '#B22222',
        marginTop: 20,
        fontSize: 17,
        fontFamily: 'Verdana',

    },

    logButton: {
        paddingHorizontal: '40%'

    },
    iconContainer: {
        paddingRight: 10,
        paddingBottom: 5

    }
});

export default AccountScreen;

