import AuthReducer from './authReducer'
import {firestoreReducer} from 'redux-firestore'
import {firebasereducer} from 'react-redux-firebase'



const rootReducer = combineReducers({
    auth: AuthReducer,
    firestore: firestoreReducer,
    firebase: firebasereducer
});

export default rootReducer