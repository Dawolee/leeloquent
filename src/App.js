import React, { Component } from 'react'
import './App.css'
import Routes from './routes'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Navbar, BottomNav } from './components'
import fire from './fire'
import { loginUser } from './store/user'

class App extends Component {
  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.login(user)
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Routes />
        <BottomNav className="bottom-nav" />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    login: user => {
      dispatch(loginUser(user))
    }
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(App)
)
