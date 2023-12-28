import {StyleSheet, View, Text} from 'react-native';
import Colors from '../../global/Colors';

export default function NotificationsCard({item}) {
  return (
    <View style={styles.card}>
      <Text style={styles.textTitle}>{item.messageTitle}</Text>
      <Text style={styles.textBody} numberOfLines={4} ellipsizeMode='tail'>{item.messageSummary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    elevation: 10,
    borderRadius: 10,
    height: 200,
    width:350,
  },
  textTitle: {
    fontSize: 20,
    padding: 10,
    fontWeight:'500',
    color:'#333',
    backgroundColor:Colors.tertiary
  },
  textBody:{
    fontSize:17,
    padding:10,
    color:'black',
  }
});
