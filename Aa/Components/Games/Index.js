import React,{Component} from 'react';
import {View,Text,StyleSheet, Image} from 'react-native';
import {connect} from 'react-redux';
import {get_games} from '../../store/actions/Games_action'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Moment from 'moment';

 
 
 class GamesComponent extends Component {
   
componentDidMount(){
  this.props.dispatch(get_games())
}

showGames=(list)=>{
  if(list.games){
    
 return (list.games.map((item,i)=>(
<TouchableOpacity onPress={()=>{this.props.navigation.navigate('GamesArticle',{...item})}}
key={i}>
<View style={styles.gamesContainer}>
  <View style={styles.gamesBox}>
    <Image source={{uri:`${item.awayData.logo}`}}
    style={{height:80,width:80}} resizeMode='contain'/>
    <Text style={styles.gameRecord}>{item.awayData.wins}-{item.awayData.loss}</Text>
    </View>
    <View style={styles.gamesBox}>
  <Text style={styles.gameTime}>{item.time}</Text>
 <Text style={styles.gameDate}>{Moment(item.date).format('d MMMM')}</Text>
    </View>
    <View style={styles.gamesBox}>
    <Image source={{uri:`${item.localData.logo}`}}
    style={{height:80,width:80}} resizeMode='contain'/>
    <Text style={styles.gameRecord}>{item.localData.wins}-{item.localData.loss}</Text>
    </View>
  </View>
</TouchableOpacity>
 )))
  }
  else{
    return null
  }
}


   render(){
    
     return(
      <ScrollView style={{backgroundColor:"#F0F0F"}}>
     
       
     {this.showGames(this.props.Games)}
     
      </ScrollView>
     )
   }
 }

 function mapStateToProps (state){
   
  
  console.log(state);
 return{
   Games: state.Games
 }
}
const styles=StyleSheet.create({
  gamesContainer:{
    flexDirection:'row',
      backgroundColor:'#fff',
      marginBottom:10,
      shadowColor:'#dddddd',
      shadowOffset:{height:2,width:0},
      shadowOpacity:0.8,
      shadowRadius:2,
      elevation:1,
      borderRadius:2
  },
  gamesBox:{
width:"33.33%",
height:100,
justifyContent:'center',
alignItems:"center"

  },
  gameRecord:{
    fontSize:12,
     fontFamily:"Feather",
     fontWeight:'normal'
  },
  gameTime:{
    
    fontFamily:"Feather",
    fontWeight:'bold',

    fontSize:15
  }
})


export default connect(mapStateToProps)(GamesComponent)