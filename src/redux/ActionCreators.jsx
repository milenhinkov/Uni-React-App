import {REGISTER_USER, LOGOUT_USER, LOGIN_USER} from './ActionTypes'

function createUser(user){
  localStorage.setItem('currentUser', JSON.stringify(user));
  let users = JSON.parse(localStorage.getItem('users'));
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  return{
    type: REGISTER_USER,
    user
  }
}

function logoutUser(){
  localStorage.removeItem('currentUser');
  return{
    type: LOGOUT_USER,
    user: {}
  }
}

function loginUser(user){
  localStorage.setItem('currentUser', JSON.stringify(user));
  let userResult = {};
  let users = JSON.parse(localStorage.getItem('users'));
  users.forEach(storedUser => {
    if(user.username === storedUser.username && user.password === storedUser.password){
      userResult = storedUser;
    }
  });
  return{
    type: LOGIN_USER,
    user: userResult
  }
}

export { createUser, logoutUser, loginUser }