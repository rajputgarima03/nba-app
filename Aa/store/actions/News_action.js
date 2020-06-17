import {Get_News } from '../types';
import {FIREBASEURL } from '../../util/misc'
import axios from 'axios';


export  function get_news(){

    const request =axios({
    method:'GET',
    url:`${FIREBASEURL}/news.json`
    }).then(response=>{
      const  articles =[];
      for(let key in response.data){
          articles.push({
              ...response.data[key],
              id:key
          })
      }
      return response
    }).catch(e=>{
        return false
    })


    return{
        type:"Get_News",
        payload:request
    }
}

