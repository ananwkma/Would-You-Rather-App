import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {
  isAuthed () { return (this.props.authedUser === 'AUTHED_ID' ? false : true) }
  
  isQuestionPage() { return (this.props.location.pathname.includes('/question') ? true : false) }
  
  saveVote() {

  }

  render() {
    const { question } = this.props;
    if (question == null) { return <p>This Question doesn't exist</p> }
    
    const {
      optionOne, optionTwo, timestamp, id
    } = question;
    
    if (this.isAuthed() && this.isQuestionPage()) {
      return (
        <form>
          <input type="radio" name="option" value="optionOne"/> {optionOne.text}<br/>
          <input type="radio" name="option" value="optionTwo"/> {optionTwo.text}<br/>
          <div> timestamp: {timestamp} </div>
          <div> id: {id} </div>
          <input type="button" id="submitButton" onClick={this.saveVote} value="Submit"/> 
        </form>
      )
    }
    else if (!this.isAuthed() && this.isQuestionPage()) {
      return (
        <div>
            <div> optionOne: {optionOne.text} </div>
            <div> optionTwo: {optionTwo.text} </div>
            <div> timestamp: {timestamp} </div>
            <div> id: {id} </div>
        </div>
      )
    }
    else {
      return (
        <Link to={`/question/${id}`} className='question'>
          <div> optionOne: {optionOne.text} </div>
          <div> optionTwo: {optionTwo.text} </div>
          <div> timestamp: {timestamp} </div>
          <div> id: {id} </div>
        </Link>
      )
    }
  }
}

function mapStateToProps (state, { id }) {
  //console.log('state:', state, 'id:', id, 'actualQuestion:', state.questions[id]);
  const question = state.questions[id] 
  let authedUser = state.authedUser
  return { authedUser:authedUser, question: question}
}

export default withRouter(connect(mapStateToProps)(Question))