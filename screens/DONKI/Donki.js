import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalProps from '../../global/GlobalProps';
import HotDogButton from '../../global/components/HotDogButton';
import TextualData from '../../repository/TextualData';
import NotificationsCard from './components/NotificationsCard';
import InfinitePager from 'react-native-infinite-pager';
import {ScrollView} from 'react-native-gesture-handler';
import MockNotification_DONKI from '../../MockData/mockNotificationsData_DONKI';
import api from '../../api/NasaAPIs';
import HelpingFunctions from '../../utils/HelpingFunctions';
import Colors from '../../global/Colors';
import Routes from '../../routes/Routes';

export default function Donki({navigation}) {
  const [notificationMessages, setNotiMessages] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const navigate_infoScreen = infoType => {
    navigation.navigate(Routes.DONKI_INFORMATION_LIST, infoType);
  };

  const onPressNotification = item => {
    navigation.navigate(Routes.DONKI_DETAILED_ANALYSIS, item);
  };

  const fetchNotifications = async () => {
    // getting reports of only yesterday
    const startDate = HelpingFunctions.getPastDate(1);
    const endDate = startDate;
    // const reports = await api.get_DONKI_Notifications_report(startDate, endDate); //API call
    // reports.map(report => {
      MockNotification_DONKI.map(report => {                         //mock data
      const summaryRegex = /## Summary:([\s\S]*?)(?=\n##|$)/;
      const matchS = report.messageBody.match(summaryRegex);
      const summary = matchS ? matchS[1].trim() : '';

      const titleRegex = /## Message Type:(.*?)(?=\n##|$)/s;
      const matchT = report.messageBody.match(titleRegex);
      const title = matchT ? matchT[1].trim() : '';
      console.log('title: ' + title);

      const message = {
        key: report.messageID,
        fullMessageBody: report.messageBody,
        messageTitle: title,
        messageSummary: summary,
      };
      setNotiMessages(prevData => {
        return [...prevData, message];
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    //reset first
    setLoading(true);
    setNotiMessages([]);
    fetchNotifications();
  }, []);

  return (
    <ScrollView>
      <View style={GlobalProps.container}>
        <Text style={GlobalProps.titleText}>
          Space Weather Database Of Notifications, Knowledge, Information
          (DONKI)
        </Text>

        <View style={styles.containerBody}>
          <Text style={styles.text}>{TextualData.DONKI_explanation}</Text>
        </View>

        {/* Weekly report */}
        <Text style={styles.subTitle}>Weekly reports</Text>
        {isLoading ? (
          <ActivityIndicator
            style={GlobalProps.spinnerStyle}
            size="large"
            color={Colors.primary}
          />
        ) : (
          <FlatList
            style={styles.list}
            data={notificationMessages}
            pagingEnabled={true}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => onPressNotification(item)}>
                <NotificationsCard item={item} />
              </TouchableOpacity>
            )}
            horizontal={true}
          />
        )}

        <View style={styles.buttonsView}>
          <Text style={styles.subTitle}> Informations </Text>
          <HotDogButton
            title={'Coronal Mass Ejection (CME)'}
            onPressAction={() => navigate_infoScreen('CME')}
          />
          <HotDogButton
            title={'Gemagnetic Storm (GST)'}
            onPressAction={() => navigate_infoScreen('GST')}
          />

          <HotDogButton
            title={'Solar Flare (FLR)'}
            onPressAction={() => navigate_infoScreen('FLR')}
          />
          <HotDogButton
            title={'Interplanetary Shock (IPS)'}
            onPressAction={() => navigate_infoScreen('IPS')}
          />
          <HotDogButton
            title={'Solar Energetic Particle (SEP)'}
            onPressAction={() => navigate_infoScreen('SEP')}
          />
          <HotDogButton
            title={'Magnetopause Crossing (MPC)'}
            onPressAction={() => navigate_infoScreen('MPC')}
          />
          <HotDogButton
            title={'Radiation Belt Enhancement (RBE)'}
            onPressAction={() => navigate_infoScreen('RBE')}
          />
          <HotDogButton
            title={'Hight Speed Stream (HSS)'}
            onPressAction={() => navigate_infoScreen('HSS')}
          />
        </View>
        <View style={styles.spaceVertical}></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerBody: {
    padding: 20,
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    padding: 10,
    color: 'black',
  },
  list: {
    margin: 10,
    height: 250,
  },
  subTitle: {
    fontSize: 26,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    color: 'black',
    alignSelf: 'center',
  },
  buttonsView: {
    paddingHorizontal: 20,
  },
  spaceVertical: {
    marginVertical: 30,
  },
});
