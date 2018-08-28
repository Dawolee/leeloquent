import { db } from '../fire'

const FETCH_QUOTES = 'FETCH_QUOTES'
const POST_QUOTE = 'POST_QUOTE'

export const getQuotes = quotes => {
  return {
    type: FETCH_QUOTES,
    quotes
  }
}

export const addQuote = quote => {
  return {
    type: POST_QUOTE,
    quote
  }
}

export const fetchAllQuotes = email => dispatch => {
  return db
    .collection('quotes')
    .where('associatedUser', '==', email)
    .get()
    .then(querySnapshot => {
      let quotesArr = []
      querySnapshot.forEach(function(doc) {
        quotesArr.push(doc.data().quote)
      })
      dispatch(getQuotes(quotesArr))
    })
    .catch(error => {
      console.log('Error getting documents: ', error)
    })
}

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_QUOTES:
      return action.quotes
    case POST_QUOTE:
      return [...state, action.quote]
    default:
      return state
  }
}
