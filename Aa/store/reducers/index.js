import {combineReducers} from 'redux'
import User from './user_reducer' 
import News from './News_reducer'
import Games from './Games_reducer'
const rootReducer = combineReducers({
User,
News,
Games
});

export default rootReducer;