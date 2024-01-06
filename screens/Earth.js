import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import GlobalProps from '../global/GlobalProps';
import {ScrollView} from 'react-native-gesture-handler';
import api from '../api/NasaAPIs';
import TextualData from '../repository/TextualData';
import HelpingFunctions from '../utils/HelpingFunctions';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import Footer from '../global/components/Footer';
import Colors from '../global/Colors';
import Loading from '../global/components/Loading';
import GlobalStylesConstants from '../global/GlobalStylesConstants';

export default function Earth() {
  const [visible, setIsVisible] = useState(false);
  const [image, setImage] = useState('');
  const [state, setState] = useState({loading: true});

  const fetchEarthImage = async () => {
    const earthImage = await api.getEarthImage('');
    setImage(earthImage);
    console.log('image = ' + image);
  };

  useEffect(() => {
    fetchEarthImage();
  }, []);

  return (
    <ScrollView style={GlobalProps.container}>
      <View>
        <Text style={GlobalProps.titleText}>
          Earth Polychromatic Imaging Camera (EPIC)
        </Text>
        <Text style={styles.text}>{TextualData.EPIC_explanation}</Text>
        {state.loading && <Loading size={'large'}/>}
        <TouchableOpacity activeOpacity={1} onPress={() => setIsVisible(true)}>
          <FastImage
            onLoadStart={() => setState({loading: true})}
            onLoadEnd={() => setState({loading: false})}
            style={styles.imageContainer}
            source={{uri: image}}
          />
        </TouchableOpacity>
        <Text style={styles.subtext}>
          Image clicked: {HelpingFunctions.getPastDate(14)}
        </Text>
      </View>
      <Footer url={'https://epic.gsfc.nasa.gov'} />
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
    marginTop: 10,
    fontSize: 16,
    color: 'black',
    fontFamily:GlobalStylesConstants.FONT_LIBREBASKERVILLE_REGULAR,
    lineHeight:34,
    padding: 20,
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
