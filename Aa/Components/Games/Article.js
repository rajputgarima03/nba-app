import React,{Component} from 'react';
import {View,Text,StyleSheet, ActivityIndicator, Image, Button} from 'react-native';
import {connect} from 'react-redux';
import Video from 'react-native-video';
import { ScrollView } from 'react-native-gesture-handler';
import Sad from '../../Assets/Images/sad.jpeg'
import play from '../../Assets/Video/BasketballMatch.mp4'
import {auto_sign_in} from '../../store/actions/User_action';
import {getTokens,setTokens} from '../../util/misc'
  class GamesArticle extends Component {
   
state={
  loading:true,
  isAuth:false
}
manageAcces( loading,isAuth){
  this.setState({
    loading,
    isAuth
  })
}
componentDidMount(){
 const  User= this.props.User;
 getTokens((value)=>{
  if (value[0][1]==null) {
    this.manageAcces(false,false)
    
  } else {
this.props.dispatch(auto_sign_in(value[1][1])).then(()=>{
  if (!this.props.User.auth.token) {
    this.manageAcces(false,false)
  } else {
    setTokens(this.props.User.auth,()=>{
      this.manageAcces(false,true)
    })
  }

})
  }
})
}
   render(){
    const params= this.props.navigation.state.params
     
       if(this.state.loading){
         return(
         <View style={styles.loading}>
         <ActivityIndicator/>
         </View>)
       }
       else{

                    if(this.state.isAuth){
                  return(
                    <ScrollView style={{backgroundColor:"#F0F0F0"}}>
                  <Video source={play}
                  muted={true}
                  controls={true}
                  paused={true}
                  resizeMode="cover"
                  style={{width:'100%',height:250}}
                  />
                      </ScrollView>
                  )
                    }
                    else{
                      return(
                  <View style={styles.notAuth}>
                    
                      <Image  source={Sad} style={{height:100,width:100}}/>
                    
                     
                       <Text style={styles.notAuthText}> We are sorry, you need to be 
                       registered/logged in to      watch this video</Text>
                       <Button title='Login/Register' onPress={()=>{this.props.navigation.navigate('Auth')}}/>
                
                     
                        </View>
                      )
                    }

      
  
       }
   }
 }

 function mapStateToProps (state){
  console.warn(state);
  return{
    User: state.User
  }
}


 const styles = StyleSheet.create({
   loading:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'#fff'
   },
   notAuth:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'#fcf8f7'
   },
   
   notAuthText:{
    fontSize:15,
    fontFamily:"Feather",
    fontWeight:'normal'
   },
   
 })

 export default connect(mapStateToProps)(GamesArticle)