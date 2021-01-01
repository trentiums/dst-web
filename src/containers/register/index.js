import React, { memo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import './register.css'
import images from '../../assets/images'
import { guestLogin } from '../../redux/user/actions'
import { auth, doSignInWithGoogle, doSignInWithFacebook } from '../../services/firebase'
import OrHorizontalBar from '../../components/orHorizontalBar'

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
        await res.user.updateProfile({
          displayName: registerDetails.fields.name,
        })
        let response = await auth.currentUser
        let params = {
          startParameters: {
            firstName: response.displayName.split(' ')[0],
            lastName: response.displayName.split(' ')[1],
            nickName: response.displayName,
            email: response.email,
          },
          deviceId: response.uid,
        }
        if (selectedAvatarIndex !== null) {
          params.startParameters.picture = images.avatars[selectedAvatarIndex].replace(
            'data:image/png;base64,',
            '',
          )
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
  const onSuccessLogin = async () => {
    try {
      setLoading(false)
      history.push('/')
    } catch (error) {
      throw error
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
        if (selectedAvatarIndex !== null) {
          params.startParameters.picture = images.avatars[selectedAvatarIndex].replace(
            'data:image/png;base64,',
            '',
          )
        }
        await dispatch(guestLogin(params))
        onSuccessLogin()
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
        if (selectedAvatarIndex !== null) {
          params.startParameters.picture = images.avatars[selectedAvatarIndex].replace(
            'data:image/png;base64,',
            '',
          )
        }
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
            {loading && (
              <img src={images.loader} className="mr-2" width="20px" height="20px" alt=""></img>
            )}
            <div className="buttonText">Register</div>
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
      <div className="mt-2 mb-3">
        Already have an account ?{' '}
        <span className="navLink mt-2" onClick={() => history.push('login')}>
          Sign In
        </span>
      </div>
    </div>
  )
}
export default memo(Register)
