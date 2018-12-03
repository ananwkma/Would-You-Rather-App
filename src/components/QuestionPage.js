import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Link } from 'react-router-dom'

class QuestionPage extends Component {
  render() {
    const {id} = this.props
    return (
      <div> 
      	<Question id={id} />
		    <button>
        	<Link to='/'> Back </Link>
		    </button>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  return { id }
}
export default connect(mapStateToProps)(QuestionPage)