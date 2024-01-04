import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../global/Colors';
import api from '../api/NasaAPIs';
import {ScrollView} from 'react-native-gesture-handler';
import GlobalProps from '../global/GlobalProps';
import Footer from '../global/components/Footer';
import ImageView from 'react-native-image-viewing';
import Loading from '../global/components/Loading';

export default function Home() {
  const [isLoading, setLoading] = useState({
    textLoading: true,
    imageLoading: true,
  });
  const [imageMetadata, setImageMetadata] = useState({});
  const [visible, setIsVisible] = useState(false);

  useEffect(() => {
    setImageMetadata({});
    fetchImage();
  }, []);

  const fetchImage = async () => {
    setLoading({textLoading: true});
    const json = await api.getTodayImage();
    setImageMetadata({
      date: json.date,
      explanation: json.explanation,
      title: json.title,
      url: json.url,
    });
    // setLoading({textLoading: false});
  };
  return (
    <ScrollView>
      <Text style={GlobalProps.titleText}>Astronomy picture of the day</Text>
      <View style={GlobalProps.container}>
        <View>
          <View>
            {isLoading.imageLoading && <Loading/>}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setIsVisible(true)}>
              <Image
                onLoadStart={() => setLoading({imageLoading: true})}
                onLoadEnd={() => setLoading({imageLoading: false})}
                style={styles.imageContainer}
                source={{uri: imageMetadata.url}}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>{imageMetadata.title}</Text>
          <View>
            {isLoading.textLoading && <Loading />}
            <Text style={styles.textExplanation}>
              {imageMetadata.explanation}
            </Text>
          </View>
          <Footer url={imageMetadata.url} />

          <ImageView
            images={[{uri: imageMetadata.url}]}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
        </View>
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
    color: 'black',
  },
  imageContainer: {
    width: '100%',
    height: 350,
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'black',
  },
  textExplanation: {
    fontSize: 18,
    color: 'black',
    padding: 18,
    marginBottom: 30,
  },
});
