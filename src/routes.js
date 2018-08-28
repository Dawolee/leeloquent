import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Home, Search, Quotes, ErrorPage, Auth, Profile } from './components'
import { connect } from 'react-redux'

class Routes extends Component {
  state = {
    currentUser: null
  }

  componentDidUpdate(prevProps) {
    let { user } = this.props
    if (user !== prevProps.user) {
      this.setState({ currentUser: user })
    }
  }

  render() {
    let { currentUser } = this.state
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Auth} />
        {currentUser && (
          <Switch>
            <Route exact path="/profile" component={Profile} />
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

export default withRouter(connect(mapState)(Routes))
