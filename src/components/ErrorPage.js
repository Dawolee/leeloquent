import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ErrorPage extends Component {
  render() {
    return (
      <div>
        <h1>OOPS! You must Login first to access these features</h1>
        <Link to="/">Go Back to Home</Link>
      </div>
    )
  }
}
