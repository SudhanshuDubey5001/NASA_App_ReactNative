import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import GlobalProps from '../global/GlobalProps';
import GlobalStylesConstants from '../global/GlobalStylesConstants';
import TextualData from '../repository/TextualData';
import {ScrollView} from 'react-native-gesture-handler';
import Colors from '../global/Colors';
import Dialog from 'react-native-dialog';
import { useState } from 'react';

export default function About() {
  const [isDialogVisible, setDialogVisible] = useState(false);

  const handleConfirm = () => {
    Linking.openURL('https://www.linkedin.com/in/sudhanshu5001/');
    setDialogVisible(false);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  const onPressName = () => {
    setDialogVisible(true);
  };

  return (
    <ScrollView>
      <View style={GlobalProps.container}>
        <Text style={GlobalProps.titleText}>SpaceMan</Text>
        <Text style={styles.text}>{TextualData.ABOUT_SCREEN_TEXT}</Text>
        <Text style={styles.developedByStyle}> --- DEVELOPER --- </Text>
        <TouchableOpacity
          style={styles.developerContainer}
          onPress={onPressName}>
          <Text style={styles.textName}>Sudhanshu Dubey</Text>
        </TouchableOpacity>
      </View>
      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>Confirmation</Dialog.Title>
        <Dialog.Description>
          Would you like to view Sudhanshu Dubey profile in your web browser?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Confirm" onPress={handleConfirm} />
      </Dialog.Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 10,
    padding: 20,
    fontSize: 16,
    color: 'black',
    fontFamily: GlobalStylesConstants.FONT_LIBREBASKERVILLE_REGULAR,
    lineHeight: 34,
  },
  developedByStyle: {
    alignSelf: 'center',
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
    color: 'gray',
    fontFamily: GlobalStylesConstants.FONT_LIBREBASKERVILLE_BOLD,
  },
  developerContainer: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    marginBottom: 200,
    backgroundColor: Colors.tertiary2,
  },
  textName: {
    alignSelf: 'center',
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: GlobalStylesConstants.FONT_LIBREBASKERVILLE_REGULAR,
    lineHeight: 34,
    color: 'white',
  },
});
