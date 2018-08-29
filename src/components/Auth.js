import React, { Component } from 'react'
import { connect } from 'react-redux'
import fire from '../fire'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

class Auth extends Component {
  render() {
    let uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '/profile',
      signInOptions: [
        // Leave othe lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }

    let { user } = this.props
    //checks if a user is logged in and depending on that, shows the Auth UI
    return (
      <div>
        {!user && (
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

export default connect(mapState)(Auth)
