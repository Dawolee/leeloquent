import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@material-ui/core/'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from 'react-router-dom'
import fire from '../fire'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class Navbar extends Component {
  state = {
    errorMessage: ''
  }

  handleLogOut = () => {
    fire
      .auth()
      .signOut()
      .then(() => this.props.logout())
      .then(() => {
        this.props.history.push('/')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    console.log(this.props)
    const { classes, user } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              News
            </Typography>
            {user ? (
              <Button onClick={this.handleLogOut}>Logout</Button>
            ) : (
              <Button>
                <Link to="/auth">Login</Link>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
Navbar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navbar)
