import { db } from '../fire'

const FETCH_QUOTES = 'FETCH_QUOTES'
const POST_QUOTE = 'POST_QUOTE'
const DELETE_QUOTE = 'DELETE_QUOTE'

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

export const deleteQuote = quote => {
  return {
    type: DELETE_QUOTE,
    quote
  }
}

export const fetchAllQuotes = email => dispatch => {
  return db
    .collection('quotes')
    .where('associatedUser', '==', email)
    .get()
    .then(querySnapshot => {
      //once all quotes are retrieved, grabs only the quotes and pushes into the quotesArr to then pass the array into the reducer, updating the quote state
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

export const deleteQuoteFromDb = (quote, history) => dispatch => {
  return db
    .collection('quotes')
    .where('quote', '==', quote)
    .get()
    .then(querySnapshot => {
      let deleted
      querySnapshot.forEach(doc => {
        //assigns deleted quote to filter quote out of state after action creator is dispatched
        deleted = doc.data().quote
        doc.ref.delete()
      })
      dispatch(deleteQuote(deleted))
    })
    .then(() => {
      //goes back in history after the state is updated with the removed quote
      history.goBack()
    })
    .catch(error => {
      console.log('Error getting documents: ', error)
    })
}

export const addQuoteToDb = (quote, email) => dispatch => {
  return db
    .collection('quotes')
    .add({
      quote: quote,
      associatedUser: email
    })
    .then(docRef => {
      console.log('Document written with ID: ', docRef.id)
      dispatch(addQuote(quote))
    })
    .catch(error => {
      console.error('Error adding document: ', error)
    })
}

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_QUOTES:
      return action.quotes
    case POST_QUOTE:
      return [...state, action.quote]
    case DELETE_QUOTE:
      return state.filter(quote => quote !== action.quote)
    default:
      return state
  }
}
