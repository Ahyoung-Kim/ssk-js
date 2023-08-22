import ClassNoteNavigator from "./ClassNoteNavigator";

import TestNotiScreen from "../screens/root/TestNotiScreen";

export default [
  //
  ...ClassNoteNavigator,
  {
    name: "TestNotiScreen",
    component: TestNotiScreen,
    options: { headerShown: false },
  },
];
