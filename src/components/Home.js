import React, { Component } from 'react'
import { book, pwa, share } from '../images/'
import { DecoCards } from './index'

class Home extends Component {
  btnAdd = this.refs.btnAdd
  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="leeloquent">Leeloquent </h1>
          <h3 className="App-title">All your favorite quotes in one place!</h3>
        </header>
        <div className="cards">
          <DecoCards
            className="deco-card"
            image={book}
            title={'Quote Library'}
            desc={
              'Add, edit and keep track of your favorite quotes! You can update your quotes in real time by searching for synonyms of words to spice them up!'
            }
          />
          <DecoCards
            className="deco-card"
            image={share}
            title={'Share and Discover New Quotes!'}
            desc={
              'Join a network of users and share and discover new quotes! Set genres to your quotes for easier discoverability and searchability! FEATURE NOT YET PRESENT!!!!!'
            }
          />
          <DecoCards
            className="deco-card"
            image={pwa}
            title={'Progressive Web App!'}
            desc={
              'Leeloquent is a progressive web app! You can download the app through your browser and use it as an ordinary app!'
            }
          />
        </div>
      </div>
    )
  }
}

export default Home
