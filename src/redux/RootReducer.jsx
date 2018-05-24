import { combineReducers } from 'redux'
import * as reducers from './Reducers'

const rootReducer = combineReducers({
    users: reducers.adminReducer,
    currentUser: reducers.registerUserReducer,
    tasks: reducers.tasksReducer,
    taskForEditing: reducers.taskReducer,
    newTaskDialog: reducers.manageNewTaskDialog,
});

export default rootReducer;