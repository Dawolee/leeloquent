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
      console.log(res)
      //concats the the nouns and verbs synonyms and dispatches the action with the new array.
      let result = res.data
      let syns = {
        nouns: {
          synonyms: [],
          antonyms: []
        },
        verbs: {
          synonyms: [],
          antonyms: []
        },
        adjectives: {
          synonyms: [],
          antonyms: []
        }
      }
      if (result.noun) {
        syns.nouns.synonyms = result.noun.syn
        syns.nouns.antonyms = result.noun.ant ? result.noun.ant : []
      }
      if (result.verb) {
        syns.verbs.synonyms = result.verb.syn
        syns.verbs.antonyms = result.verb.ant ? result.verb.ant : []
      }
      if (result.adjective) {
        syns.adjectives.synonyms = result.adjective.syn
        syns.adjectives.antonyms = result.adjective.ant
          ? result.adjective.ant
          : []
      }
      dispatch(fetchSynonyms(syns))
    })
    .catch(err => console.log(err))
}

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SYNONYMS:
      return action.words
    default:
      return state
  }
}
