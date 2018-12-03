import React from 'react'
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
      return <div>
        <Link to='/'>
          <button onClick={this.logout}>Logout</button>
        </Link>
        <h5> Logged in as: {this.props.authedUser.id} </h5>
      </div>
    else 
      return <div>
          <Link to='/login'> <button> Login </button> </Link>
          <h5> You are not logged in </h5>
        </div>
  }

	render() {
    return (
      <div>    
        <Link to='/'> <button> Home </button> </Link>
      	<Link to='/add'> <button> NewQuestion </button> </Link>
      	<Link to='/leaderboard'> <button> Leaderboards </button> </Link>

        { this.displayAuthed() } 

        <div className='container'>
	        <Route exact path='/' render={() => (
            !this.isAuthed() ? 
              (<Redirect to ='/login'/>) : <Home/>)}/>
          <Route path='/add' render={() => (
            !this.isAuthed() ? 
              (<Redirect to ='/login'/>) : <NewQuestion/>)}/>
          <Route path='/leaderboard' render={() => (
            !this.isAuthed() ? 
              (<Redirect to ='/login'/>) : <Leaderboard/>)}/>
          <Route path='/login' component={Login} />
        {<Route path='/question/:id' component={QuestionPage} />}
          {/*<Route path='/question/:id' render={() => (
            !this.isAuthed() ? 
              (<Redirect to ='/login'/>) : <QuestionPage/>)}/>*/}
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