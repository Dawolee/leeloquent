import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default class Home extends Component {
  render() {
    return (
      <Link to="/quotes">
        <Button>See your Quotes</Button>
      </Link>
    )
  }
}
