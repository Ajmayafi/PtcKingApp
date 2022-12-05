import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from "../../features/authentications/screens/main.screen";
import { LoginScreen } from "../../features/authentications/screens/login.screen";
import { RegisterScreen } from "../../features/authentications/screens/register.screen";

const Stack = createStackNavigator();


export const AuthenticationNavigation = () => {

    return (
        <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} options={{
            headerShown: false
        }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{
            headerShown: false
        }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{
            headerShown: false
        }} />
      </Stack.Navigator>
    )
}
