import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Donki from "../screens/DONKI/Donki";
import DONKI_InformationList from "../screens/DONKI/DONKI_InformationList";
import DONKI_DetailedAnalysis from "../screens/DONKI/DONKI_DetailedAnalysis";
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
        name={Routes.DONKI_INFORMATION_LIST}
        component={DONKI_InformationList}
      />
      <Stack.Screen
        name={Routes.DONKI_DETAILED_ANALYSIS}
        component={DONKI_DetailedAnalysis}
      />
    </Stack.Navigator>
  );
}
