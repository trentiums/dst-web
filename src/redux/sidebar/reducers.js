import types from './types'

const initialState = {
  navOption: false,
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.TOGGLE_NAV_OPTION:
      return { ...state, navOption: action.payload }
    default:
      return state
  }
}
