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
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
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
    const { classes, user, history } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <KeyboardArrowLeft onClick={() => history.goBack()} />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            />
            {user ? (
              <div>
                <Link
                  style={{ textDecoration: 'none', color: '#FFF' }}
                  to="/profile"
                >
                  <Button color="inherit">Profile</Button>
                </Link>
                <Button color="inherit" onClick={this.handleLogOut}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link
                style={{ textDecoration: 'none', color: '#FFF' }}
                to="/auth"
              >
                <Button color="inherit">Login/Sign Up</Button>
              </Link>
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
