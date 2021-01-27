import React, { memo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import images from '../assets/images'
import { auth } from '../services/firebase'
import { getContinueURL } from '../services/api'

function ForgotPassword() {
  const initialState = {
    fields: {},
    errors: {},
  }
  const [fPDetails, setFPDetails] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const location = useLocation()

  const handleValidation = () => {
    let fields = fPDetails.fields
    let errors = {}
    if (!fields['email'] || !fields['email'].trim()) {
      errors['email'] = 'Email cannot be empty.\n'
    }
    if (fields['email'] && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(fields['email'])) {
      errors['email'] = 'Email is invalid'
    }
    if (Object.keys(errors).length) {
      NotificationManager.error(Object.values(errors))
      setFPDetails({ ...fPDetails, errors: errors })
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
        await auth.sendPasswordResetEmail(fPDetails.fields.email, {
          url: getContinueURL(location.search),
        })
        NotificationManager.success('Check your mail for reset password.')
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
      console.log('error :', error)
    }
  }

  const handleChange = (e, field) => {
    let fields = fPDetails.fields
    let errors = fPDetails.errors
    fields[field] = e.target.value
    errors[field] = undefined
    setFPDetails({ ...fPDetails, fields, errors })
  }

  return (
    <div className="page_container">
      <div className="box">
        <form className="form-signin " onSubmit={handleSubmit}>
          <div className="imgContainer">
            <img src={images.logo} className="logoImage" alt="" />
          </div>
          <h5 className="text-center">Forgot your password?</h5>
          <div className="col-md-12 px-0">
            <input
              type="email"
              id="email"
              className={`form-control${fPDetails?.errors?.email ? ' is-invalid' : ''}`}
              placeholder="Email"
              value={fPDetails?.fields?.email || ''}
              onChange={(e) => handleChange(e, 'email')}
            />
          </div>
          <div className="button mt-3" onClick={handleSubmit}>
            <div className="buttonText">Send Mail</div>
          </div>
        </form>
      </div>
      <div className="mt-2 mb-5">
        <span
          className="navLink mt-2 mb-5"
          onClick={() =>
            history.push({
              pathname: 'login',
              search: location.search,
            })
          }
        >
          Cancel
        </span>
      </div>
    </div>
  )
}
export default memo(ForgotPassword)
