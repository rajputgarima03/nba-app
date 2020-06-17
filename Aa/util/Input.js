import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,TextInput} from 'react-native';




 
 const input=(props)=>{
let template=null
    switch(props.type){
        case 'textinput':
            template=<TextInput {...props}
            style={[styles.input,props.overrideStyle]}/>
            break;
            default : return template
    }
    return template

 }
 const styles = StyleSheet.create({
     input:{
         width:'100%',
         borderBottomColor:"#eaeaea",
         borderBottomWidth:2,
         fontSize:16,
         padding:5,
         marginTop:10
     }
 });




 export default input;
