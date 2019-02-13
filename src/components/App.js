import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar'
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Flexbox from 'flexbox-react';

class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  
  render() {
    return (
      <Router>
        <Flexbox style={backgroundStyle}>
          <NavBar/>
        </Flexbox>
      </Router>
    );
  }
}

function mapStateToProps(state) {
    return {}
}

const backgroundStyle = {
  backgroundColor: '#8AA29E',
  flexDirection: 'column',
  flex: 1,
};

export default connect (mapStateToProps) (App)
