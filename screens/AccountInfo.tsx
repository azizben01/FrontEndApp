import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Button, } from 'react-native';


//icons

// This was used and replaced in the profile tab. Get rid of it later in the process.

function AccountInfoScreen() {

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={styles.title}>Personnal information</Text> */}

            <TouchableOpacity style={styles.button}>
                <Text style={styles.text1}>Username</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.text1}>Phone</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.text1}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>

                <Text style={styles.text1}>Country</Text>
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
        marginBottom: 10,
        width: '90%',
        borderWidth: 1,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'black'
    },
    text1: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        width: '100%',
        borderTopColor: 'black'
    },
    logText: {
        color: '#960200',
        marginTop: 20,
        fontSize: 17,
        fontFamily: 'Verdana'

    },

    logButton: {
        paddingHorizontal: '40%'

    },
});

export default AccountInfoScreen;

