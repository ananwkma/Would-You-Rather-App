import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { handleSaveQuestion } from '../actions/shared'
import Flexbox from 'flexbox-react';

class NewQuestion extends Component {

  componentDidMount() {
    document.getElementById("submitButton").disabled = true
  }

  validate = () => {
    const optionOne = document.getElementById("optionOne").value
    const optionTwo = document.getElementById("optionTwo").value
    document.getElementById("submitButton").disabled = (optionOne === '' || optionTwo === '')
  }

  saveQuestion = () => {
    const optionOne = document.getElementById("optionOne").value
    const optionTwo = document.getElementById("optionTwo").value
    const qAuthor = this.props.authedUser.id
    const users = this.props.users
    document.getElementById("wouldYouRather").reset();
  	this.props.dispatch(handleSaveQuestion({ 
      optionOneText: optionOne, 
      optionTwoText: optionTwo, 
      author: qAuthor }, 
      users, 
      qAuthor));
  }

  render() {
    return (
      <Flexbox style={divStyle}>  
        <h1 style={titleStyle}> New Question </h1>
        <Flexbox style={pictureAndFormStlye}>
          <img src={`${this.props.avatarURL}`} alt="icon" style={profpicStyle}/> 
          <Flexbox style={formContainerStyle}> 
            <form id="wouldYouRather" style={formStyle}>
              Would you rather...<br/>
      		    <input type="text" id="optionOne" placeholder="Option 1" onChange={this.validate}/> or <br/>
              <input type="text" id="optionTwo" placeholder="Option 2" onChange={this.validate}/> ? <br/>
              <Link to='/'>  
                <input type="button" id="submitButton" onClick={this.saveQuestion} value="Submit"/>  
              </Link>
            </form>
          </Flexbox>
        </Flexbox>
      </Flexbox>
    )
  }
}

function mapStateToProps(state) {
  let authedUser = state.authedUser
  let users = state.users
  let avatarURL = users[authedUser.id].avatarURL
  return { authedUser:authedUser, users:users, avatarURL:avatarURL }
}

const titleStyle = {
  color: '#183059',
  fontSize: 38,
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
const formStyle = {
  fontSize: 20,
  fontWeight: 'bold',
}
const formContainerStyle = {
  flexDirection: 'column'
}
const pictureAndFormStlye = {
  flexDirection: 'row',
  alignItems: 'center',
}
const profpicStyle = {
  marginRight: 20,
}

export default withRouter(connect(mapStateToProps)(NewQuestion))