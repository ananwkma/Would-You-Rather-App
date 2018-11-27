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

/*function saveQuestion ({optionOneText, optionTwoText, author, id}) {
  return {
	type: SAVE_QUESTION,
    optionOneText,
    optionTwoText,
    author,
    id
  }
}*/

/*function answerQuestion (authedUser, qid, answer) {
  return {
	type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer,
  }
}*/

export function handleSetAuthedUser (id) {
  return (dispatch) => {
    dispatch(setAuthedUser(id))
  }
}

/*export function handleGetUsers () {
	return (dispatch) => {
    	return _getUsers()
          .then((users) => {
          		const userArr = []
          		for (var user in users) userArr.push(user)
              	dispatch(getUsers(userArr))
          })
    }
}*/