import * as React from 'react-native'
import { View, Text, StyleSheet, } from 'react-native'

function Settings () {
    return (

        <View style={style.settings}>
            <Text> Welcom into your Settings</Text>
        </View>
    )
}

export default Settings;

const style = StyleSheet.create({

    settings: {
        flex: 1,
        alignContent: 'center'
    
    }
})
