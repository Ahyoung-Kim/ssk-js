import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyPageScreen from "../screens/myPage/MyPageScreen";
import MyPageNotificationScreen from "../screens/myPage/MyPageNotificationScreen";
import UserInfoScreen from "../screens/myPage/UserInfoScreen";

const Stack = createNativeStackNavigator();

const MyPageNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="MyPageScreen">
      <Stack.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyPageNotificationScreen"
        component={MyPageNotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserInfoScreen"
        component={UserInfoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MyPageNavigator;
