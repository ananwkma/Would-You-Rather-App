import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions'

class Login extends Component { 

  setAuthedUser = () => {
  	const e = document.getElementById("userNameSelection");
  	if (e!=null) {
        const id = e.options[e.selectedIndex].value;
        if(!(id===""||id.length===0)) {
          if(this.props.location.state) this.props.history.push(this.props.location.state.redirectUrl)
          else this.props.history.push('/')
          return this.props.dispatch(handleSetAuthedUser({ id: id }))
        }
        return 
  	}
  }

  populateValues() {
    return <div> 
      <select id="userNameSelection">
        <option key="select" value="">--Select a User--</option>
        { this.props.userIds.map((id) => (
          <option key={id} value={id}>{id}</option>
          )) }
      </select>
	  </div>
  }

  render() {
      return (
          <div>
    	      {this.populateValues()}
            <button onClick={this.setAuthedUser}>Submit</button> 
          </div>
      )
	}
}

function mapStateToProps(state) {
  let userIds = Object.keys(state.users)
  return {userIds:userIds}
}

export default withRouter(connect(mapStateToProps)(Login))