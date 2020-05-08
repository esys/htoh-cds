import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import { defaultOptions } from "./common";
import PlaceSelectionScreen from "../screens/PlaceSelectionScreen";
import SearchResultScreen from "../screens/SearchResultScreen";
import RoomSearchResultScreen from "../screens/RoomSearchResultScreen";
import HotelDetailsScreen from "../screens/HotelDetailsScreen";

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
        options={{ ...defaultOptions, title: "Hotels" }}
      />
      <Stack.Screen
        name="HotelDetails"
        component={HotelDetailsScreen}
        options={{ ...defaultOptions, title: "Hotel" }}
      />
      <Stack.Screen
        name="RoomResults"
        component={RoomSearchResultScreen}
        options={{ ...defaultOptions, title: "Rooms" }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
