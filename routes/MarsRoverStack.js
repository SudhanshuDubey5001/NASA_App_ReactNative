import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MarsRover from '../screens/marsrover/MarsRover';
import RoverImagesList from '../screens/marsrover/RoverImagesList';

const Stack = createNativeStackNavigator();

export default function MarsRoverStack() {
  return (
    <Stack.Navigator
      initialRouteName="RoverImages"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MarsRover" component={MarsRover} />

      <Stack.Screen name="RoverImages" component={RoverImagesList} />
    </Stack.Navigator>
  );
}
