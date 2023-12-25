import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Constants from './utils/Constants';
import Header from './components/Header';
import api from './api/NasaAPIs';
import HelpingFunctions from './utils/HelpingFunctions';

const callAPI = async (date: string) => {

  const searchResults = await api.getNASALibraryImages('earth', 'image');
  searchResults.forEach(item => {
    console.log('Link => '+item.href);
    console.log('Title => '+item.data[0].title);
    console.log('Description => '+item.data[0].description);
  });
  // const images = await api.getMarsRoverPhotos('curiosity');
  // images.photos.forEach(image => {
  //   console.log('Image -> ' + image.img_src);
  // });
  // const image = await api.getTodayImage();
  // console.log('Title: '+image.title);
  // console.log('Explanation: '+image.explanation);
  // console.log('Url: '+image.url);
  // api.getMarsRoverPhotos('curiosity');
  // let earth_image = await api.getEarthImage(date);
  // console.log('Image = '+earth_image);
};

function App(): React.JSX.Element {
  return (
    <View>
      <Header />
      <Button title="Call" onPress={() => callAPI('')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
