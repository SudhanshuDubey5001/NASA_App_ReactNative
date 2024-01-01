import {StyleSheet, Text, View, Image} from 'react-native';
import GlobalProps from '../../global/GlobalProps';
import TextualData from '../../repository/TextualData';
import Colors from '../../global/Colors';
import HotDogButton from '../../components/HotDogButton';
import Routes from '../../routes/Routes';
import {ScrollView} from 'react-native-gesture-handler';

export default function MarsRover({navigation}) {
  const navigateToRoverImagesScreen = () => {
    navigation.navigate(Routes.MARSROVER_IMAGES);
  };

  return (
    <ScrollView style={GlobalProps.container}>
      <View>
        <Text style={GlobalProps.titleText}>Mars Rover Images Database</Text>
        <View style={styles.body}>
          <Text style={styles.text}>{TextualData.MARS_ROVER_explanation}</Text>
          <HotDogButton
            title={'Curiosity photos'}
            onPressAction={navigateToRoverImagesScreen}
          />
        </View>
        <Image
          style={styles.imageContainer}
          source={require('../../assets/images/curiosityImage.jpeg')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    flex: 1,
    fontSize: 20,
    marginBottom: 30,
    color: 'black',
  },
  body: {
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    flex: 1,
  },
});
