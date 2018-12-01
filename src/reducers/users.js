import {
  RECEIVE_USERS, SAVE_QUESTION, ANSWER_QUESTION
} from '../actions'

export default function users (state = [], action) {
	switch(action.type) {
      case RECEIVE_USERS :
        return action.users
      case SAVE_QUESTION:
      	let thisUser = action.authedUser
      	let formattedQuestion = action.formattedQuestion
      	return { 
      		...state, 
      		[thisUser]: {
      			...state[thisUser],
      			questions: state[thisUser].questions.concat(formattedQuestion.id)
      		}
      	}
      case ANSWER_QUESTION:
        let { qid, answer, authedUser } = action
        return {
          ...state,
          [authedUser] : {
            ...state[authedUser],
            answers: {
              ...state[authedUser].answers,
              [qid]:answer
            }
          }
        }
      default :
        return state
    }
}