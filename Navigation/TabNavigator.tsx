import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View , Text, StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen';
import TransactionListScreen from '../screens/TransactionListScreen';

// import icons
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
    <Tab.Navigator initialRouteName='Homepage' screenOptions={
            {
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle:{},
        tabBarIconStyle: {backgroundColor:"#B0C4DE"}
            }
    }>
        <Tab.Screen name="Homepage" component={HomeScreen} options={{
        tabBarIcon: ({focused}) => {
            return(
            <View  style={styles.iconContainer}>
            <Feather name="home" size={24} color= {focused? 'blue': 'black' } />
            <Text style={focused ? styles.TextOnFocus : styles.normalIcon}>Home</Text>
            </View>
        )
        }

        }}/>
            <Tab.Screen name="Profilepage" component={ProfileScreen}
            options={{
                tabBarIcon: ({focused}) => {
                    return(
                        <View style={styles.iconContainer}>
                        <Feather name="user" size={24} color={focused? 'blue':'black'} />
                        <Text style={focused? styles.TextOnFocus: styles.normalIcon}>Profile</Text>
                        </View>
                    )
                }
            }} 
            />

            <Tab.Screen name="TransactionList" component={TransactionListScreen}
            options={{
                tabBarIcon: ({focused}) => {
                    return(
                        <View style={styles.iconContainer}>
                            <Entypo name="wallet" size={24} color={focused? 'blue':'black'} />
                            <Text style={focused? styles.TextOnFocus: styles.normalIcon}>Transactions List</Text>
                        </View>
                    )
                }
            }}
        />
            </Tab.Navigator>
        );
}

const styles = StyleSheet.create({
    iconContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        gap:3
    },
    TextOnFocus : { // text
        color:"blue",
        fontSize:14
    },
    normalIcon:{
        color:"black",
    }
})

export default TabNavigator;



