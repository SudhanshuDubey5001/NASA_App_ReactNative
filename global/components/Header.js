import { StatusBar, StyleSheet, Text, View } from "react-native";
import globalStylesConstants from '../GlobalStylesConstants'
import GlobalStylesConstants from "../GlobalStylesConstants";
import Colors from "../Colors";

export default function Header({navgation, title}){
    return(
        <View style = {styles.container}>
            <StatusBar
            backgroundColor={Colors.primary}/>
            <Text style={styles.content}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:globalStylesConstants.headerBackgroundColor,
    },
    content:{
        padding:10,
        fontSize:20,
        color:globalStylesConstants.headerTextColor,
        alignSelf:'center'
    }
})