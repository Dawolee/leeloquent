import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { searchSynonyms } from '../store/synonyms'
import { SynonymList, Popup } from '.'
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
  },
  button: {
    margin: theme.spacing.unit
  }
})

class EditQuote extends Component {
  state = {
    word: '',
    search: false,
    quote: '',
    edit: false,
    editedQuote: '',
    selectedWordIdx: null,
    selectedSynonym: null,
    tempQuote: ''
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
    let { editedQuote } = this.state
    if (editedQuote) {
      //checks if quote has been edited before updating the quote in the db
      this.setState({ quote: editedQuote, editedQuote: '', edit: false })
    }
  }

  handleSubmit = () => {
    this.props.search(this.state.word)
    this.setState({ word: '' })
  }

  selectedWordChange = idx => {
    this.setState({ selectedWordIdx: idx })
  }

  selectedSynonymChange = word => {
    //clicking on synonyms when a word in the current quote has been selected for replacement will swap the word with the selected synonym
    let { selectedWordIdx, quote } = this.state
    this.setState({ selectedSynonym: word }, () => {
      if (selectedWordIdx !== null) {
        let temp = quote.split(' ')
        temp.splice(selectedWordIdx, 1, word)
        temp = temp.join(' ')
        this.setState({ quote: temp })
      }
    })
  }

  handleDelete = () => {
    //finds the correct quote and queries the firestore for it and then deletes it and goes back to the previous page
    let { location, deleteQuote, history } = this.props
    let { quote } = location.state
    //sends history to the thunk function to go back after updating state properly
    deleteQuote(quote, history)
  }

  handleRemoveWord = index => {
    let { quote } = this.state
    let updated = quote.split(' ')
    //uses the index of the word being removed from the array to splice value out
    updated.splice(index, 1)
    updated = updated.join(' ')
    this.setState({ quote: updated })
  }

  saveChanges = () => {
    //if local quote is different from the original quote, saves changes
    let { quote } = this.state
    let { updateQuote, user, location } = this.props
    let originalQuote = location.state.quote
    updateQuote(user.email, originalQuote, quote)
    this.setState({ selectedWordIdx: null })
  }

  render() {
    let { word, search, quote, edit, selectedWordIdx } = this.state
    let { synonyms } = this.props
    //gets rid of special characters
    let temp = quote.replace(/[^a-zA-Z ]/g, '').split(' ')
    return (
      <div>
        <div className="btn-group">
          <Button
            className={styles.button}
            color="primary"
            onClick={this.toggleEdit}
          >
            Edit Quote
          </Button>
          <Button
            className={styles.button}
            color="primary"
            onClick={this.saveChanges}
          >
            Save Changes
          </Button>
          <Button
            className={styles.button}
            color="primary"
            onClick={this.handleDelete}
          >
            Delete Quote
          </Button>
        </div>
        <h2>Current Quote</h2>
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
                  isSelected={selectedWordIdx === index ? true : false}
                />
              )
            })}
        </div>
        {temp &&
          edit && (
            <div className="full-width">
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
              <div className="btn-group">
                <Button
                  variant="outlined"
                  className={styles.button}
                  onClick={this.handleEdit}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  className={styles.button}
                  onClick={() => this.setState({ edit: false })}
                >
                  Close
                </Button>
              </div>
            </div>
          )}

        <Button
          variant="outlined"
          color="secondary"
          className={styles.button}
          onClick={this.toggleSearch}
        >
          {search ? 'Hide' : 'Search for Words'}
        </Button>
        {search && (
          <div className="full-width">
            <TextField
              fullWidth
              label="Search for Words"
              InputLabelProps={{
                shrink: true
              }}
              placeholder="supercalifragilisticexpialidocious"
              margin="normal"
              value={word}
              onChange={this.handleChange}
            />
            <Button
              className={styles.button}
              variant="outlined"
              onClick={this.handleSubmit}
            >
              Search
            </Button>
          </div>
        )}

        <div className="synonym-list">
          <SynonymList
            name="adjectives"
            synonyms={synonyms}
            selectedSynonymChange={this.selectedSynonymChange}
          />
          <SynonymList
            name="nouns"
            synonyms={synonyms}
            selectedSynonymChange={this.selectedSynonymChange}
          />
          <SynonymList
            name="verbs"
            synonyms={synonyms}
            selectedSynonymChange={this.selectedSynonymChange}
          />
        </div>
      </div>
    )
  }
}

EditQuote.propTypes = {
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
)(withStyles(styles)(EditQuote))
