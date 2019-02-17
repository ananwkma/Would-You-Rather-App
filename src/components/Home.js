import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import QuestionList from './QuestionList'

class Home extends Component {
  render() {
    return (
        <QuestionList/>
    )
  }
}

function mapStateToProps(state) {
  let questions = state.questions
  let questionIds = Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  return {questionIds:questionIds}
}

export default withRouter(connect(mapStateToProps)(Home))