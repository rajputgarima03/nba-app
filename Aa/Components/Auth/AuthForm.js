import React,{Component} from 'react';
import {View,Text,StyleSheet,Image, Button} from 'react-native';
//import Input from '../../Util/Form/Input';
import Input from '../../util/Input'
import ValidationRules from '../../util/ValidationRules';
import {connect} from 'react-redux';
import {signup,signin} from '../../store/actions/User_action';
import {bindActionCreators} from 'redux'
 import {setTokens} from '../../util/misc'
  class AuthForm extends Component {
   state={
       type:'Login',
       action:'Login',
       actionMode:'I want to register',  
       hasErrors:false,
       form:{
           email:{
            value:'',
            valid:false,
            type:'textinput',
            rules:{
                isRequired:true,
                isEmail:true
            }
           },
           password:{ 
            value:'',
            valid:false,
            type:'textinput',
            rules:{
                isRequired:true,
                minLength:6,
                maxLength:10
            }

           },
           confirmPassword:{
            value:'',
            valid:false,
            type:'textinput',
            rules:{
                confirmPass:'password'

            }

           }

       }
   }



   manageAccess=()=>{
     if(!this.props.User.auth.uid){
       this.setState({hasErrors:true})

     }
     else{
 setTokens(this.props.User.auth,()=>{
  this.setState({hasErrors:false});
  this.props.goNext();
 })
     }

   }



   changeFormType=()=>{
     const type= this.state.type;
     this.setState({
       type: type==='Login'? 'Register' :'Login',
       action: type==='Login'? 'Register' :'Login',
       actionMode: type==='Login'? 'I want to Login' :'I want to Register',
     })
   }
   formHasErrors=()=>(
     this.state.hasErrors ?
     <View style={styles.errorView}>
       <Text style={styles.errorText}>Oops check your info!</Text>
     </View>
     :null
   )

   updateInput=(name,value)=>{
     this.setState({
       hasErrors:false
     })
     let formCopy= this.state.form;
     formCopy[name].value=value;

     let rules= formCopy[name].rules;
     let valid= ValidationRules(value,rules,formCopy);
     console.warn(valid);
     formCopy[name].valid=valid;
     this.setState({    
       form:formCopy
     })
     

   }

   confirmPassword=()=>(
   this.state.type != "Login" ?
   <Input 
   placeholder="Confirm your password"
   placeholderTextColor="#cecece"
   value={this.state.form.confirmPassword.value}
   type={this.state.form.confirmPassword.type }
   onChangeText={value=>{ this.updateInput("confirmPassword",value)}}
   secureTextEntry
    /> 
    : null

   )

   submitUser=()=>{
     let isFormValid= true;
     let formToSubmit ={};
     const formCopy = this.state.form;

     for(let key in formCopy){
        if(this.state.type==='Login'){
           if(key!= 'confirmPassword'){
             isFormValid = isFormValid && formCopy[key].valid;
             formToSubmit[key] = formCopy[key].value;
           }
        }
        else{
          isFormValid = isFormValid && formCopy[key].valid;
             formToSubmit[key] = formCopy[key].value;

        }
     } 

     if(isFormValid){
       if(this.state.type ==='Login'){
         this.props.signin(formToSubmit).then(()=>{
          this.manageAccess()
         });
       }
       else{
        this.props.signup(formToSubmit).then(()=>{
          this.manageAccess() 
         });;  
       }

     }
     else{
       this.setState({
         hasErrors: true
       })
     }
   }
    
   


   render(){
    
     return(
       <View  style={{width:"70%"}} >
    
    <Input 
    placeholder="Enter Email"
    placeholderTextColor="#cecece"
    value={this.state.form.email.value}
    type={this.state.form.email.type }
    onChangeText={value=>{ this.updateInput("email",value)}}
    keyboardType={"email-address"}
     /> 


    <Input 
    placeholder="Enter your password"
    placeholderTextColor="#cecece"
    value={this.state.form.password.value}
    type={this.state.form.password.type }
    onChangeText={value=>{ this.updateInput("password",value)}}
    secureTextEntry
     /> 

     {this.confirmPassword()}

     {this.formHasErrors()}

     <View style={{marginTop:20}}>
     <Button title={this.state.action} onPress={this.submitUser}/>
       </View>
       <View style={{marginTop:20}}>
     <Button title={this.state.actionMode} onPress={this.changeFormType}/>
       </View>
       <View style={{marginTop:20}}>
     <Button title="I'll do it later" onPress={this.props.goNext}/>
       </View>
     
     
       </View>
     )
   }
 }
 
 const styles = StyleSheet.create({
  errorView:{
    marginTop:10,
    marginBottom:30,
    padding:10,
    backgroundColor:"red"
  },

  errorText:{
textAlign:"center",
color:"#fff"
  }
 });

 function mapStateToProps (state){
  //  console.warn(state);
   return{
     User: state.User
   }
 }

 function mapDispatchToProps (dispatch){
   return  bindActionCreators({signin,signup},dispatch);
   

 }

 export default connect(mapStateToProps,mapDispatchToProps)(AuthForm);