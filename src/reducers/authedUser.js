import {
  GET_AUTHED_USER, SET_AUTHED_USER, 
} from '../actions'

export default function authedUser (state = [], action) {
	switch(action.type) {
      case GET_AUTHED_USER :
        return console.log('id: ', action.id)
      case SET_AUTHED_USER :
        return action.id
      default :
        return state
    }
}