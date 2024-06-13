import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, FlatList } from 'react-native';

//icons
import { Ionicons } from '@expo/vector-icons';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';

type Edit = {
    username: string
    phone_number: number
    email: string
}

function ProfileScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const HandleLogout = () => {
        Alert.alert(
            "",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", onPress: () => console.log("Log out canceled"), style: "cancel" },
                { text: "Log out", onPress: () => (navigation.navigate('Login')) }
            ],
        )
    }

    const handleEditProfile = () => {
        navigation.navigate('Account')
    }

    const [editTransactions, setEditTransactions] = useState<Edit[]>([]);

    const handleEdit = async () => {
        try {
            const response = await fetch("http://localhost:1010/users/Ben01", {
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
        <KeyboardAvoidingView style={styles.container}>
            <SafeAreaView style={styles.containerSafe}>
                <View>
                    <Text style={styles.title}>Profile</Text>
                </View>

                <View style={styles.ContainerView}>
                    {editTransactions.length > 0 ? (
                        <FlatList
                            data={editTransactions}
                            renderItem={({ item }) => (
                                <View style={styles.profileContainer}>
                                    <Text style={styles.content}>Username: {item.username}</Text>
                                    <Text style={styles.content}>Phone Number: {item.phone_number}</Text>
                                    <Text style={styles.content}>Email: {item.email}</Text>
                                </View>
                            )}
                            keyExtractor={item => item.username.toString()}
                        />
                    ) : (
                        <View style={styles.noProfileContainer}>
                            <Text style={styles.noProfileText}>No profile information available</Text>
                        </View>
                    )}


                    <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                        <Text style={styles.editText}>Edit profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logButton} onPress={HandleLogout}>
                        <Text style={styles.logText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    containerSafe: {
        flex: 1,
    },
    ContainerView: {
        flex: 1,
        marginLeft: 15,
    },
    profileContainer: {
        padding: 10,
        borderWidth: 1,
        flexDirection: 'column',
        backgroundColor: '#3a5e7a',
        borderRadius: 15,
        marginTop: 10,
        width: 350,
    },
    content: {
        marginLeft: 10,
        paddingTop: 5,
        color: 'white',
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
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#cfcece4a',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        padding: 20,
        color: '#3a5e7a',
    },
    button: {
        marginLeft: 5,
        marginBottom: 20,
        width: '90%',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'black',
        flexDirection: 'row',
    },
    text1: {
        fontSize: 16,
        color: '#3a5e7a',
        fontWeight: 'bold',
        padding: 5,
    },
    logText: {
        color: '#B22222',
        marginTop: 20,
        fontSize: 17,
        fontFamily: 'Verdana',
    },
    logButton: {},
    icons: {
        padding: 5,
    },
    editText: {
        color: 'white',
    },
    editButton: {
        backgroundColor: '#3a5e7a',
        width: 90,
        height: '6%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
});

export default ProfileScreen;
