import * as sidebarTypes from '../actions/sidebar/sidebarTypes'

const initialState = {
  navOption: false,
}

export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case sidebarTypes.TOGGLE_NAV_OPTION:
      return { ...state, navOption: action.payload }
    default:
      return state
  }
}
