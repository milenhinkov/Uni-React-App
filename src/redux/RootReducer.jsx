import { combineReducers } from 'redux'
import * as reducers from './Reducers'

const rootReducer = combineReducers({
    /* courses: reducers.courseReducer, */
    users: reducers.registerUserReducer
});

export default rootReducer;