import {
  RECEIVE_USERS, SAVE_QUESTION
} from '../actions'

export default function users (state = [], action) {
	switch(action.type) {
      case RECEIVE_USERS :
        return action.users
      case SAVE_QUESTION:
      	let authedUser = action.authedUser
      	let users = action.users
      	let formattedQuestion = action.formattedQuestion
      	return { 
      		...state, 
      		[authedUser]: {
      			...state[authedUser],
      			questions: state[authedUser].questions.concat(formattedQuestion.id)
      		}
      	}
      default :
        return state
    }
}