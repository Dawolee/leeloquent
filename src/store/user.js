const LOGIN_USER = 'LOGIN_USER'

export const loginUser = user => {
  return {
    type: LOGIN_USER,
    user
  }
}

export default (state = null, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.user
    default:
      return state
  }
}
