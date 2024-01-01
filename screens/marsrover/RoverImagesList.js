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
import MockMarsRover_FHAZ from '../../MockData/mars_rover_mockData/MockMarsRover_FHAZ';
import ImageList from '../../components/mars_rover/ImageList';
import MockMarsRover_CHEMCAM from '../../MockData/mars_rover_mockData/MockMarsRover_CHEMCAM';
import MockMarsRover_MAST from '../../MockData/mars_rover_mockData/MockMarsRover_MAST';
import MockMarsRover_NAVCAM from '../../MockData/mars_rover_mockData/MockMarsRover_NAVCAM';
import MockMarsRover_RHAZ from '../../MockData/mars_rover_mockData/MockMarsRover_RHAZ';

export default function RoverImagesList({route, navigation}) {
//   const rover = route.params;
//   console.log('Rover = '+rover);
    
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cams, setCams] = useState(Cameras);
  const [indexAdded, setIndexAdded] = useState([]);

  // images array -->
  const [FHAZ_list, setFHAZList] = useState([]);
  const [CHEMCAM_list, setCHEMCAMList] = useState([]);
  const [MAST_list, setMASTList] = useState([]);
  const [RHAZ_list, setRHAZList] = useState([]);
  const [NAVCAM_list, setNAVCAMList] = useState([]);

  useEffect(() => {
    //load the first index
    cleanUpArrays();
    setIndexAdded([]);
    setIndexAdded(prevData => {
      return [0, ...prevData];
    });
    fetchPhotos(0);
  }, []);

  const cleanUpArrays = () => {
    setFHAZList([]);
    setCHEMCAMList([]);
    setMASTList([]);
    setNAVCAMList([]);
    setRHAZList([]);
  };

  const getCameraCodeByIndex = index => {
    return Cameras.find(element => element.id == index);
  };

  // mock data -->
  const mockRover = camCode => {
    switch (camCode) {
      case 'FHAZ':
        return MockMarsRover_FHAZ;
      case 'CHEMCAM':
        return MockMarsRover_CHEMCAM;
      case 'MAST':
        return MockMarsRover_MAST;
      case 'NAVCAM':
        return MockMarsRover_NAVCAM;
      case 'RHAZ':
        return MockMarsRover_RHAZ;
    }
  };

  const fetchPhotos = async index => {
    if (!indexAdded.includes(index) && !isLoading) {
      setIsLoading(true);
      setIndexAdded(prevData => {
        if (index == 0) return [...prevData];
        else return [index, ...prevData];
      });
      const cam = getCameraCodeByIndex(index);
      //   const images = await api.getMarsRoverPhotos(cam.camCode, 1); //API call  comment this to use mock data
      mockRover(cam.camCode).photos.map(image => {      //uncomment to use mock data
        //   images.photos.map(image => {               //comment this to use mock data
        const meta = {
          id: image.id,
          camCode: cam.camCode,
          uri: image.img_src,
        };
        switch (cam.camCode) {
          case 'FHAZ':
            setFHAZList(prevdata => {
              return [...prevdata, meta].slice(-10);
            });
            break;
          case 'CHEMCAM':
            setCHEMCAMList(prevdata => {
              return [...prevdata, meta].slice(-10);
            });
            break;
          case 'MAST':
            setMASTList(prevdata => {
              return [...prevdata, meta].slice(-10);
            });
            break;
          case 'NAVCAM':
            setNAVCAMList(prevdata => {
              return [...prevdata, meta].slice(-10);
            });
            break;
          case 'RHAZ':
            setRHAZList(prevdata => {
              return [...prevdata, meta].slice(-10);
            });
            break;
        }
      });
      setIsLoading(false);
    }
  };

  const flatListRef = useRef(null);
  const pagerViewRef = useRef(null);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        setCurrentIndex(index);
        pagerViewRef.current.setPageWithoutAnimation(index);
        fetchPhotos(index);
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
        }}>
        {item.cam}
      </Text>
    </TouchableOpacity>
  );

  const onPageScroll = event => {
    const index = event.nativeEvent.position; //get the page index
    setCurrentIndex(index);
    flatListRef.current.scrollToIndex({animated: true, index: index});
    fetchPhotos(index);
  };

  const onEndOfListCallback = () => {
    console.log('End of list reached!!');
  };

  return (
    <View style={GlobalProps.container}>
      <View>
        <FlatList
          style = {styles.pagerViewTabs}  
          ref={flatListRef}
          horizontal
          data={cams}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <PagerView
        ref={pagerViewRef}
        onPageSelected={onPageScroll}
        style={styles.pagerView}
        initialPage={0}
        offscreenPageLimit={1}>
        <View key="1">
          <ImageList
            roverImages={FHAZ_list}
            isLoading={isLoading}
            camCode={'FHAZ'}
            onEndOfListCallback={() => onEndOfListCallback()}
          />
        </View>
        <View key="2">
          <ImageList
            roverImages={RHAZ_list}
            isLoading={isLoading}
            camCode={'RHAZ'}
            onEndOfListCallback={() => onEndOfListCallback()}
          />
        </View>
        <View key="3">
          <ImageList
            roverImages={MAST_list}
            isLoading={isLoading}
            camCode={'MAST'}
            onEndOfListCallback={() => onEndOfListCallback()}
          />
        </View>
        <View key="4">
          <ImageList
            roverImages={CHEMCAM_list}
            isLoading={isLoading}
            camCode={'CHEMCAM'}
            onEndOfListCallback={() => onEndOfListCallback()}
          />
        </View>
        <View key="5">
          <ImageList
            roverImages={NAVCAM_list}
            isLoading={isLoading}
            camCode={'NAVCAM'}
            onEndOfListCallback={() => onEndOfListCallback()}
          />
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
  pagerViewTabs:{
    // position:'relative'
  }
});
