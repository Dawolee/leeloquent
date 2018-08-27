import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import fire from '../fire'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { connect } from 'react-redux'
import { loginUser } from '../store/user'

class Home extends Component {
  render() {
    let uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '/quotes',
      signInOptions: [
        // Leave othe lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    return (
      <div>
        <Link to="/quotes">
          <Button>See your Quotes</Button>
        </Link>
        {!this.props.user && (
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fire.auth()} />
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

export default connect(mapState)(Home)
