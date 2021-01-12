import * as userTypes from './userTypes'
import Api, { urls, setCookie, setAuthorization } from '../../../services/api'
import { auth } from '../../../services/firebase'
// import DeviceInfo from '../../../Services/DeviceInfo'
import * as keysAction from '../keys/keysAction'
import * as notificationAction from '../notification/notificationAction'
// import { showMessage } from '../../../heplers/messagebar'
// import Config from '../../../Services/Config'
import * as teamSpaceTypes from '../teamSpace/teamSpaceTypes'

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
export const loginwithCookieOrCreateGuest = (properties) => async (dispatch, getState) => {
  try {
    const storedCookie = getState().keys.storedcookie
    console.log('cookie in State is' + storedCookie)
    properties = {
      ...properties,
      // deviceId: DeviceInfo.hostDevice.getUniqueId(),
      storedCookie: getState().keys.storedcookie,
      // deviceInfo: DeviceInfo.deviceProperties,
    }
    // properties.deviceInfo.deviceName = await DeviceInfo.hostDevice.getDeviceName()
    // properties.deviceInfo.userAgent = await DeviceInfo.hostDevice.getUserAgent()
    // properties.deviceInfo.Manufacturer = await DeviceInfo.hostDevice.getManufacturer()
    const responseJson = await Api.post(urls.userLogin, properties)
    // currently username and password are equal
    dispatch(userLoginSuccess(responseJson.data.userDevice))
    dispatch({
      type: teamSpaceTypes.FETCH_USER_TEAMSPACE_SUCCESS,
      payload: responseJson.data.teamSpaceList,
    })
    dispatch(
      setApiCredentials(
        responseJson.data.userDevice.user.username,
        responseJson.data.userDevice.user.username,
      ),
    )
    await dispatch(keysAction.storeCookieStart(responseJson.data.userDevice.cookie))
    if (responseJson.data?.backendMessages.length) {
      dispatch(
        notificationAction.updateNotification({
          showNotification: true,
          messages: responseJson.data.backendMessages,
        }),
      )
    }
    return responseJson.data.nextActions
  } catch (e) {
    console.info('checkCookie api' + e)
    // Server error not handled
    await dispatch(keysAction.clearCookieStart())
    await dispatch(loginwithCookieOrCreateGuest())
  }
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

export const licenseUpdated = (newLicenseCount) => {
  return {
    type: userTypes.LICENSE_UPDATED,
    payload: newLicenseCount,
  }
}

export const getLicense = () => async (dispatch, getState) => {
  try {
    // depends on proper authorization, which currently doesn't exist
    const { teamSpaceUid } = getState().teamSpace
    if (!teamSpaceUid) {
      return Promise.resolve()
    }
    await Api.get(urls.getLicense.format(teamSpaceUid)).then((res) => {
      dispatch(licenseUpdated(res.data.length))
    })
  } catch (e) {
    console.log(e)
    // showMessage({
    //   type: Config.INFORMATION_LEVEL['ERROR'],
    //   text: 'Server error. Could not get license information',
    // })
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

export const refreshUserLayout = (payload) => async (dispatch) => {
  dispatch({
    type: userTypes.USER_TYPE,
    payload: payload,
  })
}

export const resetLayoutFor = () => {
  return {
    type: userTypes.RESET_LAYOUT,
    payload: {},
  }
}

export const fetchCurrentUser = () => async (dispatch) => {
  const responseJson = await Api.post(urls.checkCookie)
  dispatch(userLoginSuccess(responseJson.data))
}
