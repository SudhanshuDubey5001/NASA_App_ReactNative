import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Donki() {
  return (
    <View style = {styles.container}>
      <Text>Donki screen</Text>
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
