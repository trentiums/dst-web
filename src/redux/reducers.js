import { combineReducers } from 'redux'
import sidebar from './sidebar/reducers'
import user from './user/reducers'

export default combineReducers({
  sidebar,
  user,
})
