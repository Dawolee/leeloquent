import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { searchSynonyms } from '../store/synonyms'
import { SynonymList, Popup } from './index'

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
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleSearch = this.toggleSearch.bind(this)
  }

  state = {
    word: '',
    search: false
  }

  handleChange(event) {
    this.setState({ word: event.target.value })
  }

  toggleSearch() {
    this.state.search
      ? this.setState({ search: false })
      : this.setState({ search: true })
  }

  handleSubmit() {
    this.props.search(this.state.word)
    this.setState({ word: '' })
  }

  render() {
    let { word, search } = this.state
    let { synonyms, location } = this.props
    let { quote } = location.state
    quote = quote.replace(/[^a-zA-Z ]/g, '').split(' ')
    return (
      <div>
        <Link to="/quotes">
          <Button>Go to Quotes</Button>
        </Link>
        <div className="edit-quote">
          {quote &&
            quote.map(word => {
              return <Popup key={word} word={word} />
            })}
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
          <SynonymList name="adjectives" synonyms={synonyms} />
          <SynonymList name="nouns" synonyms={synonyms} />
          <SynonymList name="verbs" synonyms={synonyms} />
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
    synonyms: state.synonyms
  }
}

const mapDispatch = dispatch => {
  return {
    search: word => {
      dispatch(searchSynonyms(word))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(Search))