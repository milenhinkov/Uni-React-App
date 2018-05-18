import * as actionTypes from './ActionTypes'

 function registerUserReducer(state = {}, action){
  switch (action.type) {
    case actionTypes.CREATE_USER:
      return  action.user;
    default:
      return state;
  }
}
export {/* anotherReducers, */ registerUserReducer}
