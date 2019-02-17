import React from 'react'
import Flexbox from 'flexbox-react';
import Login from './Login'
import Leaderboard from './Leaderboard'
import Home from './Home'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import { connect } from 'react-redux'
import { withRouter, Link, Route, Redirect } from 'react-router-dom'
import { handleSetAuthedUser } from '../actions'

class NavBar extends React.Component {
  
  logout = () => {    
    return this.props.dispatch(handleSetAuthedUser({ id: "" }));
  }

  isAuthed(){
    return !(this.props.authedUser.id === '') &&
           !(this.props.authedUser.id == null) ? 
           true : false
  }

  displayAuthed(){
    if (this.isAuthed()) 
      return <Link to='/login' style={navButton} onClick={this.logout}> 
          <img src={`${this.props.avatarURL}`} style={profpicStyle} alt={`Hello ${this.props.authedUser.id}!`}/>  LOGOUT </Link>
    else 
      return <Link to='/login' style={navButton}> LOGIN </Link>
  }

	render() {
    return (
      <div>  
        <Flexbox justifyContent="center" style={divStyle}>  
          <Link to='/' style={title}> WOULD YOU RATHER </Link>
        	<Link to='/add' style={navButton}> NEW QUESTION </Link>
        	<Link to='/leaderboard' style={navButton}> LEADERBOARDS </Link>
          { this.displayAuthed() } 
        </Flexbox>
        <div className='container'>
	        <Route exact path='/' render={() => (
            !this.isAuthed() ? 
              <Redirect to ={{pathname: '/login', state: {redirectUrl: this.props.location.pathname}}}/>
              : <Home/>)}/>
          <Route path='/add' render={() => (
            !this.isAuthed() ? 
              <Redirect to ={{pathname: '/login', state: {redirectUrl: this.props.location.pathname}}}/> 
              : <NewQuestion/>)}/>
          <Route path='/leaderboard' render={() => (
            !this.isAuthed() ? 
              <Redirect to ={{pathname: '/login', state: {redirectUrl: this.props.location.pathname}}}/> 
              : <Leaderboard/>)}/>
          <Route path='/login' component={Login} />
          <Route path='/question/:id' component={QuestionPage} />
        </div>
      </div>
    )
	}
}


function mapStateToProps(state) {
  let authedUser = state.authedUser
  let users = state.users
  let avatarURL = ''
  if (authedUser.id) avatarURL = users[authedUser.id].avatarURL
  return { authedUser:authedUser, avatarURL:avatarURL}
}

const profpicStyle = {
  height: 20,
}
const divStyle = {
  backgroundColor: '#183059',
};
const title = {
  fontSize: '27px',
  textAlign: 'center',
  color: 'white',
  fontFamily: 'arial-black',
  padding: 40,
  textDecoration: 'none',
}
const navButton = {
  fontSize: '15px',
  textAlign: 'center',
  color: 'white',
  fontFamily: 'arial-black',
  padding: 40,
  textDecoration: 'none',
};

export default withRouter (connect(mapStateToProps)(NavBar))