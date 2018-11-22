import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
    return {}
}

export default connect (mapStateToProps) (App)
