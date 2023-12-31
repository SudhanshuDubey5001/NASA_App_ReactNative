import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import GlobalProps from '../../global/GlobalProps';
import TextualData from '../../repository/TextualData';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Cameras from './Cameras';
import Colors from '../../global/Colors';
import api from '../../api/NasaAPIs';
import MockMarsRover from '../../MockData/MockMarsRover';
import FastImage from 'react-native-fast-image';

export default function RoverImagesList() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cams, setCams] = useState(Cameras);
  const [marsRoverImages, setMarsRoverImages] = useState([]);

  useEffect(() => {
    //load the first index
    console.log('Use effect ran!!!');
    setMarsRoverImages([]);
    fetchPhotos(0);
  }, []);

  const getCameraCodeByIndex = index => {
    return Cameras.find(element => element.id == index);
  };

  const fetchPhotos = async index => {
    setIsLoading(true);
    const cam = getCameraCodeByIndex(index);
    const images = await api.getMarsRoverPhotos(cam.camCode); //API call
    // MockMarsRover.photos.map(image => {
    setMarsRoverImages([]);    
    images.photos.map(image => {
      const meta = {
        id: image.id,
        camCode: cam.camCode,
        url: image.img_src,
      };
      setMarsRoverImages(prevdata => {
        return [...prevdata, meta];
      });
    });
    console.log('Array added!!');
    marsRoverImages.forEach(element => {
      console.log('Images - ' + element.url);
    });
    setIsLoading(false);
  };

  const flatListRef = useRef(null);
  const pagerViewRef = useRef(null);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        setCurrentIndex(index);
        pagerViewRef.current.setPageWithoutAnimation(index);
      }}
      style={{
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:
          currentIndex === index ? Colors.primary : Colors.tertiary,
        padding: 10,
        borderBottomColor: currentIndex == index ? 'red' : 'white',
        borderBottomWidth: currentIndex == index ? 5 : 0,
      }}>
      <Text
        style={{
          color: currentIndex === index ? 'white' : 'black',
          fontSize: 18,
          elevation: currentIndex == index ? 10 : 0,
        }}>
        {item.cam}
      </Text>
    </TouchableOpacity>
  );

  const onPageScroll = event => {
    const index = event.nativeEvent.position; //get the page index
    fetchPhotos(index);
    setCurrentIndex(index);
    flatListRef.current.scrollToIndex({animated: true, index: index});
  };

  return (
    <View style={GlobalProps.container}>
      <View>
        <FlatList
          ref={flatListRef}
          horizontal
          data={cams}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={true}
        />
      </View>

      <PagerView
        ref={pagerViewRef}
        onPageSelected={onPageScroll}
        style={styles.pagerView}
        initialPage={0}>
        <View key="1">
          {isLoading ? (
            <ActivityIndicator
              style={GlobalProps.spinnerStyle}
              size={'large'}
              color={Colors.primary}
            />
          ) : (
            <View>
              <FlatList
                data={marsRoverImages}
                keyExtractor={item => item.id}
                renderItem={({item}) =>
                  item.camCode == 'FHAZ' ? (
                    <TouchableOpacity activeOpacity={1}>
                      <FastImage
                        resizeMode="stretch"
                        style={styles.imageContainer}
                        source={{uri: item.url}}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View></View>
                  )
                }
              />
            </View>
          )}
        </View>
        <View key="2">
          {isLoading ? (
            <ActivityIndicator
              style={GlobalProps.spinnerStyle}
              size={'large'}
              color={Colors.primary}
            />
          ) : (
            <View>
              <FlatList
                data={marsRoverImages}
                keyExtractor={item => item.id}
                renderItem={({item}) =>
                  item.camCode == 'RHAZ' ? (
                    <TouchableOpacity activeOpacity={1}>
                      <FastImage
                        resizeMode="stretch"
                        style={styles.imageContainer}
                        source={{uri: item.url}}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View></View>
                  )
                }
              />
            </View>
          )}
        </View>
        <View key="3">
          {isLoading ? (
            <ActivityIndicator
              style={GlobalProps.spinnerStyle}
              size={'large'}
              color={Colors.primary}
            />
          ) : (
            <View>
              <FlatList
                data={marsRoverImages}
                keyExtractor={item => item.id}
                renderItem={({item}) =>
                  item.camCode == 'MAST' ? (
                    <TouchableOpacity activeOpacity={1}>
                      <FastImage
                        resizeMode="stretch"
                        style={styles.imageContainer}
                        source={{uri: item.url}}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View></View>
                  )
                }
              />
            </View>
          )}
        </View>
        <View key="4">
          {isLoading ? (
            <ActivityIndicator
              style={GlobalProps.spinnerStyle}
              size={'large'}
              color={Colors.primary}
            />
          ) : (
            <View>
              <FlatList
                data={marsRoverImages}
                keyExtractor={item => item.id}
                renderItem={({item}) =>
                  item.camCode == 'CHEMCAM' ? (
                    <TouchableOpacity activeOpacity={1}>
                      <FastImage
                        resizeMode="stretch"
                        style={styles.imageContainer}
                        source={{uri: item.url}}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View></View>
                  )
                }
              />
            </View>
          )}
        </View>
        <View key="5">
          {isLoading ? (
            <ActivityIndicator
              style={GlobalProps.spinnerStyle}
              size={'large'}
              color={Colors.primary}
            />
          ) : (
            <View>
              <FlatList
                data={marsRoverImages}
                keyExtractor={item => item.id}
                renderItem={({item}) =>
                  item.camCode == 'MAHLI' ? (
                    <TouchableOpacity activeOpacity={1}>
                      <FastImage
                        resizeMode="stretch"
                        style={styles.imageContainer}
                        source={{uri: item.url}}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View></View>
                  )
                }
              />
            </View>
          )}
        </View>
        <View key="6">
          {isLoading ? (
            <ActivityIndicator
              style={GlobalProps.spinnerStyle}
              size={'large'}
              color={Colors.primary}
            />
          ) : (
            <View>
              <FlatList
                data={marsRoverImages}
                keyExtractor={item => item.id}
                renderItem={({item}) =>
                  item.camCode == 'MARDI' ? (
                    <TouchableOpacity activeOpacity={1}>
                      <FastImage
                        resizeMode="stretch"
                        style={styles.imageContainer}
                        source={{uri: item.url}}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View></View>
                  )
                }
              />
            </View>
          )}
        </View>
        <View key="7">
          {isLoading ? (
            <ActivityIndicator
              style={GlobalProps.spinnerStyle}
              size={'large'}
              color={Colors.primary}
            />
          ) : (
            <View>
              <FlatList
                data={marsRoverImages}
                keyExtractor={item => item.id}
                renderItem={({item}) =>
                  item.camCode == 'NAVCAM' ? (
                    <TouchableOpacity activeOpacity={1}>
                      <FastImage
                        resizeMode="stretch"
                        style={styles.imageContainer}
                        source={{uri: item.url}}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View></View>
                  )
                }
              />
            </View>
          )}
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 30,
    color: 'black',
  },
  pagerView: {
    flex: 1,
  },
  camerasItemStyle: {
    width: 150,
    padding: 10,
    backgroundColor: Colors.tertiary,
  },
  itemStyle: {
    color: 'black',
    fontSize: 18,
  },
  imageContainer: {
    width: '100%',
    height: 350,
    alignSelf: 'center',
    margin: 10,
    backgroundColor: 'black',
  },
});
