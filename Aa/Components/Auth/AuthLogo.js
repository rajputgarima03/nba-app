import React,{Component} from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import {connect} from 'react-redux';
import Logo from '../../Assets/Images/nbaLogo.png'


 
 export default class AuthLogo extends Component {
   

   render(){
    
     return(
       <View  >
     <Image source={Logo}  style={{width:170,height:150}} resizeMode={"contain"}/>    
     
       </View>
     )
   }
 }