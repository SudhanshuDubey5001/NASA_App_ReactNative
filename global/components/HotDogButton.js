import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Colors from '../Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function HotDogButton({title, onPressAction}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPressAction}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    elevation: 5,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    color: 'black',
    padding: 15,
    alignSelf: 'center',
  },
});
