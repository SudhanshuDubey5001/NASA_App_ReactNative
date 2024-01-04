import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import GlobalProps from '../global/GlobalStylesConstants'
import Home from "../screens/Home";
import Earth from "../screens/Earth";
import NasaLibrary from "../screens/NasaLibrary/NasaLibrary";
import Header from '../global/components/Header'
import DONKIStack from "./DONKIStack";
import MarsRoverStack from "./MarsRoverStack";
import Routes from "./Routes";
import NASALibraryStack from "./NASALibraryStack";

const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={Routes.DRAWER_NASA_LIBRARY}
        screenOptions={{
          headerStyle: { backgroundColor: GlobalProps.headerBackgroundColor },
          headerTintColor: GlobalProps.headerTextColor,
          headerTitleAlign: "center",
          // headerTitle: () => <Header />, //if you want to keep the same header
        }}
      >
        <Drawer.Screen
          name={Routes.DRAWER_HOME}
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
          name={Routes.DRAWER_DONKI}
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
          name={Routes.DRAWER_EARTH}
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
          name={Routes.DRAWER_MARSROVER}
          component={MarsRoverStack}
          options={({ navigation }) => {
            return {
              headerTitle: () => (
                <Header navigation={navigation} title={"Mars Rover"} />
              ),
            };
          }}
        />
        <Drawer.Screen
          name={Routes.DRAWER_NASA_LIBRARY}
          component={NASALibraryStack}
          options={({ navigation }) => {
            return {
              headerTitle: () => (
                <Header navigation={navigation} title={"NASA Library"} />
              ),
            };
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
