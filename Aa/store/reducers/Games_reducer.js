export default function (state={},action){
    switch(action.type){
   
    case 'Get_Games':
        return{
            ...state,
            games:action.payload
        }
        default: return state

    }

}