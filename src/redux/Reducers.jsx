import { REGISTER_USER, LOGOUT_USER, LOGIN_USER } from './ActionTypes'

function registerUserReducer(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return action.user;
    case LOGOUT_USER:
      return action.user;
    case LOGIN_USER:
      return action.user;
    default:
      return state;
  }
}
export {/* anotherReducers, */ registerUserReducer }
