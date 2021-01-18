import * as userTypes from '../actions/user/userTypes'

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
    case userTypes.USER_LOGIN_SUCCESS:
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
    case userTypes.USER_UPDATE_SUCCESS:
      userData = action.payload
      state = {
        ...state,
        ...userData,
        validUser: true,
        username: userData.username,
        password: userData.username,
      }
      return state
    case userTypes.USER_LOGIN_AUTH_ERROR:
      alert('Authentication failed')
      return action.payload
    case userTypes.LICENSE_UPDATED:
      state = {
        ...state,
      }
      return state
    case userTypes.REFRESH_USER:
      state = {
        ...state,
        nickname: action.payload.nickName,
        username: action.payload.updatedUserData.userName,
      }
      return state
    case userTypes.USER_TYPE:
      state = {
        ...state,
        layoutFor: action.payload.layoutFor,
      }
      return state
    case userTypes.RESET_LAYOUT:
      return {
        ...state,
        layoutFor: 'OWNER',
      }
    case userTypes.USER_LOGOUT:
      return {
        ...initialState,
      }
    default:
      return state
  }
}
