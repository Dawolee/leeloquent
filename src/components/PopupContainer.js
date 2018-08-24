import { connect } from 'react-redux'
import Popup from './Popup'
import { searchSynonyms } from '../store/synonyms'

const mapState = state => {
  return {
    synonyms: state.synonyms
  }
}

const mapDispatch = dispatch => {
  return {
    search: word => {
      dispatch(searchSynonyms(word))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Popup)
