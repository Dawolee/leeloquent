import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../fire'
import { TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { fetchAllQuotes } from '../store/quotes'

class Quotes extends Component {
  state = {
    currentUser: null,
    currentQuote: ''
  }

  componentDidMount() {
    let { user, getAllQuotes } = this.props
    getAllQuotes(user.email)
  }

  handleChange = event => {
    this.setState({ currentQuote: event.target.value })
  }

  handleSubmit = () => {
    let { currentQuote, currentUser } = this.state
    db.collection('quotes')
      .add({
        quote: currentQuote,
        associatedUser: currentUser.email
      })
      .then(docRef => {
        this.setState({ currentQuote: '' })
        console.log('Document written with ID: ', docRef.id)
      })
      .catch(error => {
        console.error('Error adding document: ', error)
      })
  }

  render() {
    let { quotes } = this.props
    console.log(this.props)
    return (
      <div>
        <div>
          {quotes &&
            quotes.map(quote => {
              return (
                <Link
                  key={quote}
                  to={{
                    pathname: '/search',
                    state: {
                      quote
                    }
                  }}
                >
                  <Button>{quote}</Button>
                </Link>
              )
            })}
        </div>
        <TextField
          id="full-width"
          label="Add a new quote"
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Type here"
          margin="normal"
          value={this.state.currentQuote}
          onChange={this.handleChange}
        />
        <Button variant="outlined" onClick={this.handleSubmit}>
          Add
        </Button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    quotes: state.quotes
  }
}

const mapDispatch = dispatch => {
  return {
    getAllQuotes: email => {
      dispatch(fetchAllQuotes(email))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Quotes)
