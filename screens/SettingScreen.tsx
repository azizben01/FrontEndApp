import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Button, } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native'; // Navigation hook
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

//icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


function SettingsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();


    const handleHelp = (): void => {
        console.log('Opening help...');
        navigation.navigate('Help');
    };

    const handleAccount = (): void => {
        navigation.navigate('');
    };

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>Settings</Text>

            <TouchableOpacity style={styles.settingButton} onPress={handleHelp}>
                <View style={styles.lefticon}><Feather name="help-circle" size={18} color="white" /></View>
                <Text style={styles.settingText}>Help</Text>
                <View style={styles.RightIcon1}>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={handleAccount}>
                <View style={styles.lefticon}><FontAwesome name="language" size={18} color="white" /></View>
                <Text style={styles.settingText}> Language Preference</Text>
                <View style={styles.RightIcon2}>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={handleAccount}>
                <View style={styles.lefticon}><Ionicons name="invert-mode" size={18} color="white" /></View>
                <Text style={styles.settingText}> App Theme</Text>
                <View style={styles.RightIcon3}>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={handleAccount}>
                <View style={styles.lefticon}>
                    <FontAwesome name="bell-o" size={18} color="white" />
                </View>
                <Text style={styles.settingText}> Notifications </Text>
                {/* <TouchableOpacity>
                    <FontAwesome6 name="toggle-off" size={20} color="white" />
                </TouchableOpacity> */}
                <View style={styles.RightIcon4}>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="white" />
                </View>
            </TouchableOpacity>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#cfcece4a'
    },
    title: {
        marginLeft: 20,
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
        color: '#3a5e7a'
    },
    settingButton: {
        marginLeft: 15,
        padding: 10,
        margin: 5,
        backgroundColor: '#3a5e7a',
        borderRadius: 30,
        width: 350,
        flexDirection: 'row',
        borderWidth: 1,
    },
    settingText: {
        fontSize: 18,
        color: 'white',
        padding: 4
    },

    RightIcon1: {
        paddingLeft: 230
    },
    RightIcon2: {
        paddingLeft: 96
    },
    RightIcon3: {
        paddingLeft: 174
    },
    RightIcon4: {
        paddingLeft: 163
    },
    lefticon: {
        padding: 5
    }
});

export default SettingsScreen;
