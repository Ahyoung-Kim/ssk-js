import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ClassNoteScreen from "../screens/note/ClassNoteScreen";
import CreateHwScreen from "../screens/note/CreateHwScreen";
import CreateProgressScreen from "../screens/note/CreateProgressScreen";
import CreateReviewScreen from "../screens/note/CreateReviewScreen";
import HwListScreen from "../screens/note/HwListScreen";
import ReviewListScreen from "../screens/note/ReviewListScreen";
import ReviewTagListScreen from "../screens/note/ReviewTagListScreen";
import HomeworkScreen from "../screens/note/HomeworkScreen";
import SubmitHwScreen from "../screens/note/SubmitHwScreen";

const Stack = createNativeStackNavigator();

export const ClassNoteNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ClassNoteScreen">
      <Stack.Screen
        name="ClassNoteScreen"
        component={ClassNoteScreen}
        options={{ headerShown: false }}
        initialParams={{
          date: new Date(),
          noteId: 0,
          tutoringId: 0,
          startTime: "00:00",
        }}
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
      <Stack.Screen
        name="ReviewTagListScreen"
        component={ReviewTagListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeworkScreen"
        component={HomeworkScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubmitHwScreen"
        component={SubmitHwScreen}
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
    initialParams: {
      date: new Date(),
      noteId: 0,
      tutoringId: 0,
      startTime: "00:00",
    },
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
  {
    name: "ReviewTagListScreen",
    component: ReviewTagListScreen,
    options: { headerShown: false },
  },
  {
    name: "HomeworkScreen",
    component: HomeworkScreen,
    options: { headerShown: false },
  },
  {
    name: "SubmitHwScreen",
    component: SubmitHwScreen,
    options: { headerShown: false },
  },
];
