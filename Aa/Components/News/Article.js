import React,{Component} from 'react';
import {View,Text,StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';


 
 export default class ArticleComponent extends Component {
  
  formatText=(content)=>{
const text= content.replace(/<p>/g,"").replace(/<\/p>/g,"");
return text
  }


   render(){
    const params = this.props.navigation.state.params;

     return(

      <ScrollView style={{backgroundColor:'#F0F0F0'}}> 
      <Image source={{uri:params.image}} style={{height:250}} resizeMode='cover'/>
       <View style={styles.articleContainer}>
         <Text style={styles.articleTitle}>
           {params.title}
         </Text>
         <Text style={styles.articleData}>
           {params.team}- Posted at {params.date}
           </Text>
       </View>
       <View style={styles.articleContent}>
         <Text style={styles.articleText}>
           {this.formatText(params.content)}
         </Text>
         </View>
       </ScrollView>
     )
   }
 }

 const styles= StyleSheet.create({
  articleContainer:{
   padding:10
  },
  articleTitle:{
    color:"#323232",
    fontSize:23,
    fontFamily:"Feather",
    fontWeight:'bold'
  },
  articleData:{
    color:"#828282",
    fontSize:12,
    fontFamily:"Feather",
    fontWeight:'normal'
  },
  articleContent:{
   margin:30 
  }
  ,
articleText:{
  fontSize:14,
  lineHeight:20,
  fontFamily:"Feather",
  fontWeight:'normal'
}


 })