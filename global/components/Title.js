import {Text, View, StyleSheet} from 'react-native';
import Colors from '../Colors';

export default function TitleWithSubText({titleText, subText}) {
  return (
    <View style={styles.container}>
      <Text style={styles.titleTextStyle}>{titleText}</Text>
      <Text style={styles.subTextStyle}>{subText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding:20
  },
  titleTextStyle: {
    fontSize: 26,
    fontFamily: 'LibreBaskerville-Bold',
    color: 'white',
  },
  subTextStyle: {
    paddingTop: 10,
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    marginTop: 10,
  },
});
