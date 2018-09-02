import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Profile extends Component {
  state = { currentUser: null }

  componentDidMount() {
    let { user } = this.props
    this.setState({ currentUser: user })
  }

  render() {
    let { currentUser } = this.state
    return (
      <div>
        {currentUser ? (
          <div>
            <h2>Welcome {currentUser.displayName}!</h2>
            <Link to="/quotes">
              <Button>See your Quotes</Button>
            </Link>
          </div>
        ) : (
          <h2>Login to see your quotes!</h2>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(Profile)
