import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { NavigationProp } from '@react-navigation/native';



function ProfileScreen  () {


    return (
            <View style={styles.content}>
                <Text>Welcome to profiel page!</Text>
            </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#B0C4DE",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#B0C4DE'
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    button: {
        alignItems: "center",
        marginBottom: 20
    },


    buttonText: {
        marginTop: 5,
        fontSize: 14,
        color: "#333",
    },
});
