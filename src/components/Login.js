import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions'
import Flexbox from 'flexbox-react';

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
    return <div style={sectionStyle}> 
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
          <Flexbox style={divStyle}>
            <h1 style={titleStyle}> Login </h1>
    	      {this.populateValues()}
            <button padding={40} onClick={this.setAuthedUser}>Submit</button> 
          </Flexbox>
      )
	}
}

function mapStateToProps(state) {
  let userIds = Object.keys(state.users)
  return {userIds:userIds}
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
};
const sectionStyle = {
  padding: 40,
}
const titleStyle = {
  color: '#183059',
  fontSize: 38,
}

export default withRouter(connect(mapStateToProps)(Login))