import {StyleSheet, View, Text, Button} from 'react-native';
import {Image} from 'react-native-reanimated/lib/typescript/Animated';
import {Icon} from 'react-native-vector-icons/FontAwesome';
import HelpingFunctions from '../../utils/HelpingFunctions';
import Dialog from 'react-native-dialog';
import {useState} from 'react';
import Colors from '../../global/Colors';

export default function DONKI_InformationCard({info}) {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [url, setURL] = useState('');

  const onPressLink = url => {
    setURL(url);
    setDialogVisible(true);
  };

  const handleConfirm = () => {
    Linking.openURL(url);
  };

  const handleCancel = () => {
    setDialogVisible(false);
  };

  return (
    <View>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>{info.messageTitle}</Text>
        </View>
        <Text style={styles.textBody} numberOfLines={10} ellipsizeMode="tail">
          {info.messageSummary}
        </Text>
      </View>
      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>Confirmation</Dialog.Title>
        <Dialog.Description>
          Do you want to open the link to NASA website for detailed review on
          the selected CME?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Confirm" onPress={handleConfirm} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  dateTime: {
    fontSize: 15,
    color: '#333',
    paddingVertical:10,
    fontWeight:'bold',
  },
  card: {
    backgroundColor: 'white',
    margin: 20,
    elevation: 10,
    borderRadius: 10,
    borderColor: 'black',
  },
  titleContainer: {
    padding: 10,
    backgroundColor: Colors.tertiary,
  },
  textTitle:{
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
  },
  textBody: {
    fontSize: 17,
    padding: 10,
    color: 'black',
  },
});
