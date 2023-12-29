import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import GlobalProps from '../global/GlobalProps';
import {ScrollView} from 'react-native-gesture-handler';
import api from '../api/NasaAPIs';
import TextualData from '../repository/TextualData';
import HelpingFunctions from '../utils/HelpingFunctions';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import DONKI_Information_Footer from '../components/DONKI_cards/DONKI_footer';

export default function Earth() {
  const [visible, setIsVisible] = useState(false);
  const [image, setImage] = useState('');

  const fetchEarthImage = async () => {
    const earthImage = await api.getEarthImage('');
    setImage(earthImage);
    console.log('image = ' + image);
  };

  useEffect(() => {
    fetchEarthImage();
  }, []);

  return (
    <ScrollView>
      <View style={GlobalProps.container}>
        <Text style={GlobalProps.titleText}>
          Earth Polychromatic Imaging Camera (EPIC)
        </Text>
        <Text style={styles.text}>{TextualData.EPIC_explanation}</Text>
        <TouchableOpacity activeOpacity={1} onPress={() => setIsVisible(true)}>
          <FastImage style={styles.imageContainer} source={{uri: image}} />
        </TouchableOpacity>
        <Text style={styles.subtext}>
          Image clicked: {HelpingFunctions.getPastDate(4)}
        </Text>
      </View>
      <DONKI_Information_Footer url={'https://epic.gsfc.nasa.gov'} />
      <ImageView
        images={[{uri: image}]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
    margin: 10,
    color: 'black',
    padding: 10,
  },
  subtext: {
    fontSize: 18,
    color: 'gray',
    alignSelf: 'center',
    marginBottom: 40,
  },
  imageContainer: {
    width: '100%',
    height: 350,
    marginVertical: 20,
  },
});
