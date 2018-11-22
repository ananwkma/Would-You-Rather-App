import { _getQuestions, _getUsers, _saveQuestion } from '../_DATA'
import { receiveUsers, receiveQuestions, handleSetAuthedUser, SAVE_QUESTION, AUTHED_ID } from './index'

export function saveQuestion(formattedQuestion, users, authedUser) {
	return {
    	type: SAVE_QUESTION,
        formattedQuestion,
      	users,
        authedUser
    }
}

export function handleSaveQuestion(question, users, authedUser) {
  return (dispatch) => {
  	_saveQuestion(question) //{ optionOneText, optionTwoText, author }
      .then( (formattedQuestion) => {
    	dispatch(saveQuestion(formattedQuestion, users, authedUser))
      });
  };
}

export function handleInitialData () {
  return (dispatch) => {
    //dispatch(showLoading())
    return Promise.all([_getUsers(), _getQuestions()])
      .then(([users, questions]) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(handleSetAuthedUser(AUTHED_ID))
        //dispatch(hideLoading())
      })
  }
}