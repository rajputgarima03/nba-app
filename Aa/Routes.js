import React from 'react';
import  {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createSwitchNavigator} from 'react-navigation'; 
import {createAppContainer} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {View,Text,StyleSheet,Image} from 'react-native';

//SCREENS

import AuthComponent from './Components/Auth/Index';
import Games from './Components/Games/Index';
import News from './Components/News/Index';
import Article from './Components/News/Article';
import GamesArticle from './Components/Games/Article'
import UserComponent from './Components/User/Index'

//asset
import Logo from './util/Logo';



 
const headerConf={
headerLayoutPreset:'center',
defaultNavigationOptions:{
    headerStyle:{
        backgroundColor:'#001338'
    },
    headerTintColor:'white',
    headerTitle:Logo
}
}





const newsStack = createStackNavigator({
    News:News,
     Article:Article
},headerConf)

const gamesStack = createStackNavigator({
    Games : Games ,
    GamesArticle:GamesArticle
},headerConf)



const appStack = createBottomTabNavigator({
    News:newsStack,
    Games:gamesStack,
    User:UserComponent
},
{
    tabBarOptions:{
        activeTintColor:'#fff',
        activeBackgroundColor:"#00194b",
        showLabel:false,
        inactiveBackgroundColor:'#001338',
        style:{
        backgroundColor:'#001338'
        }
    },
    initialRouteName:'News',
    defaultNavigationOptions:({navigation})=>({
    tabBarIcon:({focused,horizontal,tintColor})=>{
    const {routeName} = navigation.state;
    
    let iconName;
    if(routeName==='News'){
    iconName=require('./Assets/Images/basketball.png');
    }
    if(routeName==='Games'){
    
    iconName=require('./Assets/Images/download.png');
    }
    if(routeName==='User'){
    
        iconName=require('./Assets/Images/User.png');
        }
    
    return(<Image source={iconName} style={{height:20,width:20}}/>)
    }
})
})
  
const authStack = createStackNavigator({
    AuthComponent:AuthComponent},{
        headerMode:'none'
})

const switchStack = createSwitchNavigator({ 
    
    
    Auth:authStack,
    App:appStack, 
    
});

// export default createAppContainer(switchStack)
export const RootNavigator=()=>{
    return createAppContainer(switchStack)
}
