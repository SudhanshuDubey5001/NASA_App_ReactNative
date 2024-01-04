import {ActivityIndicator} from 'react-native';
import GlobalProps from '../GlobalProps';
import Colors from '../Colors';

export default function Loading({size}) {
  return (
    <ActivityIndicator
      style={GlobalProps.spinnerStyle}
      size={size || 'large'}
      color={Colors.primary}
    />
  );
}
