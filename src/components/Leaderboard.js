import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Flexbox from 'flexbox-react';

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
	renderUsers = (user, place) => {
    let questionsCreated = this.getQuestionsCreated(user)
    let questionsAnswered = this.getQuestionsAnswered(user)
    let score = this.getScore(user)
    return <div key={user.id}>

      <Flexbox style={questionStyle}>
        <h2 style={placementStyle}> {`${place}`} </h2>
        <Flexbox style={profpicStyle}> <img src={`${user.avatarURL}`} alt="icon"/> </Flexbox>
        <Flexbox style={detailsStyle}> 
          <div style={userStyle}> {`@${user.id} |`} </div>
          <Flexbox style={scoreContainerStyle}> Number of Questions Created: {questionsCreated} </Flexbox>
          <Flexbox style={scoreContainerStyle}> Number of Questions Answered:{questionsAnswered} </Flexbox> 
          <Flexbox style={scoreContainerStyle}> Score: {score} </Flexbox>
        </Flexbox>
      </Flexbox>

    </div>
  }
  renderLeaderboard() {
	  let users = this.props.users || []
	  users = users.sort((user1, user2) => {
      let user1score = this.getScore(user1)
      let user2score = this.getScore(user2)
   	  return user2score - user1score })
    let place = 1
    return <ul> 
      <h1 style={titleStyle}> Leaderboards </h1>
      {users.map(user => this.renderUsers(user, place++))}
    </ul>;
  }
  
  render() {
    return (
      <Flexbox style={divStyle}>
       { this.props.userIds ? this.renderLeaderboard() : null }
	  </Flexbox>
    )
  }
}

function mapStateToProps (state, propsPassedIn) {
  let users = state.users
  let userIds = Object.keys(users)
  return {users:Object.values(users), userIds:userIds}
}

const titleStyle = {
  color: '#183059',
  fontSize: 38,
  textAlign: 'center'
}
const divStyle = {
  backgroundColor: 'white',
  alignItems: 'center',
  flexDirection: 'column',
  padding: 50,
  marginTop: 100,
  marginLeft: 150,
  marginRight: 150,
  height: 480,
  flex: 1,
  textAlign: 'left',
}
const placementStyle = {
  fontSize: 38,
  color: '#183059',
  marginRight: 50,
  fontWeight: '900'
}
const questionStyle = {
  flexDirection: 'row',
  alignItems: 'left',
}
const detailsStyle = {
  flexDirection: 'column',
  fontSize: 18,
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
const userStyle = {
  color: 'black',
}
const scoreContainerStyle = {
  marginLeft: 20,
  flexDirection: 'row'
}

export default withRouter(connect(mapStateToProps)(Leaderboard))