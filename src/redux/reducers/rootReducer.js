import { combineReducers } from 'redux'
import sidebar from './sidebarReducers'
import user from './userReducers'
import keys from './keyReducer'
import backend from './backendReducer'
import teamspace from './teamSpaceReducer'

export default combineReducers({
  sidebar,
  user,
  keys,
  backend,
  teamspace,
})
