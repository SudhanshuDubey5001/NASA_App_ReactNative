import { StyleSheet, Text, View } from "react-native";
import globalStylesConstants from '../global/GlobalStylesConstants'

export default function Header(){
    return(
        <View style = {styles.container}>
            <Text style={styles.content}>N A S A</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:globalStylesConstants.headerBackgroundColor,
        elevation:10,
    },
    content:{
        padding:10,
        paddingTop:20,
        fontSize:24,
        color:globalStylesConstants.headerTextColor,
        alignSelf:'center'
    }
})