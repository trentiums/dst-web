import React, { memo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import { useDispatch } from 'react-redux'
import './login.css'
import images from '../../assets/images'
import { auth, doSignInWithGoogle, doSignInWithFacebook } from '../../services/firebase'
import OrHorizontalBar from '../../components/orHorizontalBar'
import { guestLogin } from '../../redux/user/actions'

function Login() {
  const initialState = {
    fields: {},
    errors: {},
  }
  const [loginDetails, setLoginDetails] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleValidation = () => {
    let fields = loginDetails.fields
    let errors = {}
    if (!fields['email'] || !fields['email'].trim()) {
      errors['email'] = 'Email cannot be empty.\n'
    }
    if (fields['email'] && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(fields['email'])) {
      errors['email'] = 'Email is invalid'
    }
    if (!fields['password'] || !fields['password'].trim()) {
      errors['password'] = 'Password cannot be empty.\n'
    }
    if (fields['password'] && fields['password'].length < 6) {
      errors['password'] = 'Password should be at least 6 digits.\n'
    }
    if (Object.keys(errors).length) {
      NotificationManager.error(Object.values(errors))
      setLoginDetails({ ...loginDetails, errors: errors })
      setLoading(false)
    }
    return Object.keys(errors).length > 0 ? false : true
  }
  const onSuccessLogin = async () => {
    try {
      setLoading(false)
      history.push('/')
    } catch (error) {
      throw error
    }
  }
  const handleSubmit = async (e) => {
    if (loading) return
    try {
      setLoading(true)
      e.preventDefault()
      if (handleValidation()) {
        let res = await auth.signInWithEmailAndPassword(
          loginDetails.fields.email,
          loginDetails.fields.password,
        )
        let params = {
          startParameters: {
            firstName: res.user.displayName.split(' ')[0],
            lastName: res.user.displayName.split(' ')[1],
            nickName: res.user.displayName,
            email: res.user.email,
          },
          deviceId: res.user.uid,
        }
        await dispatch(guestLogin(params))
        onSuccessLogin()
      } else {
        return
      }
    } catch (error) {
      NotificationManager.error(
        error?.message ||
          error?.response?.data?.messsage ||
          error.toString() ||
          'Server error. Please try again',
      )
      setLoading(false)
    }
  }
  const handleChange = (e, field) => {
    let fields = loginDetails.fields
    let errors = loginDetails.errors
    fields[field] = e.target.value
    errors[field] = undefined
    setLoginDetails({ ...loginDetails, fields, errors })
  }
  const socialSignIn = async (platform) => {
    try {
      setLoading(true)
      if (platform === 'facebook') {
        let response = await doSignInWithFacebook()
        let params = {
          startParameters: {
            firstName: response.additionalUserInfo.profile.first_name,
            lastName: response.additionalUserInfo.profile.last_name,
            nickName: response.additionalUserInfo.profile.name,
            email: response.additionalUserInfo.profile.email,
          },
          deviceId: response.user.uid,
        }
        console.log(params)
        await dispatch(guestLogin(params))
        onSuccessLogin()
        console.log(response)
      } else if (platform === 'google') {
        let response = await doSignInWithGoogle()
        let params = {
          startParameters: {
            firstName: response.additionalUserInfo.profile.given_name,
            lastName: response.additionalUserInfo.profile.family_name,
            nickName: response.additionalUserInfo.profile.name,
            email: response.additionalUserInfo.profile.email,
          },
          deviceId: response.user.uid,
        }
        console.log(params)
        await dispatch(guestLogin(params))
        onSuccessLogin()
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
    <div className="page_container">
      <div className="box">
        <form className="form-signin " onSubmit={handleSubmit}>
          <div className="imgContainer">
            <img src={images.logo} className="logoImage" alt="" />
          </div>
          <div className="col-md-12 input-container mt-3 px-0">
            <input
              type="email"
              id="email"
              className={`form-control${loginDetails?.errors?.email ? ' is-invalid' : ''}`}
              placeholder="Email"
              value={loginDetails?.fields?.email || ''}
              onChange={(e) => handleChange(e, 'email')}
            />
          </div>
          <div className="col-md-12 input-container mt-3 px-0">
            <input
              type="password"
              id="password"
              className={`form-control${loginDetails?.errors?.password ? ' is-invalid' : ''}`}
              placeholder="Password"
              value={loginDetails?.fields?.password || ''}
              onChange={(e) => handleChange(e, 'password')}
            />
          </div>
          <div className="navLink fgPass mt-1" onClick={() => history.push('forgotPass')}>
            Forgot Password?
          </div>
          <div className="button mt-3" onClick={handleSubmit}>
            {loading && (
              <img src={images.loader} className="mr-2" width="20px" height="20px" alt=""></img>
            )}
            <div className="buttonText">Login</div>
          </div>
          <OrHorizontalBar />
          <div className="mt-2 mb-2 text-center">Login with social media</div>
          <div className="row justify-content-center ml-1 mr-1">
            <div className=" col-md-4 button fbBtn" onClick={() => socialSignIn('facebook')}>
              <i className="fa fa-facebook" style={{ fontSize: 24 }}></i>
            </div>
            <div className=" col-md-4 button appleBtn" onClick={() => {}}>
              <i className="fa fa-apple" style={{ fontSize: 24 }}></i>
            </div>
            <div className=" col-md-4 button googleBtn" onClick={() => socialSignIn('google')}>
              <i className="fa fa-google" style={{ fontSize: 24 }}></i>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-2 mb-5">
        Didn't have an account yet?{' '}
        <span className="navLink mt-2 mb-5" onClick={() => history.push('register')}>
          Sign Up
        </span>
      </div>
    </div>
  )
}
export default memo(Login)
