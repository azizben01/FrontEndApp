import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Button, } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native'; // Navigation hook
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

//icons
import MaterialIcons from '@expo/vector-icons/MaterialIcons';



function SettingsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();


    const handleHelp = (): void => {
        console.log('Opening help...');
        navigation.navigate('Help');
    };

    const handleAccount = (): void => {
        navigation.navigate('Your account');
    };

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.title}>Settings</Text>

            <TouchableOpacity style={styles.settingButton} onPress={handleHelp}>
                <Text style={styles.settingText}>Help</Text>
                <View style={styles.iconContainer1}>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.settingButton} onPress={handleAccount}>
                <Text style={styles.settingText}> Your account</Text>
                <View style={styles.iconContainer2}>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
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
        backgroundColor: '#B0C4DE'
    },
    title: {
        marginLeft: 20,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    settingButton: {
        marginLeft: 20,
        padding: 10,
        margin: 5,
        backgroundColor: '#99B3D3',
        borderRadius: 15,
        width: 340,
        flexDirection: 'row',
        borderWidth: 1,
    },
    settingText: {
        fontSize: 18,
        color: 'black'
    },
    iconContainer1: {
        paddingLeft: 253

    },
    iconContainer2: {
        paddingLeft: 180

    },
});

export default SettingsScreen;
