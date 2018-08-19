import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default class Quotes extends Component {
  state = {
    quotes: ['Oh my goodness', 'Whatever you can do, I can do better']
  }
  render() {
    let { quotes } = this.state
    return (
      <div>
        {quotes &&
          quotes.map(quote => {
            return (
              <Link
                key={quote}
                to={{
                  pathname: '/search',
                  state: {
                    quote
                  }
                }}
              >
                <Button>{quote}</Button>
              </Link>
            )
          })}
      </div>
    )
  }
}
