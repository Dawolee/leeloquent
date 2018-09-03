import { db } from '../fire'

const FETCH_OTHER_QUOTES = 'FETCH_OTHER_QUOTES'

export const getOtherQuotes = quotes => {
  return {
    type: FETCH_OTHER_QUOTES,
    quotes
  }
}

export const fetchEveryQuote = email => dispatch => {
  return db
    .collection('quotes')
    .get()
    .then(querySnapshot => {
      let quotesArr = []
      querySnapshot.forEach(function(doc) {
        //grabs every quote that isn't associated with the current user
        let current = doc.data()
        if (current.associatedUser !== email) {
          quotesArr.push([current.quote, current.associatedUser])
        }
      })
      dispatch(getOtherQuotes(quotesArr))
    })
    .catch(error => {
      console.log('Error getting documents: ', error)
    })
}

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_OTHER_QUOTES:
      return action.quotes
    default:
      return state
  }
}
