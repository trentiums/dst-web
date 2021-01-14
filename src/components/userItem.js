import React, { memo } from 'react'

function UserItem({ index, user }) {
  const Image = <img src={user.image} style={{ width: '80%' }} alt="" />
  return (
    <div className="avatarImgInnerCon" key={`userItem-${index}`}>
      {Image}
      <div>{user.nickName ? user.nickName : ''} </div>
    </div>
  )
}
export default memo(UserItem)
