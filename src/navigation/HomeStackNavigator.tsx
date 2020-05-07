import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import { defaultOptions } from "./common";
import PlaceSelectionScreen from "../screens/PlaceSelectionScreen";
import SearchResultScreen from "../screens/SearchResultScreen";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ ...defaultOptions, title: "Home" }} />
      <Stack.Screen
        name="PlaceSelection"
        component={PlaceSelectionScreen}
        options={{ ...defaultOptions, title: "Place" }}
      />
      <Stack.Screen
        name="SearchResults"
        component={SearchResultScreen}
        options={{ ...defaultOptions, title: "Your hotels" }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
