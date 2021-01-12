import React, { memo } from 'react'

function UserItem({ index, user }) {
  return (
    <div className="avatarImgInnerCon">
      <img key={`userItem-${index}`} src={user.image} className="avatarImg" alt="" />
      <div>{user.nickName ? user.nickName : ''} </div>
    </div>
  )
}
export default memo(UserItem)
