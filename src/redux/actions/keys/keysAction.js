import * as keyTypes from './keyTypes'
import { setCookie, setHost } from '../../../services/api'
import { getKeyValue, removeKey, setKeyValue, keys } from '../../../services/localStorage'

export const getCookieStart = () => async (dispatch) => {
  try {
    const response = await getKeyValue(keys.cookie)
    if (response) {
      setCookie(response)
      dispatch(getCookieSuccess(response))
    } else {
      dispatch(getCookieFailure())
      dispatch(clearCookieStart())
    }
    return Promise.resolve(response)
  } catch (e) {
    dispatch(clearCookieStart())
    return Promise.reject(e)
  }
}

export const clearCookieStart = () => async (dispatch) => {
  dispatch(getCookieFailure())
  setCookie(undefined)
  removeKey(keys.cookie)
}

export const storeCookieStart = (cookieValue) => async () => {
  setCookie(cookieValue)
  getCookieSuccess(cookieValue)
  await setKeyValue(keys.cookie, cookieValue)
}

export const getCookieSuccess = (newCookieValue) => {
  return {
    type: keyTypes.GET_COOKIE_SUCCESS,
    payload: newCookieValue,
  }
}

export const getCookieFailure = () => {
  return {
    type: keyTypes.GET_COOKIE_FAILURE,
  }
}

export const setTourStep = (step) => {
  return { type: keyTypes.SET_TOUR_STEP, payload: step }
}

export const setEstimateCounter = (counter) => {
  setKeyValue(keys.estimateCounter, `${counter}`)
  return { type: keyTypes.SET_ESTIMATE_COUNTER, payload: counter }
}

export const updateTeamspaceId = (teamSpaceUid) => ({
  type: keyTypes.SET_TEAMSPACE_ID,
  payload: teamSpaceUid,
})

export const storeBackendEnvironmentStart = (backendUrl) => async () => {
  try {
    await setKeyValue(keys.backendUrl, backendUrl)
    setHost(backendUrl)
  } catch (e) {
    return Promise.reject(e)
  }
}
