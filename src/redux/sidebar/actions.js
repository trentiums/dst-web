import types from './types'

export const toggleNavOption = navOption => async dispatch => {
  dispatch({
    type: types.TOGGLE_NAV_OPTION,
    payload: navOption,
  })
}
