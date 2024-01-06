import {Linking, StyleSheet, View, Text, Image} from 'react-native';
import Colors from '../Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useState} from 'react';
import Dialog from 'react-native-dialog';
import FastImage from 'react-native-fast-image';
import GlobalStylesConstants from '../GlobalStylesConstants';

export default function Footer({url}) {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [website, setWebsite] = useState('');

  const goToLink = url => {
    setWebsite(url);
    setDialogVisible(true);
  };

  const handleConfirm = () => {
    Linking.openURL(website);
    setDialogVisible(false);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  return (
    <View style = {styles.mainContainer}>
      <Image
          style={styles.imageContainer}
          source={require('../../assets/images/curiosityImage.jpeg')}
        />
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => goToLink(url)}>
          <Text style={styles.textURL}>Information Source</Text>
        </TouchableOpacity>

        <View style={styles.textHorizontalFlex}>
          <Text style={styles.textNormal}>Provided by </Text>
          <TouchableOpacity onPress={() => goToLink('https://www.nasa.gov/')}>
            <Text style={styles.textURL}>NASA </Text>
          </TouchableOpacity>
        </View>

        <Dialog.Container visible={isDialogVisible}>
          <Dialog.Title>Confirmation</Dialog.Title>
          <Dialog.Description>
            Would you like to view this link in your web browser?
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="Confirm" onPress={handleConfirm} />
        </Dialog.Container>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
    marginTop: 200,
  },
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
    paddingVertical: 10,
  },
  textURL: {
    fontSize: 17,
    color: 'white',
    textDecorationLine: 'underline',
    paddingVertical: 10,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
});
