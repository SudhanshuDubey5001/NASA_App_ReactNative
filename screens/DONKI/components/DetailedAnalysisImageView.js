import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import GlobalProps from '../../../global/GlobalProps';
import {useState} from 'react';
import Loading from '../../../global/components/Loading';

export default function DetailedAnalysisImageView({uri}) {
  const [isLoading, setLoading] = useState(false);
 
  return (
    <View>
      {isLoading && <Loading size={'small'}/>}
        <FastImage
          resizeMode="contain"
          style={GlobalProps.imageContainer}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          source={{
            uri: uri,
          }}
        />
    </View>
  );
};
