import 'react-native-gesture-handler';
import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet} from 'react-native';
import { NavigationContainer, ParamListBase, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomepageScreen from '../screens/HomeScreen';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const Drawer = createDrawerNavigator();
const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

const handleDrawer = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={HomepageScreen} options={{
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <Text style={{ color: 'white', padding: 10 }}>Settings</Text>
                        </TouchableOpacity>
                    ),
                }} />
                {/* <Drawer.Screen name="Settings" component={} /> */}
                {/* Add other screens here */}
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
export default handleDrawer;

const styles = StyleSheet.create({




})