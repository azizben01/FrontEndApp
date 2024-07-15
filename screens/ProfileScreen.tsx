import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, FlatList } from 'react-native';

//icons
import { Ionicons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Edit = {
    username: string
    phone_number: number
    email: string
}

function ProfileScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const HandleLogout = async () => {

        try {
            await AsyncStorage.removeItem('userData');
            Alert.alert(
                "",
                "Are you sure you want to log out?",
                [
                    { text: "Cancel", onPress: () => console.log("Log out canceled"), style: "cancel" },
                    { text: "Log out", onPress: () => (navigation.navigate('Login')) }
                ],
            )
          } catch (error) {
            console.error('Error logging out:', error);
          }
          
       
    }

    const handleEditProfile = () => {
        navigation.navigate('Account')
    }

    const [editTransactions, setEditTransactions] = useState<Edit[]>([]);

    const handleEdit = async () => {
        try {
            const response = await fetch("http://192.168.1.87:1010/users/Ben01", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json(); // Parse the JSON response
                setEditTransactions([data]); // Ensure data is an array
                console.log("Profile info was retrieved:", data);
            } else {
                console.error("Failed to retrieve the profile info");
            }
        } catch (error) {
            console.error("Error fetching profile info:", error);
            // Handle network errors or other unexpected errors
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            handleEdit();
            return () => { };
        }, [])
    );

    return (
        <SafeAreaView style={styles.containerSafe}>
            <View>
                <Text style={styles.title}>Profile</Text>
            </View>

            <View style={styles.listView}>
                {editTransactions.length > 0 ? (
                    <FlatList
                        data={editTransactions}
                        renderItem={({ item }) => (
                            <View style={styles.profileContainer}>
                               
                                  <View style={styles.usernameView}>
                                <Text style={styles.labelText}>USERNAME: </Text>
                                <Text style={styles.usernameText}>{item.username} </Text>
                                  </View>

                                  <View style={styles.phoneView}>
                                  <Text style={styles.labelText}>PHONE NUMBER: </Text>
                                  <Text style={styles.phoneText}>{item.phone_number}</Text>
                                  </View>

                                  <View style={styles.emailView}>
                                  <Text style={styles.labelText}>EMAIL ADDRESS: </Text>
                                  <Text style={styles.emailText}>{item.email}</Text>
                                  </View>
                            </View>
                          
                        )}
                        keyExtractor={item => item.username.toString()}
                    />
                ) : (
                    <View style={styles.noProfileContainer}>
                        <Text style={styles.noProfileText}>No profile information available</Text>
                    </View>
                )}
            </View>

            {/* Container for buttons placed at the bottom */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                    <Text style={styles.editText}>Edit profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logButton} onPress={HandleLogout}>
                    <Text style={styles.logText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerSafe: {
        flex: 1,
    },
    listView: {
        flex: 1,
        marginLeft: 15,
    },
    profileContainer: {
        padding: 10,
        flexDirection: 'column',
        // backgroundColor: '#3a5e7a',
        borderRadius: 15,
        marginTop: 10,
        width: 350,
    },
    content: {
        marginLeft: 10,
        paddingTop: 5,
        color: 'black',
        fontSize: 15
    },
    noProfileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noProfileText: {
        fontSize: 18,
        color: 'gray',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        padding: 20,
        color: '#3a5e7a',
    },
    logText: {
        color: '#B22222',
        fontSize: 17,
        fontFamily: 'Verdana',
    },
    logButton: {
        backgroundColor: '#f8d7da',
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginBottom: 10,
    },
    editText: {
        color: 'white',
        fontSize: 15
    },
    editButton: {
        backgroundColor: '#3a5e7a',
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginBottom: 10,
    },
    // New styles for button container
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },

    usernameView: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        
    },

    labelText:{
        fontSize: 17,
        fontWeight: 'bold',
        color: '#3a5e7a'
    },
    usernameText:{

    },
    phoneView:{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        
    },
    phoneText:{

    },
    emailView:{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        
    },
    emailText:{

    },
});

export default ProfileScreen;
