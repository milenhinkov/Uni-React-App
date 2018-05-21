import {REGISTER_USER, LOGOUT_USER} from './ActionTypes'

function createUser(user){
  localStorage.setItem('currentUser', JSON.stringify(user));
  return{
    type: REGISTER_USER,
    user
  }
}

function logoutUser(user){
  localStorage.removeItem('currentUser');
  return{
    type: LOGOUT_USER,
    user
  }
}

export { createUser }