const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export const loginUser = user => {
  return {
    type: LOGIN_USER,
    user
  }
}

export const logOutUser = () => {
  return {
    type: LOGOUT_USER
  }
}

export default (state = null, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.user
    case LOGOUT_USER:
      return null
    default:
      return state
  }
}
