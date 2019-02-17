import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, Route, Redirect } from 'react-router-dom'
import { handleAnswerQuestion } from '../actions'
import QuestionPage from './QuestionPage'
import Flexbox from 'flexbox-react';

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

      <Flexbox style={divStyle}>
        <Flexbox style={titleContainerStyle}> <h1 style={titleStyle}> Question </h1> </Flexbox>
        <Flexbox style={questionStyle}>
          <Flexbox style={profpicStyle}> <img src={`${this.props.pictureURL}`} alt="icon"/> </Flexbox>
          <div> 
            <Flexbox style={statsContainerStyle}>
              <div style={wouldYouRatherStyle}> Would you rather... </div>
              <div style={optionStyle}> {thisQuestion.optionOne.text} </div>
              <div style={resultStyle}> {100*Math.round(optOneVotes/sumVotes)}% Voted for this ({optOneVotes}) </div>
              <div style={yourVoteStyle}> {this.props.question.optionOne.votes.includes(this.props.authedUser.id) ? 
                "You voted for this!" : null} </div>
              

              <div style={optionStyle}> {thisQuestion.optionTwo.text} </div>
              <div style={resultStyle}> {100*Math.round(optTwoVotes/sumVotes)}% Voted for this ({optTwoVotes}) </div>
              <div style={yourVoteStyle}> {this.props.question.optionTwo.votes.includes(this.props.authedUser.id) ? 
                "You voted for this!" : null} </div>
            </Flexbox>
          </div>
        </Flexbox>
      </Flexbox>
    )         
  }

  render() {
    const { question } = this.props;
    if (question == null) { return <div style={divStyle}><h2>404 error</h2> This Question doesn't exist</div> }
    
    const {
      optionOne, optionTwo, timestamp, id
    } = question;

    if (this.isQuestionPage()){
      if (this.isAuthed()) {
        if(!this.isAnswered()){
          //voting enabled
          return (
            <Flexbox style={divStyle}>
              <Flexbox style={titleContainerStyle}> <h1 style={titleStyle}> Question </h1> </Flexbox>
              <Flexbox style={questionStyle}>
                <Flexbox style={profpicStyle}> <img src={`${this.props.pictureURL}`} alt="icon"/> </Flexbox>
                <div> 
                  <div style={wouldYouRatherStyle}> Would you rather... </div>
                  <form onSubmit={this.handleSubmit} id="questionForm">
                    <input type="radio" name="option" value="optionOne" onClick={this.changeOption}/> {optionOne.text}<br/>
                    <input type="radio" name="option" value="optionTwo" onClick={this.changeOption}/> {optionTwo.text}<br/>
                    <input type="submit" id="submitButton" disabled={!this.state.optionSelected}/> 
                  </form>
                </div>
              </Flexbox>

              <Flexbox style={detailsStyle}> 
                <div> {`@${this.props.userName} |`} </div>
                <div> {timestamp} </div>
              </Flexbox>
            </Flexbox>
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
        <Flexbox style={questionsListStyle}>

          <Flexbox style={questionStyle}>
            <Flexbox style={profpicStyle}> <img src={`${this.props.pictureURL}`} alt="icon"/> </Flexbox>
            <div> 
              <Link to={`/question/${id}`} className='question' style={linkStyle}>
                <div style={wouldYouRatherStyle}> Would you rather... </div>
                <div style={optionStyle}> {optionOne.text} or</div>
                <div style={optionStyle}> {optionTwo.text} ?</div>
              </Link>
            </div>
          </Flexbox>

          <Flexbox style={detailsStyle}> 
            <div> {`@${this.props.userName} |`} </div>
            <div> {timestamp} </div>
          </Flexbox>

          <Route path={`/question/${id}`} render={() => (
            !this.isAuthed() ? 
              (<Redirect to ={{pathname: '/login', state: {redirectUrl: this.props.location.pathname}}}/>) 
              : <QuestionPage/>)}/>

        </Flexbox>
      )
    }
  }
}

function mapStateToProps (state, { id }) {
  const question = state.questions[id] 
  const users = state.users
  let pictureURL = ''
  let username = ''
  let userName = ''
  if(question){
    pictureURL = users[question.author].avatarURL
    username = users[question.author].id
    userName = users[question.author].name
  }
  let authedUser = state.authedUser
  return { authedUser:authedUser, question:question, pictureURL:pictureURL, userName:userName, username:username }
}

const statsContainerStyle = {
  flexDirection: 'column',
  marginLeft: 15,
}
const yourVoteStyle = {
  marginLeft: 10,
  fontWeight: 'bold',
  fontSize: 10,
  marginBottom: 10,
}
const resultStyle = {
  marginLeft: 10,
  fontWeight: 'bold',
  fontSize: 10,
}
const titleContainerStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 15,
}
const divStyle = {
  backgroundColor: 'white',
  alignItems: 'left',
  flexDirection: 'column',
  padding: 50,
  marginTop: 100,
  marginLeft: 150,
  marginRight: 150,
  height: 480,
  flex: 1,
  textAlign: 'left',
}
const titleStyle = {
  color: '#183059',
  fontSize: 38,
}
const questionsListStyle = {
  backgroundColor: 'white',
  alignItems: 'left',
  flexDirection: 'column',
  padding: 50,
  marginLeft: 150,
  marginRight: 150,
  flex: 1,
  textAlign: 'left',
}
const questionStyle = {
  flexDirection: 'row',
}
const detailsStyle = {
  flexDirection: 'row',
  fontSize: 13,
  color: '#5D5D5D',
  opacity: 80,
  marginTop: 15,
  fontFamily: 'Roboto',
  fontWeight: 'bold',
}
const profpicStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 10,
}
const wouldYouRatherStyle = {
  fontSize: 20,
  color: 'black',
  fontWeight: 'bold',
  fontFamily: 'Roboto',
}
const optionStyle = {
  fontSize: 15,
  fontWeight: 'bold',
  fontFamily: 'Roboto',
  color: '#5D5D5D',
}
const linkStyle = {
  color: 'blue',
  textDecoration: 'none',
}

export default withRouter(connect(mapStateToProps)(Question))