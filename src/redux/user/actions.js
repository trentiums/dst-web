import types from './types'
import Api, { urls } from '../../services/api'

export const userUpdateSuccess = (response) => {
  return {
    type: types.USER_UPDATE_SUCCESS,
    payload: response,
  }
}
export const updateUserInfo = (user) => async (dispatch, getState) => {
  try {
    const { uid } = getState().user
    const response = await Api.put(`${urls.updateUser}/${uid}`, user)
    console.log(response)
    dispatch(
      userUpdateSuccess({
        ...getState().user,
        nickname: user.nickName,
        startWithSingleUserSpace: user.startWithSingleUserSpace,
      }),
    )
  } catch (e) {
    console.log(e)
    return Promise.reject(e)
  }
}
export const updateUserPicture = (picture) => async (dispatch, getState) => {
  try {
    const response = await Api.put(`${urls.userPicbase}`, picture)
    console.log(response)
  } catch (e) {
    console.log(e)
    return Promise.reject(e)
  }
}
