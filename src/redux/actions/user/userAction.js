import * as userTypes from './userTypes'
import Api, { urls, setCookie, setAuthorization } from '../../../services/api'
import { auth } from '../../../services/firebase'
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
export const guestLogin = (params) => async (dispatch) => {
  try {
    const response = await Api.post(`${urls.guestLogin}?deviceId=${params.deviceId}`)
    setCookie(response.data.cookie)
    params.storedCookie = response.data.cookie
    await Api.post(`${urls.register}`, {})
    const res = await Api.post(`${urls.userLogin}`, params)
    setAuthorization({
      username: res.data.userDevice.user.username,
      password: res.data.userDevice.user.username,
    })
    if (params?.startParameters?.picture && res?.data?.userDevice?.user?.uid) {
      await Api.put(`user/${res.data.userDevice.user.uid}${urls.userPicbase}`, {
        picture: params.startParameters.picture,
      })
      const userProfile = await Api.get(`${urls.userDetails}/${res.data.userDevice.user.uid}`)
      dispatch(
        userUpdateSuccess({
          ...userProfile.data,
          deviceId: params.deviceId,
        }),
      )
    } else if (res?.data?.userDevice?.user?.uid) {
      const userProfile = await Api.get(`${urls.userDetails}/${res.data.userDevice.user.uid}`)
      dispatch(
        userUpdateSuccess({
          ...userProfile.data,
          deviceId: params.deviceId,
        }),
      )
    }
    return Promise.resolve()
  } catch (e) {
    console.log(e)
    return Promise.reject(e)
  }
}

export const userLogout = () => async (dispatch) => {
  await auth.signOut()
  dispatch({
    type: userTypes.USER_LOGOUT,
  })
}

export const setApiCredentials = (username, password) => () => {
  setAuthorization({ username, password })
}

export const userLoginSuccess = (response) => {
  return {
    type: userTypes.USER_LOGIN_SUCCESS,
    payload: response,
  }
}

export const getUserProfile = () => async (dispatch, getState) => {
  try {
    if (!getState().user.uid) {
      const user = {}
      return Promise.resolve(user)
    }
    const { data: user } = await Api.get(urls.userDetails.format(getState().user.uid))
    return Promise.resolve(user)
  } catch (e) {
    if (typeof e !== 'undefined') {
      // showMessage({
      //   type: Config.INFORMATION_LEVEL['ERROR'],
      //   text: 'Server error. Could not modify user data',
      // })
      console.log(e)
    }
  }
}
