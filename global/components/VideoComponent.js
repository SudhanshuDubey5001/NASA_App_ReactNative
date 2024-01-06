import React, {useRef, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import VideoPlayer from 'react-native-media-console';

export default function VideoComponent({url}) {
  const [isPaused, setPaused] = useState(false);

  const onBuffer = val => {
    console.log('Buffering...' + val);
  };

  const onError = error => {
    console.log('Video errors: ' + error);
  };

  return (
    <View
      style={styles.container}>
      <VideoPlayer
        containerStyle={styles.videostyle}
        source={{
          uri: url,
        }}
        ignoreSilentSwitch="ignore"
        paused={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderRadius: 5,
  },
  videostyle: {
    flex: 1,
    width: '100%',
    height: 300,
    marginTop: 10,
  },
});
