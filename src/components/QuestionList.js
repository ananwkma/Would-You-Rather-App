import React, { Component } from 'react'
import Question from './Question'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class QuestionList extends Component {
  state = {
    showUnanswered: true
  }
  renderQuestions() {
      let thisUser = this.props.authedUser
      let unanswered = this.state.showUnanswered
      let questionIds = this.props.questionIds
      if (thisUser) {
        let answeredQuestions = Object.keys(thisUser.answers)
         //unanswered questions
        if (unanswered) {
          return <ul>
            {questionIds
              .filter(id => !answeredQuestions.includes(id))
              .map(aId => (<li key={aId}> <Question id={aId}/> </li>))
            }
          </ul>
        }
        //answered questions
        else if (!unanswered) {
          return <ul>
            {questionIds
              .map(id => (answeredQuestions
              .map(aId => ((aId === id) ?  <li key={aId}> <Question id={aId}/> </li> : null))
            ))}
          </ul>
        } 
      }
      else return <ul>
        {questionIds
          .map(id => <li key={id}> <Question id={id}/> </li>)}
      </ul>
       
  }
  
  render() {
    return (
      <div>
        <button onClick={() => this.setState({showUnanswered: true})}> Unanswered Questions </button>
        <button onClick={() => this.setState({showUnanswered: false})}> Answered Questions </button>
        { this.props.questionIds ? this.renderQuestions() : null }
	  </div>
    )
  }
}

function mapStateToProps(state) {
  let authedUser = state.users[state.authedUser.id]
  let questions = state.questions
  let questionIds = Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  return {authedUser:authedUser, questionIds:questionIds}
}

export default withRouter(connect(mapStateToProps)(QuestionList))