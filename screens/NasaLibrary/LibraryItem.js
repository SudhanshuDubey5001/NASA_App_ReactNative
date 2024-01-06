import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import GlobalProps from '../../global/GlobalProps';
import {ScrollView} from 'react-native-gesture-handler';
import TitleWithSubText from '../../global/components/Title';
import HelpingFunctions from '../../utils/HelpingFunctions';
import {useEffect, useState} from 'react';
import api from '../../api/NasaAPIs';
import FastImage from 'react-native-fast-image';
import VideoComponent from '../../global/components/VideoComponent';
import Loading from '../../global/components/Loading';
import ImageView from 'react-native-image-viewing';
import Footer from '../../global/components/Footer';

export default function LibraryItem({route, navigation}) {
  const queryItem = route.params;
  const [media_uri_image, setMediaURI_Image] = useState('');
  const [media_uri_video, setMediaURI_Video] = useState('');
  const [loading, setLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const images_format_priority_1 = [
    '~orig.jpg',
    '~large.jpg',
    '~medium.jpg',
    '~small.jpg',
  ];
  const images_format_priority_2 = [
    '~orig.JPG',
    '~large.JPG',
    '~medium.JPG',
    '~small.JPG',
  ];
  const images_format_priority_3 = [
    '~orig.png',
    '~large.png',
    '~medium.png',
    '~small.png',
  ];
  const images_format_priority_4 = [
    '~orig.PNG',
    '~large.PNG',
    '~medium.PNG',
    '~small.PNG',
  ];

  const updateIndex = () => {
    let newIndex = index + 1;
    setIndex(newIndex);
  };

  useEffect(() => {
    console.log('first useEffect ran!!!');
    fetchMedia();
  }, []);

  useEffect(() => {
    console.log('Media Image URL = ' + media_uri_image);
    console.log('Media Video URL = ' + media_uri_video);
  }, [media_uri_image, media_uri_video]);

  const setImageURL = mediaArray => {
    let imageURI = '';
    let index = 0;
    let i = 0;
    while (imageURI == '' && index < 4 && i < mediaArray.length) {
      console.log('format searching= ' + images_format_priority_1[index]);
      if (
        mediaArray[i].endsWith(images_format_priority_1[index]) ||
        mediaArray[i].endsWith(images_format_priority_2[index]) ||
        mediaArray[i].endsWith(images_format_priority_3[index]) ||
        mediaArray[i].endsWith(images_format_priority_4[index])
      ) {
        imageURI = mediaArray[i];
        setMediaURI_Image(imageURI);
        setContentLoading(false);
        break;
      }
      i++;
      if (i == mediaArray.length) {
        index++;
        i = 0;
      }
    }
    // else {
    //   //placeholder image
    //   setMediaURI_Image(
    //     'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
    //   );
    // }
  };

  const setVideoURL = mediaArray => {
    mediaArray.forEach(element => {
      if (
        element.endsWith('~orig.mp4') ||
        element.endsWith('~orig.mov') ||
        element.endsWith('~orig.MP4') ||
        element.endsWith('~orig.MOV')
      ) {
        setMediaURI_Video(element);
        setContentLoading(false);
      }
    });
  };

  const fetchMedia = async () => {
    setContentLoading(true);
    const media_uri_array = await api.getNASALibraryMediaArray(
      queryItem.jsonLink,
    );

    if (queryItem.media_type == 'image') {
      setImageURL(media_uri_array, index);
    } else {
      setVideoURL(media_uri_array);
    }

    media_uri_array.map(item => {
      console.log('URL = ' + item);
    });
  };

  return (
    <ScrollView
      style={
        useColorScheme() == 'light'
          ? GlobalProps.container
          : GlobalProps.containerDark
      }>
      <TitleWithSubText
        titleText={queryItem.title}
        subText={HelpingFunctions.formatDateTime(queryItem.date)}
      />
      <View>
        {contentLoading ? (
          <Loading />
        ) : (
          <View>
            {loading && <Loading size={'small'} />}
            {media_uri_image != '' ? (
              <View>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setIsVisible(true)}>
                  <FastImage
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                    source={{
                      uri: media_uri_image,
                    }}
                    style={styles.imageContainer}
                  />
                </TouchableOpacity>
                <ImageView
                  images={[{uri: media_uri_image}]}
                  imageIndex={0}
                  visible={isVisible}
                  onRequestClose={() => setIsVisible(false)}
                />
              </View>
            ) : (
              <VideoComponent url={media_uri_video} />
            )}
          </View>
        )}
      </View>
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.bodyStyle}>
          <Text
            style={
              useColorScheme() == 'light'
                ? styles.descriptionStyle
                : styles.descriptionStyleDark
            }>
            {queryItem.description}
          </Text>
        </View>
      </TouchableOpacity>
      <Footer
        url={
          'https://images.nasa.gov/search?q=' +
          queryItem.keywords[0].keyword +
          '&page=1&media=image,video,audio&yearStart=1920&yearEnd=' +
          new Date().getFullYear()
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 400,
    marginVertical: 20,
  },
  descriptionStyle: {
    fontSize: 18,
    fontFamily: 'LibreBaskerville-Regular',
    lineHeight: 30,
    color: '#333',
  },

  descriptionStyleDark: {
    fontSize: 18,
    fontFamily: 'LibreBaskerville-Regular',
    lineHeight: 30,
    color: 'white',
  },

  bodyStyle: {
    padding: 20,
  },
});
