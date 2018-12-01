import { SAVE_QUESTION, ANSWER_QUESTION, RECEIVE_QUESTIONS } from '../actions'
import { /*formatQuestion*/ } from '../utils/helper';

export default function questions (state={}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS:
      return action.questions;
    case SAVE_QUESTION:
      let formattedQuestion = action.formattedQuestion
      return {...state,       
       [formattedQuestion.id]: formattedQuestion,
      };
    case ANSWER_QUESTION:
      let qid = action.qid
      let answer = action.answer
      let authedUser = action.authedUser
      return { ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
          	votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      }
    default :
      return state
  }
}