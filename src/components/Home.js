import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
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

class Home extends Component {
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
    let { word } = this.state
    let { synonyms } = this.props
    return (
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
        <div className="synonym-list">
          <SynonymList name="adjectives" synonyms={synonyms} />
          <SynonymList name="nouns" synonyms={synonyms} />
          <SynonymList name="verbs" synonyms={synonyms} />
        </div>
      </div>
    )
  }
}

Home.propTypes = {
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
)(withStyles(styles)(Home))
