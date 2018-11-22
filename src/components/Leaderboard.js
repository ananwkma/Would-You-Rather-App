import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Leaderboard extends Component {
    getQuestionsCreated = (user) => {
      return user.questions.length
    }
    getQuestionsAnswered = (user) => {
      return Object.keys(user.answers).length
    }
	getScore = (user) => {
      return this.getQuestionsCreated(user) + this.getQuestionsAnswered(user)
    }
  	renderUsers = (user) => {
      let questionsCreated = this.getQuestionsCreated(user)
      let questionsAnswered = this.getQuestionsAnswered(user)
      let score = this.getScore(user)
      return <div>
        <li> User: {user.name} <br/>
          Number of Questions Created: {questionsCreated} <br/>
          Number of Questions Answered: {questionsAnswered} <br/>
      	  Score: {score}
        </li>
      </div>
    }
    renderLeaderboard() {
	let users = this.props.users || []
	users = users.sort((user1, user2) => {
      let user1score = this.getScore(user1)
      let user2score = this.getScore(user2)
   	  return user2score - user1score })
    return <ul> 
      {users.map(user => this.renderUsers(user))}
    </ul>;
  }
  
  render() {
    return (
      <div> 
       { this.props.userIds ? this.renderLeaderboard() : null }
	  </div>
    )
  }
}

function mapStateToProps (state, propsPassedIn) {
  let users = state.users
  let userIds = Object.keys(users)
  return {users:Object.values(users), userIds:userIds}
}

export default withRouter(connect(mapStateToProps)(Leaderboard))