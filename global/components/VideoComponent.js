import React, {useRef} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import VideoPlayer from 'react-native-media-console';
// import {useAnimations} from '@react-native-media-console/reanimated';

export default function VideoComponent({url}) {
  const onBuffer = val => {
    console.log('Buffering...' + val);
  };

  const onError = error => {
    console.log('Video error: ' + error);
  };

  return (
    <View style={styles.container}>
      <VideoPlayer
        source={{uri: url}}
        paused = {false}
        containerStyle = {styles.videostyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // elevation:10,
    borderRadius: 5,
  },
  videostyle: {
    width: '100%',
    height: 300,
    marginTop: 10,
  },
});
