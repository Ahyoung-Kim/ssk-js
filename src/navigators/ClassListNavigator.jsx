import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ClassListScreen from "../screens/tab/ClassListScreen";
import ClassInfoScreen from "../screens/class/ClassInfoScreen";
import HwListPage from "../pages/Hw/HwListPage";
import ReviewListPage from "../pages/review/ReviewListPage";
import HwFeedPage from "../pages/Hw/HwFeedPage";
import CreateClassScreen from "../screens/class/CreateClassScreen";
import UpdateClassScreen from "../screens/class/UpdateClassScreen";
import HwListScreen from "../screens/note/HwListScreen";

const Stack = createNativeStackNavigator();

const ClassListNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ClassListScreen">
      <Stack.Screen
        name="ClassListScreen"
        component={ClassListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClassInfoScreen"
        component={ClassInfoScreen}
        options={{ headerShown: false }}
        initialParams={{ tutoringId: null }}
      />
      <Stack.Screen
        name="HwListPage"
        component={HwListPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReviewListPage"
        component={ReviewListPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HwFeedPage"
        component={HwFeedPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateClassScreen"
        component={CreateClassScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateClassScreen"
        component={UpdateClassScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HwListScreen"
        component={HwListScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ClassListNavigator;
