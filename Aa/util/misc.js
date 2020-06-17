import{
    AsyncStorage
} from 'react-native'




export const FIREBASEURL = 'https://okproject4.firebaseio.com';
export const APIKEY='AIzaSyB-jN7CumcKS8dToBhguCF8mnacUYkpA-M';
export const SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`;
export const SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`;
export const REFRESH =`https://securetoken.googleapis.com/v1/token?key=${APIKEY}`;

export const getTokens=(cb)=>{
    AsyncStorage.multiGet([
    '@okproject4@token',
        '@okproject4@refreshToken',
        '@okproject4@expireToken',
        '@okproject4@uid'
        ]).then((value)=>{
              
            cb(value);
        });
}

export const setTokens=(values,cb)=>{
const dateNow = new Date();
const expiry = dateNow.getTime +(3600 * 1000);
AsyncStorage.multiSet([
['@okproject4@token',values.token],
['@okproject4@refreshToken',values.refToken],
['@okproject4@expireToken',expiry.toString()],
['@okproject4@uid',values.uid]
]).then(response=()=>{
    cb();
});
}




export const convertData=(data)=>{
    const newData  =[];
      for(let key in data){
          newData.push({
              ...data[key],
              id:key
          })
      }
      return newData;
}

export const findTeamData=(itemId,teams)=>{
    const value= teams.find((team)=>{
        return team.id === itemId
    })
return value;
}