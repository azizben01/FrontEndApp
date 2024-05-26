
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Button, } from 'react-native';


function AccountScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Here is the profile</Text>


        </SafeAreaView>

    );
}

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

export default AccountScreen;

