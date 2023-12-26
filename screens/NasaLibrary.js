import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function NasaLibrary() {
  return (
    <View style = {styles.container}>
      <Text>NasaLibrary screen</Text>
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
