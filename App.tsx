import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './Navigation/StackNavigation';




function App() {

  return(
    <NavigationContainer>
    <StackNavigator/>
  </NavigationContainer>
  )

}
export default App;