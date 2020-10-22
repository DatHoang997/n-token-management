import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import token from './redux/token'

const default_state = {
  init: false
}

const appReducer = (state = default_state, action) => {
  switch (action.type) {

  }
  return state
}

export default combineReducers({
  app: appReducer,
  router: routerReducer,
  token: token.getReducer()
})
