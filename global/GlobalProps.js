import { StyleSheet } from "react-native";
import Colors from "./Colors";

const GlobalProps = {
  titleText: {
    fontSize: 26,
    paddingHorizontal:20,
    paddingVertical:40,
    color: 'black',
    fontFamily: 'LibreBaskerville-Bold',
    backgroundColor:Colors.primary,
    color:'white'
  },
  container: {
    flex: 1,
    // paddingTop: 20,
    // paddingLeft: 20,
    // paddingRight: 20,
    backgroundColor: 'white',
  },
};

export default GlobalProps;
