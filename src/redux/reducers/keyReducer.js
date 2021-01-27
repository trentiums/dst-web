import * as keyTypes from '../actions/keys/keyTypes'

const keyInitalState = {
  tourStep: null,
  estimateCounter: 0,
  teamSpaceUid: null,
}

export default function keyReducer(state = keyInitalState, action) {
  let storedCookie
  switch (action.type) {
    case keyTypes.GET_COOKIE_SUCCESS:
      storedCookie = action.payload
      state = {
        ...state,
        storedcookie: storedCookie,
      }
      return state
    case keyTypes.SET_TOUR_STEP:
      return { ...state, tourStep: action.payload }
    case keyTypes.SET_ESTIMATE_COUNTER:
      return { ...state, estimateCounter: action.payload }
    default:
      return state
    case keyTypes.GET_COOKIE_FAILURE:
      return keyInitalState
    case keyTypes.SET_TEAMSPACE_ID:
      return { ...state, teamSpaceUid: action.payload }
  }
}
