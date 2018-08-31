import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { fetchAllQuotes, addQuoteToDb } from '../store/quotes'

class Quotes extends Component {
  state = {
    currentUser: null,
    currentQuote: '',
    add: false
  }

  componentDidMount() {
    let { user, getAllQuotes } = this.props
    getAllQuotes(user.email)
  }

  handleChange = event => {
    this.setState({ currentQuote: event.target.value })
  }

  handleSubmit = () => {
    let { user, addQuote } = this.props
    let { currentQuote } = this.state
    if (currentQuote.length) {
      //checks if current string is empty or not before adding to firestore
      let temp = currentQuote
      addQuote(temp, user.email)
      //sets currentQuote to empty, so you can start typing a new quote to add
      this.setState({ currentQuote: '' })
    }
  }

  toggleAdd = () => {
    //toggles whether to show or hide the quote edit field
    this.state.add
      ? this.setState({ add: false })
      : this.setState({ add: true })
  }

  render() {
    console.log(this.props)
    let { quotes } = this.props
    let { add } = this.state
    return (
      <div>
        <Button onClick={this.toggleAdd}>
          {add ? 'Close text field' : 'Add new quote!'}
        </Button>
        {add && (
          <div id="full-width">
            <TextField
              fullWidth
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
        )}
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
    },
    addQuote: (quote, email) => {
      dispatch(addQuoteToDb(quote, email))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Quotes)
