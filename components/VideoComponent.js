import React, {useRef} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import Video, {VideoRef} from 'react-native-video';

export default function VideoComponent({url}) {
  const onBuffer = val => {
    console.log('Buffering...' + val);
  };

  const onError = error => {
    console.log('Video error: ' + error);
  };

  return (
    <View style = {styles.container}>
      <Video
        source={{
          uri: url,
        }}
        // ref={useRef<VideoRef>(null)}
        onBuffer={onBuffer}
        onError={onError}
        style={styles.videostyle}
        rate={1.0}
        volume={1.0}
        muted={false}
        ignoreSilentSwitch="ignore"
        paused={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation:10,
    borderRadius:5,
  },
  videostyle: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
});
