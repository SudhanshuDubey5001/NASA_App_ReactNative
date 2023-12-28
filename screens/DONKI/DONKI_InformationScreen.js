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
  ActivityIndicator,
} from 'react-native';
import api from '../../api/NasaAPIs';
import HelpingFunctions from '../../utils/HelpingFunctions';
import mockData_CMS_DONKI from '../../MockData/mockData_CMS_DONKI';
import GlobalProps from '../../global/GlobalProps';
import DONKI_InformationCard from '../../components/DONKI_cards/DONKI_InformationCard';
import Dialog from 'react-native-dialog';
import Colors from '../../global/Colors';
import MockNotification_DONKI from '../../MockData/mockNotificationsData_DONKI';

export default function DONKI_InformationScreen({route}) {
  const infoType = route.params;
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   setMessages([]);
  //   setLoading(true);
  //   fetchInformationData(infoType);
  // }, []);

  const fetchInformationData = async type => {
    // const messageJSONArray = await api.getDONKI_Information_api(type); //API call!!!
    MockNotification_DONKI.map(message => {
      const item = HelpingFunctions.get_Information_TitleSummaryDateTimeFromMessageBody(message.messageBody);
      const data = {
        key: message.messageID,
        fullMessageBody: message.messageBody,
        dateTime: HelpingFunctions.formatDateTime(message.messageIssueTime),
        messageTitle: item.title,
        messageSummary: item.summary,
        messageURL: item.messageURL,
      };
      setMessages(prevData => {
        return [...prevData, data];
      });
      setLoading(false);
    });
  };

  const [CME_data, setCME_date] = useState([]);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [url, setURL] = useState('');
  const [isLoading, setLoading] = useState(true);

  const fetchCMEData = async () => {
    // console.log('Fetching CME data...');
    const date = HelpingFunctions.getTenDaysRange();
    const dateString =
      'startDate=' + date.startDate + '&endDate=' + date.endDate;
    // const data = await api.get_DONKI_CME_api(dateString); //api call!!!
    mockData_CMS_DONKI.map(cme => {
      const cmeData = {
        key: cme.activityID || Math.random(),
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
      setLoading(false);
    });
  };

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
      {/* {isLoading ? (
        <ActivityIndicator
          style={GlobalProps.spinnerStyle}
          size={'large'}
          color={Colors.primary}
        />
      ) : (
        <FlatList
          data={messages}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => onPressItem(item.messageURL)}>
              <CMECards cmeData={item} />
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <View style={styles.headerStyle}>
              <Text style={styles.titleText}>Coronal Mass Ejection</Text>
              <Text style={styles.subText}>Last 10 days</Text>
            </View>
          }
        />
      )} */}
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
  titleText: {
    fontSize: 26,
    color: 'black',
    fontFamily: 'LibreBaskerville-Bold',
    color: 'white',
  },
  subText: {
    paddingTop: 10,
    fontSize: 15,
    fontWeight: '300',
    color: 'white',
  },
  headerStyle: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});
