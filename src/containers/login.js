import React, { memo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import { useDispatch } from 'react-redux'
import images from '../assets/images'
import { auth } from '../services/firebase'
import OrHorizontalBar from '../components/orHorizontalBar'
import { guestLogin } from '../redux/actions/user/userAction'
import SocialLogin from '../components/socialLogin'
import { getContinueURL } from '../services/api'

function Login() {
  const initialState = {
    fields: {},
    errors: {},
  }
  const [loginDetails, setLoginDetails] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()

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

  const onLogin = async (params) => {
    try {
      if (location.search) {
        const query = new URLSearchParams(location.search)
        const teamSpaceId = query.get('teamSpaceId')
        if (teamSpaceId) {
          params.startParameters.teamSpaceId = teamSpaceId
        }
      }
      const userRes = await dispatch(guestLogin(params))
      setLoading(false)
      if (!userRes.firstName || !userRes.lastName || !userRes.nickName || !userRes.email) {
        history.push({
          pathname: '/profile',
          search: location.search,
        })
      } else {
        history.push({
          pathname: '/',
          search: location.search,
        })
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
        if (!res.user.emailVerified) {
          res.user.sendEmailVerification({ url: getContinueURL(location.search) })
          NotificationManager.error('Please check your inbox and verify your email address.')
          setLoading(false)
          return
        }
        let params = {
          startParameters: {
            email: res.user.email,
          },
          deviceId: res.user.uid,
          // deviceId: sessionStorage.getItem('deviceId'),
          // firebaseUid: res.user.uid,
        }
        onLogin(params)
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

  return (
    <div className="page_container">
      <div className="box">
        <form className="form-signin " onSubmit={handleSubmit}>
          <div className="imgContainer">
            <img src={images.logo} className="logoImage" alt="" />
          </div>
          <div className="col-md-12 mt-3 px-0">
            <input
              type="email"
              id="email"
              className={`form-control${loginDetails?.errors?.email ? ' is-invalid' : ''}`}
              placeholder="Email"
              value={loginDetails?.fields?.email || ''}
              onChange={(e) => handleChange(e, 'email')}
            />
          </div>
          <div className="col-md-12 mt-3 px-0">
            <input
              type="password"
              id="password"
              className={`form-control${loginDetails?.errors?.password ? ' is-invalid' : ''}`}
              placeholder="Password"
              value={loginDetails?.fields?.password || ''}
              onChange={(e) => handleChange(e, 'password')}
            />
          </div>
          <div
            className="navLink fgPass mt-1"
            onClick={() =>
              history.push({
                pathname: '/forgotPass',
                search: location.search,
              })
            }
          >
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
          <SocialLogin setLoading={setLoading} onLogin={onLogin} />
        </form>
      </div>
      <div className="mt-2 mb-5">
        Didn't have an account yet?{' '}
        <span
          className="navLink mt-2 mb-5"
          onClick={() =>
            history.push({
              pathname: 'register',
              search: location.search,
            })
          }
        >
          Sign Up
        </span>
      </div>
    </div>
  )
}
export default memo(Login)
