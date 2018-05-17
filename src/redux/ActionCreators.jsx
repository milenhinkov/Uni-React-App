import * as actionTypes from './ActionTypes'

function createCourse(course) {
  return {
    type: actionTypes.CREATE_COURSE,
    course
  }
}

function createUser(user){
  return{
    type: actionTypes.CREATE_USER,
    user
  }
}

export {createCourse, createUser }