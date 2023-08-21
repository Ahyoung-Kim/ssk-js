import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { Provider } from "react-redux";

import store from "./src/redux/store";

import RootNavigator from "./src/navigators/RootNavigator";

export default function App() {
  Font.loadAsync({
    Light: require("./src/assets/fonts/NanumSquareL.ttf"),
    Regular: require("./src/assets/fonts/NanumSquareR.ttf"),
    Medium: require("./src/assets/fonts/NanumSquare.ttf"),
    Bold: require("./src/assets/fonts/NanumSquareB.ttf"),
    ExtraBold: require("./src/assets/fonts/NanumSquareEB.ttf"),
  });

  return (
    <>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </>
  );
}
