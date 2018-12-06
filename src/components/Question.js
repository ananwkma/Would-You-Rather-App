import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, Route, Redirect } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions'
import QuestionPage from './QuestionPage'

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
        {this.props.question.optionOne.votes.includes(this.props.authedUser.id) ? 
          "You voted for this!" : null}
        <div> {thisQuestion.optionOne.text} </div>
        <div> Percentage of Votes: {100*optOneVotes/sumVotes} % </div> <br/>
        <div> Number of Votes for option Two: {optTwoVotes} </div>
        {this.props.question.optionTwo.votes.includes(this.props.authedUser.id) ? 
          "You voted for this!" : null}
        <div> {thisQuestion.optionTwo.text} </div>
        <div> Percentage of Votes: {100*optTwoVotes/sumVotes} % </div>
      </div>
    )         
  }

  render() {
    const { question } = this.props;
    if (question == null) { return <div><h2>404 error</h2> This Question doesn't exist</div> }
    
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
              <div> <img src={`${this.props.pictureURL}`} alt="icon"/> </div>
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
        return (<Route path={`/question/${id}`} render={() => (
          !this.isAuthed() ? 
            (<Redirect to ={{pathname: '/login', state: {redirectUrl: this.props.location.pathname}}}/>) 
            : <QuestionPage/>)}/>
        )
      }
    }

    else {
      //list question details
      return (
        <div>
          <Link to={`/question/${id}`} className='question'>
            <div> optionOne: {optionOne.text} </div>
            <div> optionTwo: {optionTwo.text} </div>
            <div> timestamp: {timestamp} </div>
            <div> <img src={`${this.props.pictureURL}`} alt="icon"/> </div>
            <div> id: {id} </div>
          </Link>
          <Route path={`/question/${id}`} render={() => (
            !this.isAuthed() ? 
              (<Redirect to ={{pathname: '/login', state: {redirectUrl: this.props.location.pathname}}}/>) 
              : <QuestionPage/>)}/>
        </div>
      )
    }
  }
}

function mapStateToProps (state, { id }) {
  const question = state.questions[id] 
  const users = state.users
  let pictureURL = ''
  if(question){
    pictureURL = users[question.author].avatarURL
  }
  let authedUser = state.authedUser
  return { authedUser:authedUser, question:question, pictureURL:pictureURL }
}

export default withRouter(connect(mapStateToProps)(Question))