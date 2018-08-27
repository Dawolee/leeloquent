import React, { Component } from 'react'
import book from './book.jpeg'
import './App.css'
import Routes from './routes'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Navbar } from './components'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <header className="App-header">
          <img src={book} className="App-logo" alt="logo" />
          <h1 className="App-title">Babble like a King</h1>
        </header>
        <p className="App-intro">Leeloquence!!!</p>
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

export default withRouter(connect(mapState)(App))
