import { combineReducers } from 'redux'
import sidebar from './sidebarReducers'
import user from './userReducers'

export default combineReducers({
  sidebar,
  user,
})
