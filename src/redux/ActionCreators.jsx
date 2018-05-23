import { REGISTER_USER, LOGOUT_USER, LOGIN_USER, LOAD_USERS, MAKE_USERS_ADMIN, DELETE_USERS, LOAD_TASKS } from './ActionTypes'

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

function deleteUsers(arrayOfUsernames) {
  let storedUsers = JSON.parse(localStorage.getItem('users'));
  let resutlIndexes = [];
  let userIndex = 0;
  let removedUsersUsernames = [];
  for(let user of storedUsers){
    for(let _username of arrayOfUsernames){
      if(user.username === _username){
        resutlIndexes.unshift(userIndex);
        removedUsersUsernames.push(_username);
      }
    }
    userIndex++;
  }
  for(let i = 0; i < resutlIndexes.length; i++){
    storedUsers.splice(resutlIndexes[i], 1);
  }
  localStorage.setItem('users',JSON.stringify(storedUsers));
  let tasksArray = JSON.parse(localStorage.getItem('tasks'));
  let tasksIndexes = [];
  let taskIndex = 0;
  for(let task of tasksArray){
    for(let username of removedUsersUsernames){
      if(task.owner === username){
        tasksIndexes.unshift(taskIndex);
      }
    }
    taskIndex++;
  }
  for(let i = 0; i < tasksIndexes.length; i++){
    tasksArray.splice(tasksIndexes[i], 1);
  }
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
  return {
    type: DELETE_USERS,
    users: storedUsers
  }
}

function loadTasks(){
  let storedTasks = JSON.parse(localStorage.getItem('tasks'));
  return {
    type: LOAD_TASKS,
    tasks: storedTasks
  }
}


export { createUser, logoutUser, loginUser, loadUsers, makeUsersAdmins, deleteUsers, loadTasks }