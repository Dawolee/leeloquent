import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Home extends Component {
  render() {
    return (
      <div>
        <Link to="/quotes">
          <Button>See your Quotes</Button>
        </Link>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(Home)
