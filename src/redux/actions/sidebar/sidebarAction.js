import * as sidebarTypes from './sidebarTypes'
export const toggleNavOption = (navOption) => async (dispatch) => {
  dispatch({
    type: sidebarTypes.TOGGLE_NAV_OPTION,
    payload: navOption,
  })
}
