import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/tab/HomeScreen";
import ClassNoteScreen from "../screens/note/ClassNoteScreen";
import CreateHwScreen from "../screens/note/CreateHwScreen";
import CreateProgressScreen from "../screens/note/CreateProgressScreen";
import CreateReviewScreen from "../screens/note/CreateReviewScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClassNoteScreen"
        component={ClassNoteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateProgressScreen"
        component={CreateProgressScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateHwScreen"
        component={CreateHwScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateReviewScreen"
        component={CreateReviewScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
