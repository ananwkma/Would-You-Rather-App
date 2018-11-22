import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions'

class Login extends Component { 

  setAuthedUser = () => {
  	const e = document.getElementById("userNameSelection");
	if (e!=null) {
      const id = e.options[e.selectedIndex].value;
	  return this.props.dispatch(handleSetAuthedUser({ id: id }));
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
            <Link to='/'> 
              <button onClick={this.setAuthedUser}>Submit</button> 
            </Link>
          </div>
      )
	}
}

function mapStateToProps(state) {
  let userIds = Object.keys(state.users)
  return {userIds:userIds}
}

export default withRouter(connect(mapStateToProps)(Login))