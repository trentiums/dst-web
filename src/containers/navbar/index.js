import React, { memo, useState, useEffect } from 'react'
import './navbar.css'
import Topbar from './topbar'
import Sidebar from './sidebar'
import Teamspace from './teamspace'
import { useDispatch, useSelector } from 'react-redux'
import Api from '../../services/api'
import { getUserImage } from '../../redux/actions/user/userAction'

function Navbar() {
  const [show, setShow] = useState(false)
  const [profileURL, setProfileURL] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => ({
    user: state.user,
  }))
  useEffect(() => {
    const getImage = async (url) => {
      let response = await dispatch(getUserImage(url))
      setProfileURL(response)
    }
    if (user?.photoPath) {
      getImage(`${Api.defaults.baseURL}${user.photoPath}`)
    }
  })
  return (
    <div className="header">
      <Topbar profileURL={profileURL} />
      <Sidebar setShow={setShow} profileURL={profileURL} />
      <Teamspace isShow={show} setShow={setShow} />
    </div>
  )
}
export default memo(Navbar)
