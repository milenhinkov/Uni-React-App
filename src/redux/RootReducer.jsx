import { combineReducers } from 'redux'
import * as reducers from './Reducers'

const rootReducer = combineReducers({
    /* courses: reducers.courseReducer, */
    currentUser: reducers.registerUserReducer
});

export default rootReducer;