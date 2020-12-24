import React, { memo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import './login.css'
import images from '../../assets/images'
import { auth } from '../../services/firebase'

function Login() {
  const initialState = {
    fields: {},
    errors: {},
  }
  const [loginDetails, setLoginDetails] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

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

  const handleSubmit = async (e) => {
    if (loading) return
    try {
      setLoading(true)
      e.preventDefault()
      if (handleValidation()) {
        await auth.signInWithEmailAndPassword(
          loginDetails.fields.email,
          loginDetails.fields.password,
        )
        history.push('/')
      } else {
        return
      }
    } catch (error) {
      NotificationManager.error(
        error?.message ||
          error.toString() ||
          'Server error. Could not modify your profile data. Please try again',
      )
      setLoading(false)
      console.log('error :', error)
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
          <div className="button mt-3 mb-5" onClick={handleSubmit}>
            <div className="buttonText">OK</div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default memo(Login)
