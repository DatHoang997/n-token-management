import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import data from './redux/data'
import user from './redux/user'

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
  user: user.getReducer(),
  data: data.getReducer(),
})
