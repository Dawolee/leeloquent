import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { searchSynonyms } from '../store/synonyms'
import { SynonymList, Popup } from './index'
import { deleteQuoteFromDb, updateQuoteInDB } from '../store/quotes'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
})

class Search extends Component {
  state = {
    word: '',
    search: false,
    quote: '',
    edit: false,
    editedQuote: ''
  }

  componentDidMount() {
    let { quote } = this.props.location.state
    this.setState({ quote })
  }

  handleChange = event => {
    this.setState({ word: event.target.value })
  }

  toggleSearch = () => {
    //toggles whether to show or hide the word search field
    this.state.search
      ? this.setState({ search: false })
      : this.setState({ search: true })
  }

  toggleEdit = () => {
    //toggles whether to show or hide the quote edit field
    this.state.edit
      ? this.setState({ edit: false })
      : this.setState({ edit: true })
  }

  editQuote = event => {
    this.setState({ editedQuote: event.target.value })
  }

  handleEdit = () => {
    let { quote, editedQuote } = this.state
    let { updateQuote, user } = this.props
    this.setState({ quote: editedQuote, editedQuote: '', edit: false }, () => {
      updateQuote(user.email, quote, editedQuote)
    })
  }

  handleSubmit = () => {
    this.props.search(this.state.word)
    this.setState({ word: '' })
  }

  selectedWordChange = selected => {
    this.setState({ selectedWord: selected }, () => {
      console.log(this.state)
    })
  }

  handleDelete = () => {
    //finds the correct quote and queries the firestore for it and then deletes it and goes back to the previous page
    let { location, deleteQuote, history } = this.props
    let { quote } = location.state
    //sends history to the thunk function to go back after updating state properly
    deleteQuote(quote, history)
  }

  handleRemoveWord = (word, index) => {
    let { quote } = this.state
    let { updateQuote, user } = this.props
    let updated = quote.split(' ')
    //uses the index of the word from the array to splice value out
    let idxOfRemovedWord = index
    updated.splice(idxOfRemovedWord, 1)
    updated = updated.join(' ')
    this.setState({ quote: updated }, () => {
      updateQuote(user.email, quote, updated)
    })
  }

  render() {
    let { word, search, quote, edit } = this.state
    let { synonyms } = this.props
    //gets rid of special characters
    let temp = quote.replace(/[^a-zA-Z ]/g, '').split(' ')
    return (
      <div>
        <Link style={{ textDecoration: 'none', color: '#FFF' }} to="/quotes">
          <Button>Go to Quotes</Button>
        </Link>
        <Button onClick={this.handleDelete}>Delete Quote</Button>
        <Button onClick={this.toggleEdit}>Edit Quote</Button>
        <div className="edit-quote">
          {temp &&
            !edit &&
            temp.map((word, index) => {
              //takes quote from state and makes a popup button for each word
              return (
                <Popup
                  key={index}
                  word={word}
                  index={index}
                  selectedWordChange={this.selectedWordChange}
                  handleRemoveWord={this.handleRemoveWord}
                />
              )
            })}
          {temp &&
            edit && (
              <div id="full-width">
                <TextField
                  fullWidth
                  label="Edit Quote"
                  InputLabelProps={{
                    shrink: true
                  }}
                  defaultValue={quote}
                  margin="normal"
                  onChange={this.editQuote}
                />
                <Button variant="outlined" onClick={this.handleEdit}>
                  Edit
                </Button>
              </div>
            )}
        </div>
        <Button onClick={this.toggleSearch}>
          {search ? 'Hide' : 'Search for Words'}
        </Button>
        {search && (
          <div>
            <TextField
              id="full-width"
              label="Search for Words"
              InputLabelProps={{
                shrink: true
              }}
              placeholder="Type here"
              helperText="Eloquence is essentialee knowing more words"
              margin="normal"
              value={word}
              onChange={this.handleChange}
            />
            <Button variant="outlined" onClick={this.handleSubmit}>
              Search
            </Button>
          </div>
        )}

        <div className="synonym-list">
          <SynonymList
            name="adjectives"
            synonyms={synonyms}
            selectedWordChange={this.selectedWordChange}
          />
          <SynonymList
            name="nouns"
            synonyms={synonyms}
            selectedWordChange={this.selectedWordChange}
          />
          <SynonymList
            name="verbs"
            synonyms={synonyms}
            selectedWordChange={this.selectedWordChange}
          />
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapState = state => {
  return {
    user: state.user,
    synonyms: state.synonyms
  }
}

const mapDispatch = dispatch => {
  return {
    search: word => {
      dispatch(searchSynonyms(word))
    },
    deleteQuote: (quote, history) => {
      dispatch(deleteQuoteFromDb(quote, history))
    },
    updateQuote: (email, quote, updatedQuote) => {
      dispatch(updateQuoteInDB(email, quote, updatedQuote))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(Search))
