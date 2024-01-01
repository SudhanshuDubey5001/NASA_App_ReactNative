import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GlobalProps from '../../global/GlobalProps';
import Colors from '../../global/Colors';
import {useState} from 'react';
import ImageView from 'react-native-image-viewing';

export default function ImageList({
  roverImages,
  isLoading,
  camCode,
  onEndOfListCallback,
}) {
  const [imageViewerVisibility, setImageViewerVisibility] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const onPhotoSelected = (index) => {
    setSelectedImageIndex(index)
    setImageViewerVisibility(true);
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator
          style={GlobalProps.spinnerStyle}
          size={'large'}
          color={Colors.primary}
        />
      ) : (
        <FlatList
          data={roverImages}
          onEndReached={onEndOfListCallback}
          keyExtractor={item => item.id}
          initialNumToRender={3}
          renderItem={({item, index}) =>
            item.camCode == camCode ? (
              <View>
                <TouchableOpacity activeOpacity={1} onPress={() => onPhotoSelected(index)}>
                  <FastImage
                    keyExtractor={item => item.id}
                    resizeMode="stretch"
                    style={styles.imageContainer}
                    source={{uri: item.uri}}
                    onError={error => console.log('error: ' + error)}
                    lazy={true}
                  />
                </TouchableOpacity>
                <ImageView
                  images={roverImages}
                  imageIndex={selectedImageIndex}
                  visible={imageViewerVisibility}
                  onRequestClose={() => setImageViewerVisibility(false)}
                  FooterComponent={({imageIndex}) => (
                    <View style={{padding: 20, justifyContent: 'center'}}>
                      <Text>
                        {imageIndex+1}/{roverImages.length}
                      </Text>
                    </View>
                  )}
                />
              </View>
            ) : (
              <View></View>
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 350,
    alignSelf: 'center',
    margin: 10,
    backgroundColor: 'black',
  },
});
