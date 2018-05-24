import {
  REGISTER_USER, LOGOUT_USER, LOGIN_USER, LOAD_USERS, MAKE_USERS_ADMIN, DELETE_USERS, LOAD_TASKS,
  INITIALIZE_TASK_FOR_EDITING, DESTROY_TASK_FOR_EDITING, APPLY_TASK_CHANGES, DELETE_TASK,
  OPEN_NEW_TASK_DIALOG, CLOSE_NEW_TASK_DIALOG, IS_USER_LOGGED_IN, ADD_NEW_TASK
} from './ActionTypes'

function registerUserReducer(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return Object.assign({}, action.user);
    case LOGOUT_USER:
      return Object.assign({}, action.user);
    case LOGIN_USER:
      return Object.assign({}, action.user);
    case IS_USER_LOGGED_IN:
      return Object.assign({}, action.user);
    default:
      return state;
  }
}

function adminReducer(state = [], action) {
  switch (action.type) {
    case LOAD_USERS:
      return JSON.parse(JSON.stringify(action.users));
    case MAKE_USERS_ADMIN:
      return JSON.parse(JSON.stringify(action.users));
    case DELETE_USERS:
      return JSON.parse(JSON.stringify(action.users));
    default:
      return state;
  }
}

function tasksReducer(state = [], action) {
  switch (action.type) {
    case LOAD_TASKS:
      return JSON.parse(JSON.stringify(action.tasks));
    case APPLY_TASK_CHANGES:
      return JSON.parse(JSON.stringify(action.tasks));
    case DELETE_TASK:
      return JSON.parse(JSON.stringify(action.tasks));
    case ADD_NEW_TASK:
      return JSON.parse(JSON.stringify(action.tasks));
    default:
      return state;
  }
}

function taskReducer(state = {}, action) {
  switch (action.type) {
    case INITIALIZE_TASK_FOR_EDITING:
      return Object.assign({}, action.taskForEditing);
    case DESTROY_TASK_FOR_EDITING:
      return Object.assign({}, action.taskForEditing);
    default:
      return state;
  }
}

function manageNewTaskDialog(state = false, action) {
  switch (action.type) {
    case OPEN_NEW_TASK_DIALOG:
      return JSON.parse(JSON.stringify(action.state));
    case CLOSE_NEW_TASK_DIALOG:
      return JSON.parse(JSON.stringify(action.state));
    default:
      return state;
  }
}

export { adminReducer, registerUserReducer, tasksReducer, taskReducer, manageNewTaskDialog }
