import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GlobalProps from '../../global/GlobalProps';
import HotDogButton from '../../components/HotDogButton';
import TextualData from '../../repository/TextualData';

export default function Donki({navigation}) {

    const navigate_CME =() => {
      navigation.navigate('CME');
    }
    
    const navigate_GMS =() => {
      navigation.navigate('GMS');
    }
    
    const navigate_SF =() => {
      navigation.navigate('SF');
    }

  return (
    <View style={GlobalProps.container}>
      <Text style={GlobalProps.titleText}>
        Space Weather Database Of Notifications, Knowledge, Information (DONKI)
      </Text>
      <HotDogButton title={'Coronal Mass Ejection'} onPressAction={navigate_CME}/>
      <HotDogButton title={'Gemagnetic Storm'} onPressAction={navigate_GMS}/>
      <HotDogButton title={'Solar Flare'} onPressAction={navigate_SF}/>
      <Text style = {styles.text}>{TextualData.DONKI_explanation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    marginTop:10,
    fontSize: 18,
    padding: 10,
    color:'black'
  },
});
