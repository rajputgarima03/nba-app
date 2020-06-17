import{
    SIGN_IN,SIGN_UP,
    Auto_sign_in
} from '../types'   
import {FIREBASEURL,SIGNUP,SIGNIN,REFRESH  } from '../../util/misc'
import axios from 'axios';

export function signup (data){
    const request = axios({
      method:'post',
      url:SIGNUP,
      data:{
    email:data.email,
    password:data.password,
    returnSecureToken:true
      },
      header:{  
          "Content-Type":"application/json"
      }  
    }).then(response=>{  
          
        
        

        return response.data
    }).catch(e =>{
        if(e.response.data.error.code==400){
            alert(e.response.data.error.message)
        }
         return false
        });
    
    return{
        type:"SIGN_UP",
        payload:request
    }
} 






export function signin (data){   
    const request = axios({
        method:'post',
        url:SIGNIN,
        data:{
      email:data.email,
      password:data.password,
      returnSecureToken:true
        },
        header:{  
            "Content-Type":"application/json"
        }  
      }).then(response=>{  
     return response.data
      }).catch(e =>{
          if(e.response.data.error.code==400){
              alert(e.response.data.error.message)
          }
           return false
          });
    return{
        type:"SIGN_IN",
        payload:request
        
    }
}



export function auto_sign_in(refToken){
const request=axios({
    method:'post',
    url:REFRESH,
    data:"grant_type=refresh_token&refresh_token="+refToken,
    header:{
      "Content-Type"  :"application/x-www-form-urlencode"
    }
}).then(response=>{
return response.data
}).catch(e =>{
    
    
     return false
    });

return{
    type:"Auto_sign_in",
    payload:request
}
}