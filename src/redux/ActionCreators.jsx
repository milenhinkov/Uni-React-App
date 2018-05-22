import { REGISTER_USER, LOGOUT_USER, LOGIN_USER, LOAD_USERS, MAKE_USERS_ADMIN } from './ActionTypes'

function createUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
  let users = JSON.parse(localStorage.getItem('users'));
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  return {
    type: REGISTER_USER,
    user
  }
}

function logoutUser() {
  localStorage.removeItem('currentUser');
  return {
    type: LOGOUT_USER,
    user: {}
  }
}

function loginUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
  let userResult = {};
  let users = JSON.parse(localStorage.getItem('users'));
  users.forEach(storedUser => {
    if (user.username === storedUser.username && user.password === storedUser.password) {
      userResult = storedUser;
    }
  });
  return {
    type: LOGIN_USER,
    user: userResult
  }
}

function loadUsers() {
  let storedUsers = JSON.parse(localStorage.getItem('users'));
  return {
    type: LOAD_USERS,
    users: storedUsers
  }
}

function makeUsersAdmins(arrayOfUsernames) {
  let storedUsers = JSON.parse(localStorage.getItem('users'));
  for(let user of storedUsers){
    for(let _username of arrayOfUsernames){
      if(user.username === _username){
        user.role = 'admin';
      }
    }
  }
  localStorage.setItem('users',JSON.stringify(storedUsers));
  return {
    type: MAKE_USERS_ADMIN,
    users: storedUsers
  }
}

export { createUser, logoutUser, loginUser, loadUsers, makeUsersAdmins }