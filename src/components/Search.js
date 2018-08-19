import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { searchSynonyms } from '../store/synonyms'
import SynonymList from './SynonymList'

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
  }

  state = {
    word: ''
  }

  handleChange(event) {
    this.setState({ word: event.target.value })
  }

  handleSubmit() {
    this.props.search(this.state.word)
    this.setState({ word: '' })
  }

  render() {
    console.log('search props', this.props)
    let { word } = this.state
    let { synonyms, location } = this.props
    let { quote } = location.state

    return (
      <div>
        <Link to="/quotes">
          <Button>Go to Quotes</Button>
        </Link>
        <p>{quote}</p>
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
