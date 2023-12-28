import {StyleSheet, View, Text, Button} from 'react-native';
import {Image} from 'react-native-reanimated/lib/typescript/Animated';
import {Icon} from 'react-native-vector-icons/FontAwesome';
import HelpingFunctions from '../../utils/HelpingFunctions';

export default function DONKI_InformationCard({cmeData: info}) {
  return (
    <View style={styles.card}>
      <View style={styles.textGroup1}>
        <Text style={styles.cardTextTitle}>Title:</Text>
        <Text style={styles.cardText}>{info.messageTitle}</Text>
      </View>
      <View style={styles.textGroup1}>
        <Text style={styles.cardTextTitle}>Start Time:</Text>
        <Text style={styles.cardText}>{HelpingFunctions.formatDateTime(info.startTime)}</Text>
      </View>
      <View style={styles.textGroup1}>
        <Text style={styles.cardTextTitle}>Source Location:</Text>
        <Text style={styles.cardText}>{info.sourceLocation}</Text>
      </View>
      <View style={styles.textGroup2}>
        <Text style={styles.cardTextTitle}>Instruments:</Text>
        {info.instruments.map(instrument => {
          return (
            <View style={styles.bullets}>
              <Text style={styles.cardText}>- {instrument.displayName}</Text>
            </View>
          );
        })}
      </View>
      <View style={styles.textGroup2}>
        <Text style={styles.cardTextTitle}>Note</Text>
        <Text style={styles.cardText}>{info.note}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 10,
    elevation: 10,
    borderRadius: 10,
  },
  cardTextTitle: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 17,
    color: 'black',
    // fontWeight:'bold',
    fontFamily: 'LibreBaskerville-Bold',
  },
  cardText: {
    padding:10,
    fontSize: 17,
    fontFamily: 'LibreBaskerville-Regular',
    color:'#333'
  },
  textGroup1: {
    flexDirection: 'row',
  },
  textGroup2: {},
  bullets: {
    flex: 1,
    flexDirection: 'row',
  },
});
