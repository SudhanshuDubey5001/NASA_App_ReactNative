import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Donki from "../screens/DONKI/Donki";
import CoronalMassEjection from "../screens/DONKI/CME";
import GeomagneticStorm from "../screens/DONKI/GMS";
import SolarFlare from "../screens/DONKI/SF";

const Stack = createNativeStackNavigator();

export default function DONKIStack() {
  return (
    <Stack.Navigator
      initialRouteName="DONKI_Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="DONKI_Home"
        component={Donki}
      />
      <Stack.Screen
        name="CME"
        component={CoronalMassEjection}
      />
      <Stack.Screen
        name="GMS"
        component={GeomagneticStorm}
      />
      <Stack.Screen
        name="SF"
        component={SolarFlare}
      />
    </Stack.Navigator>
  );
}
