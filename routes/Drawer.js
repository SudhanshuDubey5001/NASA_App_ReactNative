import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import GlobalProps from '../global/GlobalStylesConstants'
import Home from "../screens/Home";
import Donki from "../screens/DONKI/Donki";
import Earth from "../screens/Earth";
import MarsRover from "../screens/MarsRover";
import NasaLibrary from "../screens/NasaLibrary";
import Header from '../components/Header'
import DONKIStack from "./DONKIStack";

const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Earth"
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
                <Header navigation={navigation} title={"NASA"} />
              ),
            };
          }}
        />
        <Drawer.Screen
          name="DONKI"
          component={DONKIStack}
          options={({ navigation }) => {
            return {
              headerTitle: () => (
                <Header navigation={navigation} title={"DONKI"} />
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
                <Header navigation={navigation} title={"Earth"} />
              ),
            };
          }}
        />
        <Drawer.Screen
          name="Mars Rover"
          component={MarsRover}
          options={({ navigation }) => {
            return {
              headerTitle: () => (
                <Header navigation={navigation} title={"Mars Rover"} />
              ),
            };
          }}
        />
        <Drawer.Screen
          name="NASA Images Library"
          component={NasaLibrary}
          options={({ navigation }) => {
            return {
              headerTitle: () => (
                <Header navigation={navigation} title={"NASA Images Library"} />
              ),
            };
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
