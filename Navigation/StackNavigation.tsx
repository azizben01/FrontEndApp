
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from '../Navigation/TabNavigator';
import LoginScreen from  '../screens/LoginScreen';
import SignupScreen  from  '../screens/SignupScreen';
import TransactionScreen from '../screens/TransactionDetailScreen';
import TransactionFormScreen from '../screens/transactionformScreen';



const Stack = createNativeStackNavigator();
function StackNavigator() {
  return (
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen}options={{headerShown: false}} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}}/>
        <Stack.Screen name="TransactionForm" component={TransactionFormScreen}options={{headerShown: false}} />
        <Stack.Screen name="TransactionDetail" component={TransactionScreen} options={{headerShown: false}} />
        <Stack.Screen name="tabs" component={TabNavigator} options={{headerShown: false}} />
      </Stack.Navigator>
  );
}

  export default StackNavigator;
