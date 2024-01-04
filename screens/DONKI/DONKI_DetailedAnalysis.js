import React, {useState} from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalProps from '../../global/GlobalProps';
import {ScrollView} from 'react-native-gesture-handler';
import HelpingFunctions from '../../utils/HelpingFunctions';
import Colors from '../../global/Colors';
import Footer from '../../global/components/Footer';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';

export default function DONKI_DetailedAnalysis({route}) {
  const message = route.params;
  const afterDateTimeCorrection =
    HelpingFunctions.convertAllDateTimeToCorrectFormat(message.messageSummary);

  const modifiedMessageBody = HelpingFunctions.get_HTTP_links(
    afterDateTimeCorrection,
  );

  const images = [];
  const [visible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);

  modifiedMessageBody.httpLinks.map(image => {
    images.push({uri: image});
  });

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.headerStyle}>
          <Text style={styles.titleText}>{message.messageTitle}</Text>
          <Text style={styles.subText}>{message.messageDateTime}</Text>
        </View>
        <View style={styles.bodyStyle}>
          <Text style={styles.text}>
            {modifiedMessageBody.modifiedMessageBody}
          </Text>
          {modifiedMessageBody.httpLinks.map((image, index) => (
            <TouchableOpacity
              onPress={() => {
                setIsVisible(true);
                setIndex(index);
              }}>
              <FastImage
                resizeMode="contain"
                style={GlobalProps.imageContainer}
                source={{
                  uri: image,
                }}
              />
            </TouchableOpacity>
          ))}

          <ImageView
            images={images}
            imageIndex={index}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
        </View>
        <Footer url={message.messageURL} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyStyle: {
    padding: 10,
    marginTop: 10,
    marginBottom: 50,
    marginHorizontal: 10,
  },
  footer: {},
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    color: 'black',
    fontSize: 18,
    flex: 1,
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
    fontWeight: '600',
    color: 'white',
    marginTop: 10,
  },
  headerStyle: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
});
