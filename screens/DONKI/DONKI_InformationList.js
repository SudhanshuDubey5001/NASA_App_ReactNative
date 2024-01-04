import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import api from '../../api/NasaAPIs';
import HelpingFunctions from '../../utils/HelpingFunctions';
import mockData_CMS_DONKI from '../../MockData/mockData_CMS_DONKI';
import GlobalProps from '../../global/GlobalProps';
import DONKI_InformationCard from './components/DONKI_InformationCard';
import Colors from '../../global/Colors';
import MockNotification_DONKI from '../../MockData/mockNotificationsData_DONKI';
import Routes from '../../routes/Routes';

export default function DONKI_InformationList({route, navigation}) {
  const infoType = route.params;
  const [messages, setMessages] = useState([]);
  const [infoFullName, setInfoFullName] = useState('');

  const getTypeFullName = () => {
    switch (infoType) {
      case 'CME':
        setInfoFullName('Coronal Mass Ejection');
        break;
      case 'GST':
        setInfoFullName('Geomagnetic Storm');
        break;
      case 'IPS':
        setInfoFullName('Interplanetary Shock');
        break;
      case 'FLR':
        setInfoFullName('Solar Flare');
        break;
      case 'SEP':
        setInfoFullName('Solar Energetic Particle');
        break;
      case 'MPC':
        setInfoFullName('Magnetopause Crossing');
        break;
      case 'RBE':
        setInfoFullName('Raidation Belt Enhancement');
        break;
      case 'HSS':
        setInfoFullName('High Speed Stream');
        break;
    }
  };

  useEffect(() => {
    getTypeFullName();
    setMessages([]);
    setLoading(true);
    fetchInformationData(infoType);
  }, []);

  const fetchInformationData = async type => {
    const messageJSONArray = await api.get_DONKI_Notifications_information(type); //API call!!!
    messageJSONArray.map(message => {
    // MockNotification_DONKI.map(message => {
      //Mock data
      const item =
        HelpingFunctions.get_Information_TitleSummaryDateTimeFromMessageBody(
          message.messageBody,
        );

      const data = {
        key: message.messageID,
        messageTitle: item.title,
        messageSummary: item.summary,
        messageURL: message.messageURL,
        fullMessageBody: message.messageBody,
        messageDateTime: HelpingFunctions.formatDateTime(
          message.messageIssueTime,
        ),
      };
      setMessages(prevData => {
        return [...prevData, data];
      });
      setLoading(false);
    });
  };

  const [isLoading, setLoading] = useState(true);

  const onPressInformation = info => {
    navigation.navigate(Routes.DONKI_DETAILED_ANALYSIS, info);
  };

  return (
    <View style={GlobalProps.container}>
      {isLoading ? (
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
              onPress={() => onPressInformation(item)}>
              <DONKI_InformationCard info={item} />
            </TouchableOpacity>
          )}
          ListHeaderComponent={
            <View style={styles.headerStyle}>
              <Text style={styles.titleText}>{infoFullName}</Text>
              <Text style={styles.subText}>Last 30 days</Text>
            </View>
          }
        />
      )}
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
