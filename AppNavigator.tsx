import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StackNavigator from "./Navigation/StackNavigation";
import AdminStackNavigator from "./AdminNavigation/AdminStackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import AdminTabNavigator from "./AdminNavigation/AdminTabNavigator";

const RootStack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="UserFlow">
        <RootStack.Screen
          name="AdminFlow"
          component={AdminStackNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="UserFlow"
          component={StackNavigator}
          options={{ headerShown: false }}
        />

        {/* <RootStack.Screen
          name="Tabflow"
          component={AdminTabNavigator}
          options={{ headerShown: false }}
        /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
