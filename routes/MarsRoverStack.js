import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MarsRover from '../screens/marsrover/MarsRover';
import RoverImagesList from '../screens/marsrover/RoverImagesList';
import Routes from './Routes';

const Stack = createNativeStackNavigator();

export default function MarsRoverStack() {
  return (
    <Stack.Navigator
      initialRouteName={Routes.MARSROVER_HOME}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Routes.MARSROVER_HOME} component={MarsRover} />

      <Stack.Screen name={Routes.MARSROVER_IMAGES} component={RoverImagesList} />
    </Stack.Navigator>
  );
}
