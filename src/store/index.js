import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import synonyms from './synonyms'
import user from './user'
import quotes from './quotes'
import otherUserQuotes from './otherUserQuotes'

const reducer = combineReducers({ synonyms, user, quotes, otherUserQuotes })

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
