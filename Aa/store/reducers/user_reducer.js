export default function (state={},action){
    switch(action.type)
    {
        case 'SIGN_IN':
            return {
                ...state,
                auth:{
                    uid:action.payload.localId || false,
                    token:action.payload.idToken || false,
                    refToken:action.payload.refreshToken || false
                    
                }
            }




        case 'SIGN_UP':
            return {
                ...state,
                auth:{
                    uid:action.payload.localId || false,
                    token:action.payload.idToken || false,
                    refToken:action.payload.refreshToken || false
                    
                }
            }



            case 'Auto_sign_in':
                return{
                    ...state,
                auth:{
                    uid:action.payload.user_id || false,
                    token:action.payload.id_token || false,
                    refToken:action.payload.refresh_token|| false
                }


    }

    default:
        return state
}
}