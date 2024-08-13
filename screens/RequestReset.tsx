import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const RequestReset = () => {
    const [email, setEmail] = useState('');

    const handleRequestReset = async () => {
        try {
            const response = await fetch('http://192.168.1.87:1010/RequestReset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Password reset link sent to your email.');
            } else {
                Alert.alert('Error', data.error || 'Failed to send password reset link');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred. Please try again later.');
        }
    };

    return (
        <KeyboardAvoidingView style={styles.safeView} behavior='padding'>
            <View style={styles.resetView}>
                <Text style={styles.resetTopText}>Enter a valid email address below to receive a reset link to reset your password.</Text>
            </View>
          <View style={styles.inputView}>
                <View style={styles.labelView}>
                    <Text style={styles.labelText}>Your email addressr</Text>
                </View>
                <TextInput
                    placeholder='Email'
                    style={styles.InputValue}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleRequestReset}>
                <Text style={styles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};


export default RequestReset

const styles = StyleSheet.create({

safeView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#cfcece4a",
},
InputValue: {
  paddingLeft: 15,
        height: '20%'
},
button: {
backgroundColor: '#3a5e7a',
borderRadius: 25,
padding: 15
},
buttonText: {
color: '#ffffff'
},

labelView : {
    fontSize: 25,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginVertical: 15,
    width: "95%",
    marginHorizontal: 10
    
},
inputView: {
    backgroundColor: '#cfcece4a',
    width: '95%',
    height: 100,
    borderRadius: 10,
    fontWeight: '400',
    marginVertical: 20,
    

},
labelText: {
    fontSize: 18,
    marginBottom: 7,
    color: '#3a5e7a',
    fontWeight: '500'
},
resetView: {
padding: 10
},
resetTopText: {
    color: '#3a5e7a',
    fontSize: 16,
    textAlign: 'center'
},
})