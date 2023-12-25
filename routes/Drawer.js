import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import GlobalProps from '../global/GlobalStylesConstants'
import Home from "../screens/Home";
import Donki from "../screens/Donki";
import Earth from "../screens/Earth";
import MarsRover from "../screens/MarsRover";
import NasaLibrary from "../screens/NasaLibrary";

const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: GlobalProps.headerBackgroundColor },
          headerTintColor: GlobalProps.headerTextColor,
          headerTitleAlign: "center",
          // headerTitle: () => <Header />, //if you want to keep the same header
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => {
            return {
              headerTitle: () => (
                <Header navigation={navigation} title={"Home"} />
              ),
            };
          }}
        />
        <Drawer.Screen
          name="DONKI"
          component={Donki}
          options={({ navigation }) => {
            return {
              headerTitle: () => (
                <Header navigation={navigation} title={"About Movie Zone"} />
              ),
            };
          }}
        />
        <Drawer.Screen
          name="Earth"
          component={Earth}
          options={({ navigation }) => {
            return {
              headerTitle: () => (
                <Header navigation={navigation} title={"About Movie Zone"} />
              ),
            };
          }}
        />
        <Drawer.Screen
          name="MarsRover"
          component={MarsRover}
          options={({ navigation }) => {
            return {
              headerTitle: () => (
                <Header navigation={navigation} title={"About Movie Zone"} />
              ),
            };
          }}
        />
        <Drawer.Screen
          name="NasaLibrary"
          component={NasaLibrary}
          options={({ navigation }) => {
            return {
              headerTitle: () => (
                <Header navigation={navigation} title={"About Movie Zone"} />
              ),
            };
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
