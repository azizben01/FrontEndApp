
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from '../Navigation/TabNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import TransactionScreen from '../screens/TransactionDetailScreen';
import TransactionFormScreen from '../screens/TransactionFormScreen';
import AccountScreen from '../screens/AccountScreen';
import AccountInfoScreen from '../screens/AccountInfo';
import LaunchScreen from '../screens/LaunchScreen';
import ChangeNumber from '../screens/ChangeNumber';
import ChangePassword from '../screens/ChangePassword';
import { TextStyle } from 'react-native';

interface CustomHeaderStyle extends TextStyle {
  color?: string; // Explicitly define the optional 'color' property
}

const Stack = createNativeStackNavigator();

const customHeaderOptions: {
  headerStyle: { backgroundColor: string };
  headerTintColor: string;
  headerTitleStyle: CustomHeaderStyle;
} = {
  headerStyle: {
    backgroundColor: '#cfcece4a',
  },
  headerTintColor: '',
  headerTitleStyle: {
    fontWeight: 'bold', // You can add other text styles here (e.g., fontSize)
  },
};

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Launch'>
      <Stack.Screen name="Launch" component={LaunchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Transaction Form" component={TransactionFormScreen} options={{ ...customHeaderOptions, headerBackTitle: 'Back', headerBackTitleVisible: false }} />
      <Stack.Screen name="TransactionDetail" component={TransactionScreen} options={{ ...customHeaderOptions, headerBackTitleVisible: false }} />
      <Stack.Screen name="tabs" component={TabNavigator} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Account" component={AccountScreen} options={{ ...customHeaderOptions, headerBackTitle: 'Back', headerBackTitleVisible: false }} />
      <Stack.Screen name="Account Information" component={AccountInfoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Change number" component={ChangeNumber} options={{ ...customHeaderOptions, headerBackTitle: 'Back', headerBackTitleVisible: false}} />
      <Stack.Screen name="Change password" component={ChangePassword} options={{ ...customHeaderOptions, headerBackTitle: 'Back', headerBackTitleVisible: false}} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
