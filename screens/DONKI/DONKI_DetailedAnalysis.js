import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GlobalProps from '../../global/GlobalProps';
import {ScrollView} from 'react-native-gesture-handler';
import HelpingFunctions from '../../utils/HelpingFunctions';
import Colors from '../../global/Colors';
import DONKI_Information_Footer from '../../components/DONKI_cards/DONKI_footer';

export default function DONKI_DetailedAnalysis({route}) {
  const message = route.params;
  const afterDateTimeCorrection =
    HelpingFunctions.convertAllDateTimeToCorrectFormat(message.messageSummary);

  return (
    <ScrollView>
      <View style={styles.headerStyle}>
        <Text style={styles.titleText}>{message.messageTitle}</Text>
        <Text style={styles.subText}>{message.messageDateTime}</Text>
      </View>
      <Text style={styles.text}>{afterDateTimeCorrection}</Text>
      <DONKI_Information_Footer url={message.messageURL} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    padding: 10,
    color: 'black',
    fontSize: 18,
    marginHorizontal: 10,
    marginTop:10,
    marginBottom:100,
    flex: 1,
  },
  titleText: {
    fontSize: 26,
    color: 'black',
    fontFamily: 'LibreBaskerville-Bold',
    color: 'white',
  },
  subText: {
    paddingTop: 10,
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    marginTop: 10,
  },
  headerStyle: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});
