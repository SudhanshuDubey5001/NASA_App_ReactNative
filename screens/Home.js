import React, {useEffect, useState} from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import Colors from '../global/Colors';
import api from '../api/NasaAPIs';
import {ScrollView} from 'react-native-gesture-handler';
import GlobalProps from '../global/GlobalProps';

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  const [imageMetadata, setImageMetadata] = useState({
    date: '',
    explanation: '',
    title: '',
    url: '',
  });

  useEffect(() => {
    fetchImage();
  }, imageMetadata);

  const fetchImage = async () => {
    const json = await api.getTodayImage();
    setLoading(true);
    setImageMetadata({
      date: json.date,
      explanation: json.explanation,
      title: json.title,
      url: json.url,
    });
  };
  return (
    <ScrollView>
      <View style={GlobalProps.container}>
        <Text style={GlobalProps.titleText}>Astronomy picture of the day</Text>
        {isLoading && (
          <Image
            style={styles.imageContainer}
            source={{uri: imageMetadata.url}}
          />
        )}
        {isLoading && <Text style={styles.text}>{imageMetadata.title}</Text>}
        {isLoading && (
          <Text style={styles.textExplanation}>
            {imageMetadata.explanation}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 40,
  },
  imageTitle: {
    fontSize: 26,
    padding: 10,
    marginTop: 20,
    padding: 20,
    // fontFamily:'NotoSerifBold',
    color: 'black',
  },
  imageContainer: {
    width: '100%',
    height: 350,
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
    // color: 'black',
  },
  textExplanation: {
    fontSize: 18,
    color: 'black',
    padding: 18,
  },
});
