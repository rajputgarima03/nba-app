import {Get_Games} from '../types';
import {FIREBASEURL,convertData ,findTeamData} from '../../util/misc'
import axios from 'axios';


export  function get_games(){
const promise = new Promise((resolve,reject)=>{
    const request= axios({
        method:'GET',
        url:`${FIREBASEURL}/teams.json`
    }).then(response=>{
   const teams= convertData(response.data);
   
   axios({
    method:'GET',
    url:`${FIREBASEURL}/games.json`
   }).then(
    response=>{
        const articles= convertData(response.data);
        const responseData=[];
        for(let key in articles){
            responseData.push({
                ...articles[key],
                awayData:findTeamData(articles[key].away ,teams),
                localData:findTeamData(articles[key].local ,teams)
            })
        }
          resolve(responseData) 
   })
}).catch(e=>{
    reject(false)
})

    
})



    return{
        type:"Get_Games",
        payload:promise
    }
}