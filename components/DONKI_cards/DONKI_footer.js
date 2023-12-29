import {Linking, StyleSheet, View, Text} from 'react-native';
import Colors from '../../global/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function DONKI_Information_Footer({url}) {
  const goToNASALink = () => {
    const website = 'https://www.nasa.gov/';
    Linking.openURL(website);
  };

  const goToNASAInformationPage = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={goToNASAInformationPage}>
        <Text style={styles.textURL}>Information Source</Text>
      </TouchableOpacity>

      <View style={styles.textHorizontalFlex}>
        <Text style={styles.textNormal}>Provided by </Text>
        <TouchableOpacity onPress={goToNASALink}>
          <Text style={styles.textURL}>NASA </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  textHorizontalFlex: {
    flexDirection: 'row',
  },
  textNormal: {
    fontSize: 17,
    color: 'white',
    paddingVertical:10,
  },
  textURL: {
    fontSize: 17,
    color: 'white',
    textDecorationLine:'underline',
    paddingVertical:10,
  },
});
