import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import { defaultOptions } from "./common";
import HotelListScreen from "../screens/HotelListScreen";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ ...defaultOptions, title: "Home" }} />
      <Stack.Screen name="HotelList" component={HotelListScreen} options={{ ...defaultOptions, title: "Results" }} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
