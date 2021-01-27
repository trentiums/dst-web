import React, { memo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import images from '../assets/images'
import { guestLogin } from '../redux/actions/user/userAction'
import { auth } from '../services/firebase'
import OrHorizontalBar from '../components/orHorizontalBar'
import SocialLogin from '../components/socialLogin'
import { getContinueURL } from '../services/api'

function Register() {
  const initialState = {
    fields: {},
    errors: {},
  }
  const [registerDetails, setRegisterDetails] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const handleValidation = () => {
    let fields = registerDetails.fields
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
    if (fields['password'] && fields['password'].length < 5) {
      errors['password'] = 'Password should be at least 5 digits.\n'
    }
    if (!fields['confirmPass'] || !fields['confirmPass'].trim()) {
      errors['confirmPass'] = 'Confirm password cannot be empty.\n'
    }
    if (fields['confirmPass'] && fields['confirmPass'].length < 6) {
      errors['confirmPass'] = 'Confirm password should be at least 6 digits.\n'
    }
    if (fields['password'] !== fields['confirmPass']) {
      errors['password'] = ` `
      errors['confirmPass'] = `Password and confirm password doesn't matched.\n`
    }
    if (Object.keys(errors).length) {
      NotificationManager.error(Object.values(errors))
      setRegisterDetails({ ...registerDetails, errors: errors })
      setLoading(false)
    }
    return Object.keys(errors).length > 0 ? false : true
  }

  const handleSubmit = async (e) => {
    if (loading) return
    try {
      setLoading(true)
      e.preventDefault()
      if (handleValidation()) {
        let res = await auth.createUserWithEmailAndPassword(
          registerDetails.fields.email,
          registerDetails.fields.password,
        )
        NotificationManager.success('Please check your inbox and verify your email address.')
        res.user.sendEmailVerification({ url: getContinueURL(location.search) })
        setLoading(false)
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

  const handleChange = (e, field) => {
    let fields = registerDetails.fields
    let errors = registerDetails.errors
    fields[field] = e.target.value
    errors[field] = undefined
    setRegisterDetails({ ...registerDetails, fields, errors })
  }

  return (
    <div className="page_container">
      <div className="box">
        <form className="form-signin " onSubmit={handleSubmit}>
          <div className="imgContainer">
            <img src={images.logo} className="logoImage" alt="" />
          </div>
          <div className="row">
            <div className="col-md-12">
              <input
                type="email"
                id="email"
                className={`form-control${registerDetails?.errors?.email ? ' is-invalid' : ''}`}
                placeholder="Email"
                value={registerDetails?.fields?.email || ''}
                onChange={(e) => handleChange(e, 'email')}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <input
                type="password"
                id="password"
                className={`form-control${registerDetails?.errors?.password ? ' is-invalid' : ''}`}
                placeholder="Password"
                value={registerDetails?.fields?.password || ''}
                onChange={(e) => handleChange(e, 'password')}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <input
                type="password"
                id="confirmPass"
                className={`form-control${
                  registerDetails?.errors?.confirmPass ? ' is-invalid' : ''
                }`}
                placeholder="Confirm Password"
                value={registerDetails?.fields?.confirmPass || ''}
                onChange={(e) => handleChange(e, 'confirmPass')}
              />
            </div>
          </div>
          <div className="button mt-3" onClick={handleSubmit}>
            {loading && (
              <img src={images.loader} className="mr-2" width="20px" height="20px" alt=""></img>
            )}
            <div className="buttonText">Register</div>
          </div>
          <OrHorizontalBar />
          <div className="mt-2 mb-2 text-center">Login with social media</div>
          <SocialLogin setLoading={setLoading} onLogin={onLogin} />
        </form>
      </div>
      <div className="mt-2 mb-3">
        Already have an account ?{' '}
        <span
          className="navLink mt-2"
          onClick={() =>
            history.push({
              pathname: 'login',
              search: location.search,
            })
          }
        >
          Sign In
        </span>
      </div>
    </div>
  )
}
export default memo(Register)
