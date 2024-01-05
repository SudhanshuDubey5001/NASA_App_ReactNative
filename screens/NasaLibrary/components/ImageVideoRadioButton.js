import {
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../global/Colors';
import { RadioButton } from 'react-native-paper';
import { useState } from 'react';

export default function ImageVideoRadioButton({mediaTypeSelected, onPressMediaType}) {
  const mediaType = {image: 'image', video: 'video'};
  // const [mediaTypeSelected, setMediaTypeSelection] = useState('image');
  // var mediaTypeSelected = mediaType.image;

  return (
    <View style={styles.mediaTypeStyle}>
      <View style={styles.radioButtonStyle}>
        <RadioButton
          value={mediaType.image}
          status={
            mediaTypeSelected == mediaType.image ? 'checked' : 'unchecked'
          }
          onPress={() => {
            // mediaTypeSelected = mediaType.image;
            // setMediaTypeSelection(mediaType.image);
            onPressMediaType(mediaType.image);
          }}
          color={useColorScheme() == 'light' ? Colors.primary : 'white'}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            // mediaTypeSelected = mediaType.image;
            // setMediaTypeSelection(mediaType.image);
            onPressMediaType(mediaType.image);
          }}>
          <Text style={styles.radioButtonText}>Image</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.radioButtonStyle}>
        <RadioButton
          value={mediaType.video}
          status={
            mediaTypeSelected == mediaType.video ? 'checked' : 'unchecked'
          }
          onPress={() => {
            // mediaTypeSelected = mediaType.video;
            // setMediaTypeSelection(mediaType.video);
            onPressMediaType(mediaType.video);
          }}
          color={useColorScheme() == 'light' ? Colors.primary : 'white'}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            // mediaTypeSelected = mediaType.video;
            // setMediaTypeSelection(mediaType.video);
            onPressMediaType(mediaType.video);
          }}>
          <Text style={styles.radioButtonText}>Video</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
