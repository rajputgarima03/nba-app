import React,{Component} from 'react';
import {View,Text,Platform,StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Routes, { RootNavigator } from './Aa/Routes'

 
 export default class App extends Component {
   

   render(){
     const Nav= RootNavigator()
     return(
         <Nav/>
     )
   }
 }