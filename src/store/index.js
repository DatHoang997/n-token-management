import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import config from '@/config'
import { createBrowserHistory as createHistory } from 'history'
import { routerMiddleware } from 'react-router-redux'

import reducer from './reducer'
// import action from './action';

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({})),
    applyMiddleware(middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)
store.history = history
// store.actions = action;

store.getRedux = (name) => {
  try {
    const redux = require('./redux/' + name)
    return redux.default
  } catch (e) {
    throw e
  }
}

if (config.NODE_ENV === 'development') {
  global.store = store
}

export default store
