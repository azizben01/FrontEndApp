import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';

function VerifyCodeScreen () {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
    const [code, setCode] = useState('');

    const handleVerifyCode = async () => {
        try {
            // const response = await fetch('http://192.168.1.2:1010/ResetCode', {
            const response = await fetch('http://192.168.1.87:1010/ResetCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }), 
            });

            const data = await response.json();
            if (response.ok) {
               //  navigation.navigate('') // , { email: data.email });
                Alert.alert('The provided code is correct!')
                 navigation.navigate("UpdatePassword");
            } else {
                alert(data.error || 'Invalid code');
            }
        } catch (error) {
            console.error('Navigation error:', error);
            alert('An error occurred during navigation.');
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.text}>
            <TextInput
                placeholder="Enter Reset Code"
                value={code}
                onChangeText={setCode}
            />
            </View>
          
            <View style={styles.button}>
            <TouchableOpacity style= {styles.touch} onPress={handleVerifyCode}>
                <Text > verify </Text>
            </TouchableOpacity>
            </View>
            
        </SafeAreaView>
        
    );
};


export default VerifyCodeScreen

const styles = StyleSheet.create({
    touch: {
       
    },
    safe: {
        flex: 1,
    },
    text: {
        marginTop: 150,
        padding: 10
    },
    button: {
        padding: 10
    }

})