import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/root/LoginScreen";
import OAuthLoginScreen from "../screens/root/OAuthLoginScreen";
import OAuthInfoScreen from "../screens/root/OAuthInfoScreen";
import SignUpScreen from "../screens/root/SignUpScreen";
import OnBoardingScreen from "../screens/root/OnBoardingScreen";
import TabNavigator from "./TabNavigator";
import NotificationScreen from "../screens/root/NotificationScreen";

import screens from "./screens";

const Stack = createNativeStackNavigator(); // Stack 네비게이터 생성
const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="TabNavigator">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OAuthLoginScreen"
        component={OAuthLoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OAuthInfoScreen"
        component={OAuthInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnBoardingScreen"
        component={OnBoardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />

      {/* Screens */}
      {screens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default RootNavigator;
