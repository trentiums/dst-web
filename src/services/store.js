import middlewares from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../redux/reducers'

const store = createStore(reducers, compose(applyMiddleware(middlewares)))

export default store
