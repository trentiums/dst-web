import React, { memo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import './register.css'
import images from '../../assets/images'
import { updateUserInfo, updateUserPicture } from '../../redux/user/actions'
import { auth } from '../../services/firebase'

function Register() {
  const initialState = {
    fields: {},
    errors: {},
  }
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0)
  const [registerDetails, setRegisterDetails] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleValidation = () => {
    let fields = registerDetails.fields
    let errors = {}
    if (!fields['firstName'] || !fields['firstName'].trim()) {
      errors['firstName'] = 'First name cannot be empty.\n'
    }
    if (!fields['lastName'] || !fields['lastName'].trim()) {
      errors['lastName'] = 'Last name cannot be empty.\n'
    }
    if (!fields['name'] || !fields['name'].trim()) {
      errors['name'] = 'Nick name cannot be empty.\n'
    }
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
        await auth.createUserWithEmailAndPassword(
          registerDetails.fields.email,
          registerDetails.fields.password,
        )
        if (selectedAvatarIndex !== null) {
          await dispatch(
            updateUserPicture({
              picture: images.avatars[selectedAvatarIndex],
            }),
          )
        }
        await dispatch(
          updateUserInfo({
            ...registerDetails.fields,
            nickName: registerDetails.fields.name,
            email: registerDetails.fields.email,
            firstName: registerDetails.fields.firstName,
            lastName: registerDetails.fields.lastName,
          }),
        )
        history.push('/')
      } else {
        return
      }
    } catch (error) {
      NotificationManager.error(
        error?.message ||
          error?.toString() ||
          'Server error. Could not modify your profile data. Please try again',
      )
      setLoading(false)
      console.log('error :', error)
    }
  }

  const handleChange = (e, field) => {
    let fields = registerDetails.fields
    let errors = registerDetails.errors
    fields[field] = e.target.value
    errors[field] = undefined
    setRegisterDetails({ ...registerDetails, fields, errors })
  }
  const onSelectAvatar = (e, index) => {
    setSelectedAvatarIndex(index)
  }

  return (
    <div className="page_container">
      <div className="box">
        <form className="form-signin " onSubmit={handleSubmit}>
          <div className="imgContainer mb-3">
            <img src={images.avatars[selectedAvatarIndex]} className="avatarImg" alt="" />
          </div>
          <div className="row">
            <div className="col-md-6 input-container">
              <input
                id="firstName"
                className={`form-control${registerDetails?.errors?.firstName ? ' is-invalid' : ''}`}
                placeholder="First Name"
                value={registerDetails?.fields?.firstName || ''}
                onChange={(e) => handleChange(e, 'firstName')}
              />
            </div>
            <div className="col-md-6 input-container mt-3 mt-md-0">
              <input
                id="lastName"
                className={`form-control${registerDetails?.errors?.lastName ? ' is-invalid' : ''}`}
                placeholder="Last Name"
                value={registerDetails?.fields?.lastName || ''}
                onChange={(e) => handleChange(e, 'lastName')}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6 input-container">
              <input
                id="name"
                className={`form-control${registerDetails?.errors?.name ? ' is-invalid' : ''}`}
                placeholder="Nick Name"
                value={registerDetails?.fields?.name || ''}
                onChange={(e) => handleChange(e, 'name')}
              />
            </div>
            <div className="col-md-6 input-container mt-3 mt-md-0">
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
            <div className="col-md-6 input-container">
              <input
                type="password"
                id="password"
                className={`form-control${registerDetails?.errors?.password ? ' is-invalid' : ''}`}
                placeholder="Password"
                value={registerDetails?.fields?.password || ''}
                onChange={(e) => handleChange(e, 'password')}
              />
            </div>
            <div className="col-md-6 input-container mt-3 mt-md-0">
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
          <div className="mt-3 mb-3">Change your avatar</div>
          <div
            className="mb-3"
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {images.avatars.map((avatar, i) => (
              <img
                key={`sidebar-${i}`}
                src={avatar}
                className="avatarImg"
                onClick={(e) => onSelectAvatar(e, i)}
                alt=""
              />
            ))}
          </div>
          <div className="button" onClick={handleSubmit}>
            <div className="buttonText">OK</div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default memo(Register)
