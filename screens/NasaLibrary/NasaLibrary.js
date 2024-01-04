import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Colors from '../../global/Colors';
import GlobalProps from '../../global/GlobalProps';
import api from '../../api/NasaAPIs';
import MockImageData from '../../MockData/nasa_lib/MockImageData';
import ListItem from './components/ListItem';
import {FlatList} from 'react-native-gesture-handler';
import Loading from '../../global/components/Loading';
import Footer from '../../global/components/Footer';
import FastImage from 'react-native-fast-image';
import Routes from '../../routes/Routes';

export default function NasaLibrary({navigation}) {
  const mediaType = {image: 'image', video: 'video'};
  const [mediaTypeSelected, setMediaTypeSelection] = useState('image');
  const [queryData, setQueryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  let userInput;
  const [_firstTimeSearch, _setFirstTimeSearch] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    resetData();
  }, []);

  console.log('ColourScheme = ' + useColorScheme());

  const fetchQueryResult = async (query, media_type, page) => {
    console.log('fetching data....');
    console.log('Input = ' + query);
    setUserQuery(query);
    setIsLoading(true);
    // const queryResult = await api.getNASALibraryImages(query, media_type, page); //API call
    // if (queryResult.collection.items.length > 0) {
    if (MockImageData.collection.items.length > 0) {
      _setFirstTimeSearch(true);
      setNoDataFound(false);
      // queryResult.collection.items.map(item => {
      MockImageData.collection.items.map(item => {
        const keywords = [];
        let index = 0;
        item.data[0].keywords.map(keyword => {
          keywords.push({id: index, keyword: keyword});
          index++;
        });
        const queryItem = {
          id: item.data[0].nasa_id,
          title: item.data[0].title,
          date: item.data[0].date_created,
          description: item.data[0].description,
          imageLink: item.links[0].href,
          jsonLink: item.href,
          keywords: keywords,
          media_type: mediaTypeSelected,
        };
        setQueryData(prevData => {
          return [...prevData, queryItem];
        });
      });
    } else {
      setNoDataFound(true);
    }
    setIsLoading(false);
  };

  const onPressKeyword = keyword => {
    console.log(keyword);
    resetData();
    //need 200ms before fetching new data as the old data persists if we don't give time to reset
    setTimeout(() => {
      fetchQueryResult(keyword, mediaTypeSelected, page);
    }, 200);
  };

  const onPressDataItem = item => {
    navigation.navigate(Routes.NASA_LIBRARY_ITEM, item);
  };

  const onEndOfListCallback = () => {
    console.log('End of list reached!!');
    if (_firstTimeSearch) {
      const newPage = page + 1;
      setPage(newPage);
      fetchQueryResult(userQuery, mediaTypeSelected, page);
    }
  };

  const resetData = () => {
    _setFirstTimeSearch(false);
    setPage(1);
    setQueryData([]);
    console.log('Array cleared');
  };

  const header = () => {
    return (
      <View
        style={
          useColorScheme() == 'light'
            ? GlobalProps.container
            : GlobalProps.containerDark
        }>
        <Text style={GlobalProps.titleText}>NASA Image and Video Library</Text>
        <View
          style={
            useColorScheme() == 'light'
              ? styles.textInputStyle
              : styles.textInputStyleDark
          }>
          <TextInput
            placeholder="Discover the wonders of astronomy..."
            onChangeText={value => {
              userInput = value;
            }}
            value={userInput}
            fontSize={15}
            textInputStyle={{color: 'black'}}
            placeholderTextColor={'gray'}
            onSubmitEditing={() => {
              resetData();
              fetchQueryResult(userInput, mediaTypeSelected, page);
            }}
          />
        </View>
        <View style={styles.mediaTypeStyle}>
          <View style={styles.radioButtonStyle}>
            <RadioButton
              value={mediaType.image}
              status={
                mediaTypeSelected == mediaType.image ? 'checked' : 'unchecked'
              }
              onPress={() => setMediaTypeSelection(mediaType.image)}
              color={useColorScheme() == 'light' ? Colors.primary : 'white'}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setMediaTypeSelection(mediaType.image)}>
              <Text style={styles.radioButtonText}>Image</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.radioButtonStyle}>
            <RadioButton
              value={mediaType.video}
              status={
                mediaTypeSelected == mediaType.video ? 'checked' : 'unchecked'
              }
              onPress={() => setMediaTypeSelection(mediaType.video)}
              color={useColorScheme() == 'light' ? Colors.primary : 'white'}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setMediaTypeSelection(mediaType.video)}>
              <Text style={styles.radioButtonText}>Video</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {userQuery != '' ? (
            <Text style={styles.queryStyle}>
              Showing result of "{userQuery}"
            </Text>
          ) : (
            <View></View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View
      style={
        useColorScheme() == 'light'
          ? GlobalProps.container
          : GlobalProps.containerDark
      }>
      <FlatList
        ListHeaderComponent={header}
        keyExtractor={item => item.id}
        onEndReached={onEndOfListCallback}
        data={queryData}
        renderItem={({item}) => (
          <View>
            {queryData.length > 0 ? (
              <ListItem
                item={item}
                onPressKeyword={onPressKeyword}
                onPressDataItem={onPressDataItem}
              />
            ) : (
              <View></View>
            )}
          </View>
        )}
        ListFooterComponent={isLoading && <Loading size={'large'} />}
      />
      {queryData.length == 0 && !isLoading && noDataFound && (
        <View>
          <FastImage
            resizeMode="contain"
            style={styles.noDataFoundStyle}
            source={require('../../assets/images/notfound.png')}
          />
          <Text style={{alignSelf: 'center'}}>Oops..not available</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noDataFoundStyle: {
    width: 200,
    height: 100,
    alignSelf: 'center',
    marginTop: 100,
  },
  radioButtonText: {
    padding: 8,
  },
  radioButtonStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mediaTypeStyle: {
    margin: 10,
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
  textInputStyle: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 1,
    margin: 10,
  },
  textInputStyleDark: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 1,
    margin: 10,
    borderColor: 'white',
  },
  queryStyle: {
    paddingHorizontal: 10,
    fontSize: 24,
    marginBottom: 20,
    marginTop: 10,
    fontFamily: 'LibreBaskerville-Bold',
  },
});
