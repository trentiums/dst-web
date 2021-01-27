import React, { memo } from 'react'
import { NotificationManager } from 'react-notifications'
import { doSignInWithGoogle, doSignInWithFacebook, doSignInWithApple } from '../services/firebase'
// import { sessionkeys } from '../services/localStorage'

function socialLogin({ setLoading, onLogin }) {
  const onSocialBtnPressed = async (platform) => {
    // const deviceId = sessionStorage.getItem(sessionkeys.deviceId)
    try {
      setLoading(true)
      if (platform === 'facebook') {
        let response = await doSignInWithFacebook()
        const profile = response.additionalUserInfo.profile
        let params = {
          startParameters: {
            firstName: profile.first_name,
            lastName: profile.last_name,
            nickName: profile.name,
            email: profile.email,
          },
          deviceId: response.user.uid,
          firebaseUid: response.user.uid,
        }
        onLogin(params)
      } else if (platform === 'apple') {
        let response = await doSignInWithApple()
        const profile = response.user
        let params = {
          startParameters: {
            firstName: profile?.displayName?.includes(' ') && profile.displayName.split(' ')[0],
            lastName: profile?.displayName?.includes(' ') && profile.displayName.split(' ')[1],
            nickName: profile.displayName,
            email: profile.email,
          },
          deviceId: response.user.uid,
          firebaseUid: response.user.uid,
        }
        onLogin(params)
      } else if (platform === 'google') {
        let response = await doSignInWithGoogle()
        const profile = response.additionalUserInfo.profile
        let params = {
          startParameters: {
            firstName: profile.given_name,
            lastName: profile.family_name,
            nickName: profile.name,
            email: profile.email,
          },
          deviceId: response.user.uid,
          firebaseUid: response.user.uid,
        }
        onLogin(params)
      }
    } catch (error) {
      NotificationManager.error(
        error?.message ||
          error?.response?.data?.messsage ||
          error.toString() ||
          'Signup Failed. Something went worng',
      )
      setLoading(false)
    }
  }
  return (
    <div className="row justify-content-center ml-1 mr-1">
      <div className=" col-md-4 button fbBtn" onClick={() => onSocialBtnPressed('facebook')}>
        <i className="fa fa-facebook" style={{ fontSize: 24 }}></i>
      </div>
      <div className=" col-md-4 button appleBtn" onClick={() => onSocialBtnPressed('apple')}>
        <i className="fa fa-apple" style={{ fontSize: 24 }}></i>
      </div>
      <div className=" col-md-4 button googleBtn" onClick={() => onSocialBtnPressed('google')}>
        <i className="fa fa-google" style={{ fontSize: 24 }}></i>
      </div>
    </div>
  )
}
export default memo(socialLogin)
