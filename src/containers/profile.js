import React, { memo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotificationManager } from 'react-notifications'
import images from '../assets/images'
import { updateUserPicture, updateUserInfo } from '../redux/actions/user/userAction'
import Api from '../services/api'

function Profile() {
  const initialState = {
    fields: {},
    errors: {},
  }
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0)
  const [profileURL, setProfileURL] = useState(null)
  const [profileDetails, setProfileDetails] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({
    user: state.user,
  }))
  useEffect(() => {
    setProfileDetails({
      ...profileDetails,
      fields: {
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.nickName,
        email: user.email,
      },
    })
    if (user?.photoPath) {
      setSelectedAvatarIndex(null)
      setProfileURL(`${Api.defaults.baseURL}${user.photoPath}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  const handleValidation = () => {
    let fields = profileDetails.fields
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
    if (Object.keys(errors).length) {
      NotificationManager.error(Object.values(errors))
      setProfileDetails({ ...profileDetails, errors: errors })
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
        let params = {
          firstName: profileDetails.fields.firstName,
          lastName: profileDetails.fields.lastName,
          nickName: profileDetails.fields.name,
          email: profileDetails.fields.email,
          username: user.username,
          uid: user.uid,
        }
        console.log(selectedAvatarIndex)
        if (selectedAvatarIndex !== null) {
          let picture = images.avatars[selectedAvatarIndex].replace('data:image/png;base64,', '')
          await dispatch(updateUserPicture(picture))
        }
        await dispatch(updateUserInfo(params))
        setLoading(false)
        NotificationManager.success('Profile updated successfully.')
      } else {
        return
      }
    } catch (error) {
      NotificationManager.error(
        error?.message ||
          error?.response?.data?.messsage ||
          error?.toString() ||
          'Server error. Please try again',
      )
      setLoading(false)
    }
  }

  const handleChange = (e, field) => {
    let fields = profileDetails.fields
    let errors = profileDetails.errors
    fields[field] = e.target.value
    errors[field] = undefined
    setProfileDetails({ ...profileDetails, fields, errors })
  }
  const onSelectAvatar = (e, index) => {
    setSelectedAvatarIndex(index)
  }

  return (
    <div className="page_container">
      <div className="box">
        <form className="form-signin " onSubmit={handleSubmit}>
          <div className="imgContainer mb-3">
            <img
              src={selectedAvatarIndex ? images.avatars[selectedAvatarIndex] : profileURL}
              className="avatarImg"
              alt=""
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <input
                id="firstName"
                className={`form-control${profileDetails?.errors?.firstName ? ' is-invalid' : ''}`}
                placeholder="First Name"
                value={profileDetails?.fields?.firstName || ''}
                onChange={(e) => handleChange(e, 'firstName')}
              />
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <input
                id="lastName"
                className={`form-control${profileDetails?.errors?.lastName ? ' is-invalid' : ''}`}
                placeholder="Last Name"
                value={profileDetails?.fields?.lastName || ''}
                onChange={(e) => handleChange(e, 'lastName')}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-6">
              <input
                id="name"
                className={`form-control${profileDetails?.errors?.name ? ' is-invalid' : ''}`}
                placeholder="Nick Name"
                value={profileDetails?.fields?.name || ''}
                onChange={(e) => handleChange(e, 'name')}
              />
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <input
                type="email"
                id="email"
                className={`form-control${profileDetails?.errors?.email ? ' is-invalid' : ''}`}
                placeholder="Email"
                value={profileDetails?.fields?.email || ''}
                onChange={(e) => handleChange(e, 'email')}
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
            <div className="buttonText">Update</div>
          </div>
        </form>
      </div>
    </div>
  )
}
export default memo(Profile)
