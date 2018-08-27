import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Home, Search, Quotes, ErrorPage, Auth } from './components'
import fire from './fire'
import { loginUser } from './store/user'
import { connect } from 'react-redux'

class Routes extends Component {
  state = {
    currentUser: null
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ currentUser: true }, () => {
          this.props.login(user)
        })
      } else {
        this.setState({ currentUser: null })
      }
    })
  }
  render() {
    let { currentUser } = this.state
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Auth} />
        {currentUser && (
          <Switch>
            <Route exact path="/quotes" component={Quotes} />
            <Route path="/search" component={Search} />
          </Switch>
        )}
        <Route path="*" component={ErrorPage} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    login: user => {
      dispatch(loginUser(user))
    }
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
)
