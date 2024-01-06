import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Colors from '../../../global/Colors';
import {useState} from 'react';
import Loading from '../../../global/components/Loading';
import {ScrollView} from 'react-native-gesture-handler';

export default function ListItem({item, onPressKeyword, onPressDataItem}) {
  const [state, setState] = useState({loading: true});

  const getIds = () => {
    item.keywords.map(element => {
      console.log('Id: ' + element.id);
    });
  };

  return (
    <View style={styles.cardStyle}>
      {state.loading && <Loading size={'small'} />}
      <TouchableOpacity activeOpacity={1} onPress={() => onPressDataItem(item)}>
        <FastImage
          style={styles.imageContainer}
          source={{uri: item.imageLink}}
          onLoadStart={() => setState({loading: true})}
          onLoadEnd={() => setState({loading: false})}
        />
        <View
          style={
            useColorScheme() == 'light'
              ? styles.imageSubtextStyle
              : styles.imageSubtextDarkStyle
          }>
          <Text
            style={
              useColorScheme() == 'light'
                ? styles.captionStyle
                : styles.captionStyleDark
            }>
            {item.title}
          </Text>
          <View>
            <Text
              style={
                useColorScheme() == 'light'
                  ? styles.captionStyle
                  : styles.captionStyleDark
              }>
              Keywords:{' '}
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {item.keywords.map(element => (
                <TouchableOpacity
                  onPress={() => onPressKeyword(element.keyword)}>
                  <Text style={styles.keywordStyle}>{element.keyword} </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  keywordStyle: {
    padding: 5,
    margin: 5,
    backgroundColor: Colors.tertiary2,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 7,
    fontSize: 15,
    color: 'white',
  },
  cardStyle: {
    marginHorizontal: 10,
    marginBottom: 30,
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  captionStyle: {
    fontSize: 15,
    fontFamily: 'LibreBaskerville-Bold',
    paddingVertical: 10,
    color: 'black',
  },
  captionStyleDark: {
    fontSize: 15,
    fontFamily: 'LibreBaskerville-Bold',
    paddingVertical: 10,
    color: 'white',
  },
  imageSubtextStyle: {
    padding: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageSubtextDarkStyle: {
    padding: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: 'white',
  },
});
