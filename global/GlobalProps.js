import {StyleSheet, useColorScheme} from 'react-native';
import Colors from './Colors';
import GlobalStylesConstants from './GlobalStylesConstants';

const GlobalProps = {
  titleText: {
    fontSize: 26,
    paddingHorizontal: 20,
    paddingVertical: 40,
    fontFamily: 'LibreBaskerville-Bold',
    backgroundColor: Colors.primary,
    color: GlobalStylesConstants.headerTextColor,
  },
  container: {
    flex: 1,
    backgroundColor: GlobalStylesConstants.backgroundColorLight,
  },
  containerDark: {
    flex: 1,
    backgroundColor: GlobalStylesConstants.backgroundColorDark,
  },
  spinnerStyle: {
    marginVertical: 100,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    margin: 10,
    alignSelf: 'center',
    backgroundColor: 'black',
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginHorizontal: 20,
  },
};

export default GlobalProps;
