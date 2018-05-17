import * as actionTypes from './ActionTypes'

function courseReducer(state = [], action){
  switch (action.type) {
    case actionTypes.CREATE_COURSE:
      return [...state, Object.assign({}, action.course)];
    default:
      return state;
  }
}

 function registerUserReducer(state = [], action){
   debugger;
  switch (action.type) {
    case actionTypes.CREATE_USER:
      return [...state, Object.assign({}, action.user)];
    default:
      return state;
  }
}
export {courseReducer, registerUserReducer}
