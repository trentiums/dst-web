import React, { memo, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUserImage } from '../redux/actions/user/userAction'

function UserItem({ index, user }) {
  const dispatch = useDispatch()
  const [profileURL, setProfileURL] = useState(false)
  useEffect(() => {
    const getImage = async (url) => {
      if (user.image.includes('http')) {
        let response = await dispatch(getUserImage(url))
        setProfileURL(response)
      } else {
        setProfileURL(url)
      }
    }
    if (user?.image) {
      getImage(user.image)
    }
  })
  const Image = <img src={profileURL} style={{ width: '80%' }} alt="" />
  return (
    <div className="avatarImgInnerCon" key={`userItem-${index}`}>
      {Image}
      <div>{user.nickName ? user.nickName : ''} </div>
    </div>
  )
}
export default memo(UserItem)
