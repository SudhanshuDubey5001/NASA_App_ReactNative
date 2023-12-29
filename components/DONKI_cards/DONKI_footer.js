import {Linking, StyleSheet, View, Text} from 'react-native';
import Colors from '../../global/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useState} from 'react';
import Dialog from 'react-native-dialog';

export default function DONKI_Information_Footer({url}) {
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
    paddingVertical: 10,
  },
  textURL: {
    fontSize: 17,
    color: 'white',
    textDecorationLine: 'underline',
    paddingVertical: 10,
  },
});
