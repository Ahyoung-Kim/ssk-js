import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ClassNoteScreen from "../screens/note/ClassNoteScreen";
import CreateHwScreen from "../screens/note/CreateHwScreen";
import CreateProgressScreen from "../screens/note/CreateProgressScreen";
import CreateReviewScreen from "../screens/note/CreateReviewScreen";
import HwListScreen from "../screens/note/HwListScreen";
import ReviewListScreen from "../screens/note/ReviewListScreen";

const Stack = createNativeStackNavigator();

export const ClassNoteNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ClassNoteScreen">
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
      <Stack.Screen
        name="HwListScreen"
        component={HwListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReviewListScreen"
        component={ReviewListScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default [
  {
    name: "ClassNoteScreen",
    component: ClassNoteScreen,
    options: { headerShown: false },
  },
  {
    name: "CreateProgressScreen",
    component: CreateProgressScreen,
    options: { headerShown: false },
  },
  {
    name: "CreateHwScreen",
    component: CreateHwScreen,
    options: { headerShown: false },
  },
  {
    name: "CreateReviewScreen",
    component: CreateReviewScreen,
    options: { headerShown: false },
  },
  {
    name: "HwListScreen",
    component: HwListScreen,
    options: { headerShown: false },
  },
  {
    name: "ReviewListScreen",
    component: ReviewListScreen,
    options: { headerShown: false },
  },
];
