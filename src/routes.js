import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Home, Search, Quotes } from './components'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/quotes" component={Quotes} />
        <Route path="/search" component={Search} />
      </Switch>
    )
  }
}

export default withRouter(Routes)
