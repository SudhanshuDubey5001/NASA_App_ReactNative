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
import GlobalStylesConstants from '../global/GlobalStylesConstants';
import VideoComponent from '../global/components/VideoComponent';
import WebView from 'react-native-webview';

export default function Home() {
  const [isLoading, setLoading] = useState({
    textLoading: true,
    mediaLoading: true,
  });
  const [mediaMetadata, setMediaMetadata] = useState({});
  const [visible, setIsVisible] = useState(false);

  useEffect(() => {
    setMediaMetadata({});
    fetchImage();
  }, []);

  useEffect(() => {
    console.log('Media metadata updated');
  }, [mediaMetadata]);

  const fetchImage = async () => {
    setLoading({textLoading: true});
    const json = await api.getTodayImage();
    setMediaMetadata({
      date: json.date,
      explanation: json.explanation,
      title: json.title,
      url: json.url,
      media_type: json.media_type,
    });
    console.log('Daily media = ' + mediaMetadata.url);
    setLoading({textLoading: false, mediaLoading: false});
  };
  return (
    <ScrollView>
      <Text style={GlobalProps.titleText}>Astronomy picture of the day</Text>
      <View style={GlobalProps.container}>
        <View>
          <View>
            {isLoading.mediaLoading && <Loading />}
            {mediaMetadata.media_type == 'image' ? (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => setIsVisible(true)}>
                <Image
                  onLoadStart={() => setLoading({mediaLoading: true})}
                  onLoadEnd={() => setLoading({mediaLoading: false})}
                  style={styles.imageContainer}
                  source={{uri: mediaMetadata.url}}
                />
              </TouchableOpacity>
            ) : (
              <View>
                <WebView
                  style={styles.webViewStyle}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{
                    uri: mediaMetadata.url,
                  }}
                />
              </View>
            )}
          </View>
          <Text style={styles.text}>{mediaMetadata.title}</Text>
          <View>
            {isLoading.textLoading && <Loading />}
            <Text style={styles.textExplanation}>
              {mediaMetadata.explanation}
            </Text>
            <Footer url={mediaMetadata.url} />
          </View>

          <ImageView
            images={[{uri: mediaMetadata.url}]}
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
  webViewStyle:{
    width:'100%',
    height:300
  },
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
    marginTop: 10,
    fontSize: 16,
    color: 'black',
    fontFamily: GlobalStylesConstants.FONT_LIBREBASKERVILLE_BOLD,
    alignSelf: 'center',
  },
  textExplanation: {
    marginTop: 10,
    padding: 20,
    fontSize: 16,
    color: 'black',
    fontFamily: GlobalStylesConstants.FONT_LIBREBASKERVILLE_REGULAR,
    lineHeight: 34,
  },
});
