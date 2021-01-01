import types from './types'
import Api, { urls, setCookie, setAuthorization } from '../../services/api'
import { auth } from '../../services/firebase'

export const userUpdateSuccess = (response) => {
  return {
    type: types.USER_UPDATE_SUCCESS,
    payload: response,
  }
}
export const getUserProfile = (params) => async (dispatch, getState) => {
  try {
    const response = await Api.get(`${urls.userDetails}/${params.userId}`)
    dispatch(
      userUpdateSuccess({
        ...response.data,
        deviceId: params.deviceId,
      }),
    )
    console.log(response)
  } catch (e) {
    console.log(e)
    return Promise.reject(e)
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
    type: types.USER_LOGOUT,
  })
}
