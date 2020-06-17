import React,{Component} from 'react';
import {View,Text,StyleSheet, Image, Button, AsyncStorage, Alert} from 'react-native';

export default class UserComponent extends Component {
   
    logout=()=>{
        Alert.alert(
            'Logout?',
            'Sure you want to logout?',
            [
                {
                    text: 'cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        // Redux function clear all
                        AsyncStorage.clear().then(this.props.navigation.navigate('Auth'))
                    },
                },
            ],
            { cancelable: false }
        );
     }
   
    render(){
        return(
            <View style={styles.main}>
                <Button title="Do you want to logout" onPress={()=>{this.logout()}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
main:{
    backgroundColor:"#1d428a",
    flex:1,
    justifyContent:'center',
    alignItems:'center'
}
})