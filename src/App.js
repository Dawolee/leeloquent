import React, { Component } from 'react'
import book from './book.jpeg'
import './App.css'
import Routes from './routes'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Navbar } from './components'
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
        <header className="App-header">
          <img src={book} className="App-logo" alt="logo" />
          <h1 className="App-title">Babble like a King</h1>
        </header>
        <Routes />
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
