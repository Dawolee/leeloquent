import React, { Component } from 'react'
import book from './book.jpeg'
import './App.css'
import { Home } from './components'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={book} className="App-logo" alt="logo" />
          <h1 className="App-title">Babble like a King</h1>
        </header>
        <p className="App-intro">Leeloquence!!!</p>
        <Home />
      </div>
    )
  }
}

export default App
