import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

import color from "../common/color";

import HomeNavigator from "./HomeNavigator";
import ClassListScreen from "../screens/tab/ClassListScreen";
import MyPageNavigator from "./MyPageNavigator";
import ClassListNavigator from "./ClassListNavigator";

const TabBar = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <TabBar.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: color.COLOR_WHITE_BACKGROUND,
          shadowColor: color.COLOR_BOX_SHADOW,
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.2,
          elevation: 3,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <TabBar.Screen
        name="ClassList"
        component={ClassListNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "수업 목록",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="list-ul"
              size={25}
              color={focused ? color.COLOR_MAIN : color.COLOR_TAB_ICON}
            />
          ),
        }}
      />
      <TabBar.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "홈",
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={30}
              color={focused ? color.COLOR_MAIN : color.COLOR_TAB_ICON}
            />
          ),
        }}
      />
      <TabBar.Screen
        name="MyPage"
        component={MyPageNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "마이 페이지",
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="user-alt"
              size={24}
              color={focused ? color.COLOR_MAIN : color.COLOR_TAB_ICON}
            />
          ),
        }}
      />
    </TabBar.Navigator>
  );
};

export default TabNavigator;
