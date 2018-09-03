import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchEveryQuote } from '../store/otherUserQuotes'

class Search extends Component {
  state = {
    currentUser: null
  }

  componentDidMount() {
    let { user, fetchEvery } = this.props
    this.setState({ currentUser: user })
    fetchEvery(user.email)
  }

  render() {
    let { otherQuotes } = this.props
    console.log(this.props)
    return (
      <div>
        <h2>Quotes From Other Users</h2>
        {otherQuotes.length &&
          otherQuotes.map((quote, index) => {
            return (
              <div key={index}>
                <h4>Quote: {quote[0]}</h4>
                <h4>User: {quote[1]}</h4>
              </div>
            )
          })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    otherQuotes: state.otherUserQuotes
  }
}

const mapDispatch = dispatch => {
  return {
    fetchEvery: email => {
      dispatch(fetchEveryQuote(email))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Search)
