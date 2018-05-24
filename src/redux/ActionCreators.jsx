import {
  REGISTER_USER, LOGOUT_USER, LOGIN_USER, LOAD_USERS, MAKE_USERS_ADMIN, DELETE_USERS, LOAD_TASKS,
  INITIALIZE_TASK_FOR_EDITING, DESTROY_TASK_FOR_EDITING, APPLY_TASK_CHANGES, DELETE_TASK,
  OPEN_NEW_TASK_DIALOG, CLOSE_NEW_TASK_DIALOG, IS_USER_LOGGED_IN, ADD_NEW_TASK
} from './ActionTypes'

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
  localStorage.setItem('currentUser', JSON.stringify({}))
  return {
    type: LOGOUT_USER,
    user: {}
  }
}

function loginUser(user) {
  let userResult = {};
  let users = JSON.parse(localStorage.getItem('users'));
  users.forEach(storedUser => {
    if (user.username === storedUser.username && user.password === storedUser.password) {
      userResult = storedUser;
    }
  });
  localStorage.setItem('currentUser', JSON.stringify(userResult));
  return {
    type: LOGIN_USER,
    user: userResult
  }
}

function isUserLoggedIn() {
  let storedUser = JSON.parse(localStorage.getItem('currentUser'));
  return {
    type: IS_USER_LOGGED_IN,
    user: storedUser
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
  for (let user of storedUsers) {
    for (let _username of arrayOfUsernames) {
      if (user.username === _username) {
        user.role = 'admin';
      }
    }
  }
  localStorage.setItem('users', JSON.stringify(storedUsers));
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
  for (let user of storedUsers) {
    for (let _username of arrayOfUsernames) {
      if (user.username === _username) {
        resutlIndexes.unshift(userIndex);
        removedUsersUsernames.push(_username);
      }
    }
    userIndex++;
  }
  for (let i = 0; i < resutlIndexes.length; i++) {
    storedUsers.splice(resutlIndexes[i], 1);
  }
  localStorage.setItem('users', JSON.stringify(storedUsers));
  let tasksArray = JSON.parse(localStorage.getItem('tasks'));
  let tasksIndexes = [];
  let taskIndex = 0;
  for (let task of tasksArray) {
    for (let username of removedUsersUsernames) {
      if (task.owner === username) {
        tasksIndexes.unshift(taskIndex);
      }
    }
    taskIndex++;
  }
  for (let i = 0; i < tasksIndexes.length; i++) {
    tasksArray.splice(tasksIndexes[i], 1);
  }
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
  return {
    type: DELETE_USERS,
    users: storedUsers
  }
}

function loadTasks() {
  let storedTasks = JSON.parse(localStorage.getItem('tasks'));
  return {
    type: LOAD_TASKS,
    tasks: storedTasks
  }
}

function initializeTaskForEditing(task) {
  return {
    type: INITIALIZE_TASK_FOR_EDITING,
    taskForEditing: task
  }
}

function destroyTaskForEditing() {
  return {
    type: DESTROY_TASK_FOR_EDITING,
    taskForEditing: {}
  }
}

function applyTaskChanges(oldTask, modifiedTask) {
  let storedTasks = JSON.parse(localStorage.getItem('tasks'));
  let taskIndex = 0;
  for (let task of storedTasks) {
    if (task.owner === oldTask.owner && task.taskTitle === oldTask.taskTitle) {
      break;
    }
    taskIndex++;
  }
  storedTasks[taskIndex] = modifiedTask;
  localStorage.setItem('tasks', JSON.stringify(storedTasks));
  return {
    type: APPLY_TASK_CHANGES,
    tasks: storedTasks
  }
}

function deleteTask(task) {
  let storedTasks = JSON.parse(localStorage.getItem('tasks'));
  let taskIndex = 0;
  for (let _task of storedTasks) {
    if (_task.owner === task.owner && _task.taskTitle === task.taskTitle) {
      break;
    }
    taskIndex++;
  }
  storedTasks.splice(taskIndex, 1);
  localStorage.setItem('tasks', JSON.stringify(storedTasks));
  return {
    type: DELETE_TASK,
    tasks: storedTasks
  }
}

function addNewTask(task) {
  let storedTasks = JSON.parse(localStorage.getItem('tasks'));
  storedTasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(storedTasks))
  return {
    type: ADD_NEW_TASK,
    tasks: storedTasks
  }
}

function openNewTaskDialog() {
  return {
    type: OPEN_NEW_TASK_DIALOG,
    state: true
  }
}

function closeNewTaskDialog() {
  return {
    type: CLOSE_NEW_TASK_DIALOG,
    state: false
  }
}

export {
  createUser, logoutUser, loginUser, loadUsers, makeUsersAdmins, deleteUsers,
  loadTasks, initializeTaskForEditing, destroyTaskForEditing, applyTaskChanges,
  deleteTask, openNewTaskDialog, closeNewTaskDialog, isUserLoggedIn, addNewTask
}
