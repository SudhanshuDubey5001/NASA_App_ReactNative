import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Routes from './Routes';
import NasaLibrary from '../screens/NasaLibrary/NasaLibrary';
import LibraryItem from '../screens/NasaLibrary/LibraryItem';

const Stack = createNativeStackNavigator();

export default function NASALibraryStack() {
  return (
    <Stack.Navigator
      initialRouteName={Routes.NASA_LIBRARY_HOME}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Routes.NASA_LIBRARY_HOME} component={NasaLibrary} />

      <Stack.Screen name={Routes.NASA_LIBRARY_ITEM} component={LibraryItem} />
    </Stack.Navigator>
  );
}
