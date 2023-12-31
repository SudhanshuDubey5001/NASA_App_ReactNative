import {StyleSheet} from 'react-native';
import Colors from './Colors';

const GlobalProps = {
  titleText: {
    fontSize: 26,
    paddingHorizontal: 20,
    paddingVertical: 40,
    color: 'black',
    fontFamily: 'LibreBaskerville-Bold',
    backgroundColor: Colors.primary,
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
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
};

export default GlobalProps;
