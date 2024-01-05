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
import ImageVideoRadioButton from './components/ImageVideoRadioButton';
import HotDogButton from '../../global/components/HotDogButton';

export default function NasaLibrary({navigation}) {
  const mediaType = {image: 'image', video: 'video'};
  const [mediaTypeSelected, setMediaTypeSelection] = useState('image');
  // let mediaTypeSelected = 'image';
  const [queryData, setQueryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  let userInput;
  const [_doesFirstTimeSearchHappened, _setDoesFirstTimeSearchHappened] =
    useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    resetData();
  }, []);

  useEffect(() => {
    console.log('List data updated!');
  }, [queryData]);

  useEffect(() => {
    if (_doesFirstTimeSearchHappened) {
      console.log('Page = ' + page);
      fetchQueryResult(userQuery, mediaTypeSelected, page);
    }
  }, [page]);

  const fetchQueryResult = async (query, media_type, page) => {
    console.log('fetching data....');
    console.log('Input = ' + query);
    setUserQuery(query);
    setIsLoading(true);
    const queryResult = await api.getNASALibraryImages(query, media_type, page); //API call
    if (queryResult.collection.items.length > 0) {
      // if (MockImageData.collection.items.length > 0) {
      _setDoesFirstTimeSearchHappened(true);
      setNoDataFound(false);
      queryResult.collection.items.map(item => {
        // MockImageData.collection.items.map(item => {
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
    if (_doesFirstTimeSearchHappened) {
      const newPage = page + 1;
      setPage(newPage);
      //now page useEffect will run once the page is updated and load the next page content
    }
  };

  const showMore = () => {};

  const resetData = () => {
    _setDoesFirstTimeSearchHappened(false);
    setPage(1);
    setQueryData([]);
    console.log('Array cleared');
  };

  const onPressRadioButton = selection => {
    setMediaTypeSelection(selection);
    console.log('Media type selected = ' + selection);
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
        <Button title="clear" onPress={() => resetData()} />
        <ImageVideoRadioButton
          mediaTypeSelected={mediaTypeSelected}
          onPressMediaType={onPressRadioButton}
        />
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

  const footer = () => {
    return (
      <View>
        {isLoading && <Loading size={'large'} />}
        {/* {_doesFirstTimeSearchHappened && (
          <TouchableOpacity
            style={styles.showMoreButtonStyle}
            onPress={showMore}>
            <Text style={styles.showMoreButtonTextStyle}>Show more</Text>
          </TouchableOpacity>
        )} */}
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
        ListFooterComponent={footer}
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
  showMoreButtonStyle: {
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 30,
    elevation: 2,
    backgroundColor: 'white',
    width: 'auto',
    alignSelf: 'center',
    backgroundColor: Colors.tertiary2,
  },
  showMoreButtonTextStyle: {
    fontSize: 16,
    color: 'white',
    paddingVertical: 7,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
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
