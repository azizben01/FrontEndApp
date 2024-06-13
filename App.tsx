import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './Navigation/StackNavigation';
import { useFonts } from 'expo-font';
import LaunchScreen from './screens/LaunchScreen';

function App() {
  const [fontsLoaded] = useFonts({
    'NotoMusic-Regular': require('./assets/fonts/NotoMusic-Regular.ttf'),
  });

  if (!fontsLoaded) {
    console.log('fontsLoaded not loaded')
    return null;
  }

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  )
}
export default App;