import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, FlatList } from 'react-native';

//icons
// import { Ionicons } from '@expo/vector-icons';
// import Fontisto from '@expo/vector-icons/Fontisto';
// import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserProfile = {
    username: string
    phone_number: string
    email: string
}

function ProfileScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    
    // const [editProfile, setEditProfile] = useState<Edit[]>([]);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

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

    const fetchUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const parsedUserData = JSON.parse(userData);
                console.log('Parsed user data:', parsedUserData); // Debug log
                setUserProfile(parsedUserData);
                console.log('Fetched user email from AsyncStorage:', parsedUserData.email); // Debug log
            } else {
                console.log('No user data found in AsyncStorage'); // Debug log
            }
        } catch (error) {
            console.error("Error fetching user data from AsyncStorage:", error);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchUserData();
            return () => { };
        }, [])
    );

    return (
        <SafeAreaView style={styles.containerSafe}>
            <View>
                <Text style={styles.title}>Profile</Text>
            </View>

            {userProfile ? (
                <View style={styles.profileContainer}>
                    <View style={styles.usernameView}>
                        <Text style={styles.labelText}>USERNAME: </Text>
                        <Text style={styles.usernameText}>{userProfile.username}</Text>
                    </View>
                    <View style={styles.phoneView}>
                        <Text style={styles.labelText}>PHONE NUMBER: </Text>
                        <Text style={styles.phoneText}>{userProfile.phone_number}</Text>
                    </View>
                    <View style={styles.emailView}>
                        <Text style={styles.labelText}>EMAIL ADDRESS: </Text>
                        <Text style={styles.emailText}>{userProfile.email}</Text>
                    </View>
                </View>
            ) : (
                <View style={styles.noProfileContainer}>
                    <Text style={styles.noProfileText}>No profile information available</Text>
                </View>
            )}

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
