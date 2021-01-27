import * as userTypes from './userTypes'
import Api, { urls, setAuthorization } from '../../../services/api'
import * as teamSpaceTypes from '../teamSpace/teamSpaceTypes'
import * as keysAction from '../keys/keysAction'
import { auth } from '../../../services/firebase'
import { keys, setKeyValue, removeKey } from '../../../services/localStorage'

export const userUpdateSuccess = (response) => {
  return {
    type: userTypes.USER_UPDATE_SUCCESS,
    payload: response,
  }
}
export const updateUserInfo = (user) => async (dispatch, getState) => {
  try {
    const { uid } = getState().user
    const response = await Api.put(`${urls.updateUser}/${uid}`, user)
    dispatch(
      userUpdateSuccess({
        ...getState().user,
        ...response.data,
      }),
    )
  } catch (e) {
    console.log(e)
    return Promise.reject(e)
  }
}
export const updateUserPicture = (picture) => async (dispatch, getState) => {
  try {
    const { uid } = getState().user
    const response = await Api.put(`user/${uid}${urls.userPicbase}`, { picture })
    console.log(response)
  } catch (e) {
    console.log(e)
    return Promise.reject()
  }
}
export const getUserImage = (url) => async () => {
  try {
    const response = await Api.get(url, { responseType: 'arraybuffer' }).then((response) =>
      Buffer.from(response.data, 'binary').toString('base64'),
    )
    return Promise.resolve(`data:image/jpeg;base64,${response}`)
  } catch (e) {
    return Promise.reject()
  }
}
export const guestLogin = (params) => async (dispatch) => {
  try {
    const response = await Api.post(`${urls.guestLogin}?deviceId=${params.deviceId}`)
    await dispatch(keysAction.storeCookieStart(response.data.cookie))
    params.storedCookie = response.data.cookie
    const res = await Api.post(`${urls.userLogin}`, params)
    await setKeyValue(keys.deviceId, params.deviceId)
    await setKeyValue(keys.firebaseUid, params.firebaseUid)
    dispatch({
      type: teamSpaceTypes.FETCH_USER_TEAMSPACE_SUCCESS,
      payload: res.data.teamSpaceList,
    })
    setAuthorization({
      username: res.data.userDevice.user.username,
      password: res.data.userDevice.user.username,
    })
    const userProfile = await Api.get(`${urls.userDetails}/${res.data.userDevice.user.uid}`)
    const userParam = {
      ...userProfile.data,
      deviceId: params.deviceId,
      firebaseUid: params.firebaseUid,
    }
    dispatch(userUpdateSuccess(userParam))
    return Promise.resolve(userParam)
  } catch (e) {
    console.log(e)
    return Promise.reject(e)
  }
}

export const userLogout = () => async (dispatch) => {
  await auth.signOut()
  await removeKey(keys.deviceId)
  await removeKey(keys.firebaseUid)
  dispatch({
    type: userTypes.USER_LOGOUT,
  })
}

export const setApiCredentials = (username, password) => () => {
  setAuthorization({ username, password })
}
