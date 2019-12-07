import authReducer from './authReducer'
import ideaReducer from './ideaReducer'
import { combineReducers } from 'redux'
import comepetitionReducer from './competitionReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    idea: ideaReducer,
    competition: comepetitionReducer
})

export default rootReducer