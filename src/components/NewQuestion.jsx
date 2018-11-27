import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleSaveQuestion } from '../actions/shared'

class NewQuestion extends Component {
  componentDidMount() {
    this.isAuthed()
  }
  saveQuestion = () => {
    const optionOne = document.getElementById("optionOne").value
    const optionTwo = document.getElementById("optionTwo").value
    const qAuthor = this.props.authedUser.id
    const users = this.props.users
    document.getElementById("wouldYouRather").reset();
  	this.props.dispatch(handleSaveQuestion({ optionOneText: optionOne, optionTwoText: optionTwo , author: qAuthor }, users, qAuthor));
  }
  isAuthed = () => {
    let isAuthed = true
    if (this.props.authedUser.id === "" || this.props.authedUser.length===0) isAuthed = false
    else isAuthed = true
    document.getElementById("submitButton").disabled = !isAuthed
  }
  render() {
    return (
      <div>  This is the new question page. <br/>
        <form id="wouldYouRather">
          Would you rather...<br/>
  		  <input type="text" id="optionOne"/>
          <br/> Or <br/>
          <input type="text" id="optionTwo"/>
          <br/> ? <br/>
          <input type="button" id="submitButton" onClick={this.saveQuestion} value="Submit"/>  
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let authedUser = state.authedUser
  let users = state.users
  return { authedUser:authedUser, users:users }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))