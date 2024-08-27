import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserProfile = {
    username: string;
    phone_number: string;
    email: string;
    // add a part for the full name
}

function ProfileScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    const HandleLogout = async () => {
        try {
            Alert.alert(
                "",
                "Are you sure you want to log out?",
                [
                    { text: "Cancel", style: "cancel",  onPress: () => console.log("Log out canceled"), },
                    { text: "Log out",style: "destructive", onPress: async () => {
                        
                        await AsyncStorage.removeItem('userData');
                        navigation.navigate('Login') }}
                ],
            );
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    const handleEditProfile = () => {
        navigation.navigate('Account');
    }

    const fetchUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const parsedUserData = JSON.parse(userData);
                setUserProfile(parsedUserData);
            } else {
                console.log('No user data found in AsyncStorage');
            }
        } catch (error) {
            console.error("Error fetching user data from AsyncStorage:", error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchUserData();
        }, [])
    );

    return (
        <SafeAreaView style={styles.containerSafe}>
            <View>
                <Text style={styles.title}>Profile</Text>
            </View>

            {userProfile ? (
                <View style={styles.profileContainer}>
                    <View style={styles.profileView}>
                        <Text style={styles.labelText}>Username: </Text>
                        <Text style={styles.value}>{userProfile.username}</Text>
                    </View>
                    <View style={styles.profileView}>
                        <Text style={styles.labelText}>Mobile Number: </Text>
                        <Text style={styles.value}>{userProfile.phone_number}</Text>
                    </View>
                    <View style={styles.profileView}>
                        <Text style={styles.labelText}>Email: </Text>
                        <Text style={styles.value}>{userProfile.email}</Text>
                    </View>
                </View>
            ) : (
                <View style={styles.noProfileContainer}>
                    <Text style={styles.noProfileText}>No profile information available</Text>
                </View>
            )}

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
        padding: 20,
        flexDirection: 'column',
        borderRadius: 15,
        marginTop: 10,
        marginLeft: 20,
        width: "87%",
        backgroundColor: '#cfcece4a'
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
  
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },

    profileView: {
        flexDirection: 'row',
        marginBottom: 16,
        borderBottomWidth: 1,
    },

    labelText:{
        fontSize: 17,
        fontWeight: 'bold',
        color: '#3a5e7a'
    },
  
    value: {
        textAlign: 'center',
        fontSize: 16,
        paddingHorizontal: 12
    }
  
});

export default ProfileScreen;
