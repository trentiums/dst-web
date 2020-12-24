import types from './types'

const initialState = {
  validUser: undefined,
  username: undefined,
  password: undefined,
  cookie: undefined,
  layoutFor: undefined,
}

export default function userReducer(state = initialState, action) {
  let userDeviceData
  let userData
  switch (action.type) {
    case types.USER_LOGIN_SUCCESS:
      userDeviceData = action.payload
      state = {
        ...state,
        validUser: true,
        username: userDeviceData.user.username,
        password: userDeviceData.user.username,
        nickname: userDeviceData.user.nickName,
        cookie: userDeviceData.cookie,
        uid: userDeviceData.user.uid,
        activeLicense: userDeviceData.user.activeLicense,
        activeLicenseFreeLayouts: userDeviceData.user.activeLicenseFreeLayouts,
        startWithSingleUserSpace: userDeviceData.user.startWithSingleUserSpace,
      }

      return state
    case types.USER_UPDATE_SUCCESS:
      console.log(action.payload)
      userData = action.payload
      state = {
        ...state,
        validUser: true,
        username: userData.username,
        password: userData.username,
        nickname: userData.nickname,
        uid: userData.uid,
        startWithSingleUserSpace: userData.startWithSingleUserSpace,
      }

      return state
    case types.USER_LOGIN_AUTH_ERROR:
      alert('Authentication failed')
      return action.payload
    case types.LICENSE_UPDATED:
      state = {
        ...state,
      }
      return state
    case types.REFRESH_USER:
      state = {
        ...state,
        nickname: action.payload.nickName,
        username: action.payload.updatedUserData.userName,
      }
      return state
    case types.USER_TYPE:
      state = {
        ...state,
        layoutFor: action.payload.layoutFor,
      }
      return state
    case types.RESET_LAYOUT:
      return {
        ...state,
        layoutFor: 'OWNER',
      }
    default:
      return state
  }
}
