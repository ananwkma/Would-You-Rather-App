import React, { Component } from 'react'
import Question from './Question'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class QuestionList extends Component {
  state = {
    showUnanswered: true
  }
  renderQuestions() {
      //if (this.state.showUnanswered)
      let thisUser = this.props.authedUser.id
      return <ul>
    	{ /*this.props.questionIds.filter((id) => (
          <li key={id}> <Question id={id}/> </li>  
        )) */}
        { this.props.questionIds.map((id) => (
          <li key={id}> <Question id={id}/> </li>
        )) }
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
  let authedUser = state.authedUser
  let questions = state.questions
  let questionIds = Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  return {authedUser:authedUser, questionIds:questionIds}
}

export default withRouter(connect(mapStateToProps)(QuestionList))