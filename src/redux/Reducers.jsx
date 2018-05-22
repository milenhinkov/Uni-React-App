import { REGISTER_USER, LOGOUT_USER, LOGIN_USER, LOAD_USERS, MAKE_USERS_ADMIN } from './ActionTypes'

function registerUserReducer(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return Object.assign({}, action.user);
    case LOGOUT_USER:
      return Object.assign({}, action.user);
    case LOGIN_USER:
      return Object.assign({}, action.user);
    default:
      return state;
  }
}

function adminReducer(state = [], action) {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    case MAKE_USERS_ADMIN:
      return action.users;
    default:
      return state;
  }
}

export { adminReducer,  registerUserReducer }
