import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const LaunchScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsVisible(false);
            navigation.navigate('Login'); // Replace with your destination screen
        }, 1500); // Change 3000 to your desired delay in milliseconds

        return () => clearTimeout(timeoutId); // Cleanup function to avoid memory leaks
    }, []);

    return (
        isVisible && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#B0C4DE' }}>
                <Text style={{ fontSize: 20, color: '#26344f', fontWeight: 'bold' }}>Welcom to SwiftPay 😁</Text>
            </View>
        )
    );
}

export default LaunchScreen

const styles = StyleSheet.create({})