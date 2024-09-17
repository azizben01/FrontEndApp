import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "../Navigation/TabNavigator";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import TransactionFormScreen from "../screens/TransactionformScreen";
import AccountScreen from "../screens/AccountScreen";
import LaunchScreen from "../screens/LaunchScreen";
import ChangeNumber from "../screens/ChangeNumber";
import ChangePassword from "../screens/ChangePassword";
import DeleteAccount from "../screens/DeleteAccount";
import RequestReset from "../screens/RequestReset";
import VerifyCodeScreen from "../screens/VerifyCodeScreen";
import ResetPassword from "../screens/ResetPassword";
import ResetSuccess from "../screens/ResetSuccess";
import ChangeEmployeeEmail from "../screens/ChangeEmployeeEmail";
import TransactionDetailScreen from "../screens/TransactionDetailScreen";
import Notification from "../screens/Notification";

// interface CustomHeaderStyle extends TextStyle {
//   color?: string; // Explicitly define the optional 'color' property
// }

const Stack = createNativeStackNavigator();

const customHeaderOptions: {
  headerStyle: { backgroundColor: string };
  headerTintColor: string;
  // headerTitleStyle: CustomHeaderStyle;
} = {
  headerStyle: {
    backgroundColor: "#cfcece4a",
  },
  headerTintColor: "",
  // headerTitleStyle: {
  //   fontWeight: 'bold', // You can add other text styles here (e.g., fontSize)
  // },
};

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Launch">
      <Stack.Screen
        name="Launch"
        component={LaunchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Transaction Form"
        component={TransactionFormScreen}
        options={{
          ...customHeaderOptions,
          headerBackTitle: "Back",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={TransactionDetailScreen}
        options={{ ...customHeaderOptions, headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="tabs"
        component={TabNavigator}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          ...customHeaderOptions,
          headerBackTitle: "Back",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Change number"
        component={ChangeNumber}
        options={{
          ...customHeaderOptions,
          headerBackTitle: "Back",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Change password"
        component={ChangePassword}
        options={{
          ...customHeaderOptions,
          headerBackTitle: "Back",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Delete"
        component={DeleteAccount}
        options={{
          ...customHeaderOptions,
          headerBackTitle: "Back",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="RequestPasswordReset"
        component={RequestReset}
        options={{
          ...customHeaderOptions,
          headerBackTitle: "Back",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="VerifyCode"
        component={VerifyCodeScreen}
        options={{
          ...customHeaderOptions,
          headerBackTitle: "Back",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="UpdatePassword"
        component={ResetPassword}
        options={{
          ...customHeaderOptions,
          headerBackTitle: "Back",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="changeEmployeeEmail"
        component={ChangeEmployeeEmail}
        options={{
          ...customHeaderOptions,
          headerBackTitle: "Back",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="SuccessReset"
        component={ResetSuccess}
        options={{
          ...customHeaderOptions,
          headerBackTitle: "Back",
          headerBackTitleVisible: false,
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="NotificationDetail"
        component={Notification}
        options={{
          ...customHeaderOptions,
          // headerBackTitle: "Back",
          headerBackTitleVisible: false,
          //headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
