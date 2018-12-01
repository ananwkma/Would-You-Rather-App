import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions'

class Question extends Component {

  state = {
    optionSelected: null
  }

  isAuthed () { return (this.props.authedUser.id === '' || 
                        this.props.authedUser.length === 0 
                        ? false : true) }
  
  isQuestionPage() { return (this.props.location.pathname.includes('/question') ? true : false) }

  isAnswered() { return (
    (this.props.question.optionOne.votes.includes(this.props.authedUser.id) ||
    this.props.question.optionTwo.votes.includes(this.props.authedUser.id)) ? true : false
    )}
  
  handleSubmit = (e) => {
    e.preventDefault()
    let authed = this.props.authedUser.id
    let qid = this.props.question.id
    let answer = this.state.optionSelected
    this.props.dispatch(handleAnswerQuestion(
      authed, qid, answer
    ))
  }

  changeOption = (e) => {
    this.setState({optionSelected: e.target.value})
  }

  showStats () {
    let thisQuestion = this.props.question
    let optOneVotes = thisQuestion.optionOne.votes.length
    let optTwoVotes = thisQuestion.optionTwo.votes.length
    let sumVotes = optOneVotes + optTwoVotes
    return(
      <div>
        <div> Number of Votes for option One: {optOneVotes} </div>
        <div> {thisQuestion.optionOne.text} </div>
        <div> Percentage of Votes: {100*optOneVotes/sumVotes} % </div>
        <div> Number of Votes for option Two: {optTwoVotes} </div>
        <div> {thisQuestion.optionTwo.text} </div>
        <div> Percentage of Votes: {100*optTwoVotes/sumVotes} % </div>
      </div>
    )         
  }

  render() {
    const { question } = this.props;
    if (question == null) { return <p>This Question doesn't exist</p> }
    
    const {
      optionOne, optionTwo, timestamp, id
    } = question;

    if (this.isQuestionPage()){
      if (this.isAuthed()) {
        if(!this.isAnswered()){
          //voting enabled
          return (
            <form onSubmit={this.handleSubmit} id="questionForm">
              <input type="radio" name="option" value="optionOne" onClick={this.changeOption}/> {optionOne.text}<br/>
              <input type="radio" name="option" value="optionTwo" onClick={this.changeOption}/> {optionTwo.text}<br/>
              <div> timestamp: {timestamp} </div>
              <div> id: {id} </div>
              <input type="submit" id="submitButton" disabled={!this.state.optionSelected}/> 
            </form>
          )
        }
        else if(this.isAnswered()){
          //show results
          return (
            this.showStats()
          )
        }
      }
      else if (!this.isAuthed()) {
        //show poll, no functionality
        return (
          <div>
              <div> Please log in to vote! </div> <br/>
              <div> optionOne: {optionOne.text} </div>
              <div> optionTwo: {optionTwo.text} </div>
              <div> timestamp: {timestamp} </div>
              <div> id: {id} </div>
          </div>
        )
      }
    }

    else {
      //list question details
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
  const question = state.questions[id] 
  let authedUser = state.authedUser
  return { authedUser:authedUser, question: question}
}

export default withRouter(connect(mapStateToProps)(Question))