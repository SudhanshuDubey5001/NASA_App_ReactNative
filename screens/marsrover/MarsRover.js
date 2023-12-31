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

export default function MarsRover() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [cams, setCams] = useState(Cameras);
  const [marsRoverImages, setMarsRoverImages] = useState([]);

  useEffect(() => {
    //load the first index
    console.log('Use effect ran!!!');
    setIsLoading(true);
    fetchPhotos(0);
  }, []);

  const getCameraCodeByIndex = index => {
    return Cameras.find(element => element.id == index);
  };

  const fetchPhotos = async index => {
    const cam = getCameraCodeByIndex(index);
    // const images = await api.getMarsRoverPhotos(cam.camCode); //API call
    setMarsRoverImages([]);
    console.log('Array erased!!');
    MockMarsRover.photos.map(image => {
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
    setCurrentIndex(index);
    flatListRef.current.scrollToIndex({animated: true, index: index});
  };

  const temp = [{key: 'sudhanshu'}, {key: 'dubey'}];

  return (
    <View style={GlobalProps.container}>
      <Text style={GlobalProps.titleText}>Mars Rover Images Database</Text>
      <View>
        <Text style={styles.text}>{TextualData.MARS_ROVER_explanation}</Text>
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
          <Text style={{color: 'black'}}>ssssss</Text>
          {isLoading ? (
            <ActivityIndicator
              style={GlobalProps.spinnerStyle}
              size={'large'}
              color={Colors.primary}
            />
          ) : (
            <View>
              {console.log('Length - ' + marsRoverImages.length)}
              {marsRoverImages.forEach(item => {
                console.log('Id: ' + item.id);
                console.log('url: ' + item.url);
              })}
              <FlatList
                data={marsRoverImages}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity activeOpacity={1}>
                    <Image
                      resizeMode='stretch'
                      style={styles.imageContainer}
                      source={{uri: item.url}}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
        <View key="2">
          <Text style={{color: 'black'}}>Second page</Text>
        </View>
        <View key="3">
          <Text style={{color: 'black'}}>3 page</Text>
        </View>
        <View key="4">
          <Text style={{color: 'black'}}>4 page</Text>
        </View>
        <View key="5">
          <Text style={{color: 'black'}}>5 page</Text>
        </View>
        <View key="6">
          <Text style={{color: 'black'}}>6 page</Text>
        </View>
        <View key="7">
          <Text style={{color: 'black'}}>7 page</Text>
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
    margin:10,
    backgroundColor: 'black'
  },
});
