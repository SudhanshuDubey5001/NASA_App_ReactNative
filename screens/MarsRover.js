import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function MarsRover() {
  return (
    <View style = {styles.container}>
      <Text>MarsRover screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
});
