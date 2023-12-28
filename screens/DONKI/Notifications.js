import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GlobalProps from '../../global/GlobalProps';
import {ScrollView} from 'react-native-gesture-handler';
import HelpingFunctions from '../../utils/HelpingFunctions';

export default function Notifications({route}) {
  const message = route.params;
  const afterDateTimeCorrection = HelpingFunctions.convertAllDateTimeToCorrectFormat(message.messageSummary);
  return (
    <ScrollView>
      <View style={GlobalProps.container}>
        <Text style={GlobalProps.titleText}>{message.messageTitle}</Text>
        <Text style={styles.text}>{afterDateTimeCorrection}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    padding: 10,
    color: 'black',
    fontSize: 18,
    margin: 10,
  },
});
