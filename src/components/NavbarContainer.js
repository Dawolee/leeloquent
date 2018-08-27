import { connect } from 'react-redux'
import Navbar from './Navbar'
import { logOutUser } from '../store/user'
import { withRouter } from 'react-router-dom'

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    logout: () => {
      dispatch(logOutUser())
    }
  }
}

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Navbar)
)
