import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Animated,
} from 'react-native';
import api from '../../api/NasaAPIs';
import HelpingFunctions from '../../utils/HelpingFunctions';
import MockData from '../../MockData';
import GlobalProps from '../../global/GlobalProps';
import CMECards from '../../components/DONKI_cards/CMECards';
import Dialog from 'react-native-dialog';

export default function CoronalMassEjection() {
  const [CME_data, setCME_date] = useState([]);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [url, setURL] = useState('');

  const fetchCMEData = async () => {
    // console.log('Fetching CME data...');
    const date = HelpingFunctions.getTenDaysRange();
    const dateString =
      'startDate=' + date.startDate + '&endDate=' + date.endDate;
    // const data = await api.get_DONKI_CME_api(dateString); //api call!!!
    MockData.map(cme => {
      const cmeData = {
        catalog: cme.catalog || 'Unavailable',
        startTime: cme.startTime || '',
        sourceLocation: cme.sourceLocation || 'Unavailable',
        link: cme.link || 'Unavailable',
        note: cme.note || 'Unavailable',
        instruments: cme.instruments || [{displayname: 'Unavailable'}],
      };
      setCME_date(prevData => {
        return [cmeData, ...prevData];
      });
    });
  };

  useEffect(() => {
    fetchCMEData();
  }, []);

  const onPressItem = url => {
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
    <View style={GlobalProps.container}>
      <Text style={GlobalProps.titleText}>Coronal Mass Ejection</Text>
      <FlatList
        data={CME_data}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => onPressItem(item.link)}>
            <CMECards cmeData={item} />
          </TouchableOpacity>
        )}
      />
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
});
