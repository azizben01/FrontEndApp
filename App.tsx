import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './Navigation/StackNavigation';
import { useFonts } from 'expo-font';
import LaunchScreen from './screens/LaunchScreen';

function App() {
  const [fontsLoaded] = useFonts({
    'NotoSerifDisplayBlack': require('./assets/fonts/NotoSerifDisplayBlack.ttf'),
    'NotoSerifDisplay_CondensedBlack': require('./assets/fonts/NotoSerifDisplay_CondensedBlack.ttf'),
    'NotoSerifDisplay-Italic': require('./assets/fonts/NotoSerifDisplay-Italic.ttf'),
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