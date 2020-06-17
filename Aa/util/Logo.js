import React,{Component} from 'react';
import {Image} from 'react-native';
import Logo from '../Assets/Images/nbaLogo.png'


 
  const LogoImage =()=>{
  
     return(
         <Image 
         source={Logo}
         style={{height:35,width:70}}/>
     )
   
 }
 export default LogoImage