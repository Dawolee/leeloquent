import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core/'
import HomeIcon from '@material-ui/icons/Home'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import SearchIcon from '@material-ui/icons/Search'
import { Link } from 'react-router-dom'

const styles = {
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  }
}

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.stickToBottom}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          component={Link}
          to="/"
        />

        <BottomNavigationAction
          label="Quotes"
          icon={<FormatQuoteIcon />}
          component={Link}
          to="/quotes"
        />

        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon />}
          component={Link}
          to="/search"
        />
      </BottomNavigation>
    )
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleBottomNavigation)
