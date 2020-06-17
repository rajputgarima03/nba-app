export default function (state={},action){
    switch(action.type){
   
    case 'Get_News':
        return{
            ...state,
            articles:action.payload
        }
        default: return state

    }

}