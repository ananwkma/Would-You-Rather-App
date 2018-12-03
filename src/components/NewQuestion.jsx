import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { handleSaveQuestion } from '../actions/shared'

class NewQuestion extends Component {

  componentDidMount() {
    document.getElementById("submitButton").disabled = true
  }

  validate = () => {
    const optionOne = document.getElementById("optionOne").value
    const optionTwo = document.getElementById("optionTwo").value
    document.getElementById("submitButton").disabled = (optionOne == '' || optionTwo == '')
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
      <div>  This is the new question page. <br/>
        <form id="wouldYouRather">
          Would you rather...<br/>
  		  <input type="text" id="optionOne" onChange={this.validate}/>
          <br/> Or <br/>
          <input type="text" id="optionTwo" onChange={this.validate}/>
          <br/> ? <br/>
          <Link to='/'>  
            <input type="button" id="submitButton" onClick={this.saveQuestion} value="Submit"/>  
          </Link>
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