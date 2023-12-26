import 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from 'react';
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
import Home from './screens/Home';
import Drawer from './routes/Drawer';
import Video, {VideoRef} from 'react-native-video';
import VideoComponent from './components/VideoComponent';

const callAPI = async () => {
  // searchResults.forEach(item => {
  //   console.log('Link => '+item.href);
  //   console.log('Title => '+item.data[0].title);
  //   console.log('Description => '+item.data[0].description);
  // });
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
  const [videoLink, setVideoLink] = useState('');

  const callAPI = async () => {
    console.log('Button pressed');
    const searchResults = await api.getNASALibraryImages('earth', 'video');
    let videosLink = searchResults[1].href;
    const links = await api.getQueryResultImages(videosLink);
    const v = links.filter(item => item.endsWith('.mp4'));
    console.log('Got video = ' + v[0]);
    setVideoLink(v[0]);
  };

  // useEffect(() => {
  //   console.log('Use effect ran');
  //   console.log('Video link - ' + videoLink);
  // }, [videoLink]);

  return (
    <Drawer/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 24,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default App;
