import React,{Component} from 'react';
import {View,Text,StyleSheet, ActivityIndicator,ScrollView,Image} from 'react-native';
import AuthLogo from './AuthLogo'
import Logo from "../../Assets/Images/nbaLogo.png"
import AuthForm from './AuthForm';
 import {getTokens,setTokens} from '../../util/misc'
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';
 import {auto_sign_in} from '../../store/actions/User_action';
 class AuthComponent extends Component {
 
state={
  loading:false
}
goNext=()=>{
  this.props.navigation.navigate('App');
}
componentDidMount(){
getTokens((value)=>{
if (value[0][1]==null) {
  this.setState({
    loading:false
  })
  
} else {
  this.props.auto_sign_in(value[1][1]).then(()=>{
    if (!this.props.User.auth.token) {
      this.setState({
        loading:false
      })
    } else {
      setTokens(this.props.User.auth,()=>{
        this.goNext()
      })
    }
  })
  
}
});   
}
   render(){
  if(this.state.loading){
     return(
       <View style={styles.load}><ActivityIndicator/></View>
     );}
     else{
       return(
        <ScrollView style={styles.container}>
         
        <View style={{alignItems:"center",justifyContent:"center", flex:1}} >
       
       <AuthLogo/>
       </View>
       <View style={{alignItems:'center'}}>
       <AuthForm goNext={this.goNext}/>
        </View>
         </ScrollView>
       )
       
     }
   }
 }


 const styles = StyleSheet.create({
   load:{
     flex:1,
  justifyContent:"center",
  alignItems:'center'
   },
   container:{
     flex:1, 
     backgroundColor:"#1d428a",
     
   }
 });

 function mapStateToProps (state){
  console.warn(state);
  return{
    User: state.User
  }
}

function mapDispatchToProps (dispatch){
  return  bindActionCreators({auto_sign_in},dispatch);
  

}

export default connect(mapStateToProps,mapDispatchToProps)(AuthComponent)
