import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { defaultOptions } from "./common";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ ...defaultOptions, title: "Settings" }} />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
