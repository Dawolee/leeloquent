import axios from 'axios'
import THESAURUS_API_KEY from '../secrets'

const UPDATE_SYNONYMS = 'UPDATE_SYNONYMS'

export const fetchSynonyms = words => {
  return {
    type: UPDATE_SYNONYMS,
    words
  }
}

export const searchSynonyms = word => dispatch => {
  console.log(process.env.THESAURUS_API_KEY)
  return axios
    .get(`${THESAURUS_API_KEY}${word}/json`)
    .then(res => {
      //concats the the nouns and verbs synonyms and dispatches the action with the new array.
      let syns = []
      if (res.data.noun) {
        syns = syns.concat(res.data.noun.syn)
      }
      if (res.data.verb) {
        syns = syns.concat(res.data.verb.syn)
      }

      dispatch(fetchSynonyms(syns))
    })
    .catch(err => console.log(err))
}

export default (state = [], action) => {
  switch (action.type) {
    case UPDATE_SYNONYMS:
      return action.words
    default:
      return state
  }
}
