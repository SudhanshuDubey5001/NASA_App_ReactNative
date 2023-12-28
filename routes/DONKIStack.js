import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Donki from "../screens/DONKI/Donki";
import DONKI_InformationScreen from "../screens/DONKI/DONKI_InformationScreen";
import Notifications from "../screens/DONKI/Notifications";
import Routes from "./Routes";

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
        name={Routes.DONKI_INFORMATION}
        component={DONKI_InformationScreen}
      />
      <Stack.Screen
        name={Routes.DONKI_NOTIFICATIONS}
        component={Notifications}
      />
    </Stack.Navigator>
  );
}
