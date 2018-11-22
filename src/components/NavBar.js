import React from 'react'
import Login from './Login'
import Leaderboard from './Leaderboard'
import Home from './Home'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import { connect } from 'react-redux'
import { withRouter, Link, Route } from 'react-router-dom'

class NavBar extends React.Component {
  
  displayAuthed(){
    let authed = this.props.authedUser
    if (authed === 'AUTHED_ID') 
      return <h5>
        You are not logged in
        </h5>
    else if (authed) 
      return <h5> 
        Logged in as: {authed.id}
      </h5>
    else return
  }
  
	render() {
    return (
      <div>    
        <Link to='/'> Home </Link>
      	<Link to='/add'> New Question </Link>
      	<Link to='/leader'> Leaderboards </Link>
      	<Link to='/login'> Login </Link>
        { this.displayAuthed() } 
        <div className='container'>
	        <Route path='/' exact component={Home} />
          <Route path='/add' component={NewQuestion} />
          <Route path='/leader' component={Leaderboard} />
          <Route path='/login' component={Login} />
          <Route path='/question/:id' component={QuestionPage} /> 
        </div>
      </div>
    )
	}
}


function mapStateToProps(state) {
  let authedUser = state.authedUser
  return { authedUser:authedUser }
}

export default withRouter (connect(mapStateToProps)(NavBar))