export const GET_AUTHED_USER = 'GET_AUTHED_USER'
export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const GET_USERS = 'GET_USERS'

function setAuthedUser (id) {
  return {
	type: SET_AUTHED_USER,
    id,
  }
}

function answerQuestion (authedUser, qid, answer) {
  return {
  type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

export function receiveUsers (users) {
  return {
  	type: RECEIVE_USERS, 
    users,
  }
}

export function handleSetAuthedUser (id) {
  return (dispatch) => {
    dispatch(setAuthedUser(id))
  }
}

export function handleAnswerQuestion (authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(answerQuestion(authedUser, qid, answer))
  }
}