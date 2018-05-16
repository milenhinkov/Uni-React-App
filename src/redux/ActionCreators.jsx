import * as actionTypes from './ActionTypes'

export default function createCourse(course) {
  return {
    type: actionTypes.CREATE_COURSE,
    course
  }
}