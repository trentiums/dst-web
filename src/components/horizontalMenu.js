import React, { memo } from 'react'
import ScrollMenu from 'react-horizontal-scrolling-menu'
import images from '../assets/images'
import './horizontalMenu.css'

export const menu = (avatars) =>
  avatars.map((avatar) => {
    return (
      <img
        key={`avatar-${avatar}`}
        className="menu-item"
        src={avatar}
        height="70px"
        width="70px"
        alt=""
      />
    )
  })

const selected = 'avatar1'

function HorizontalMenu() {
  const onSelect = (key) => {
    console.log(key)
  }
  return (
    <ScrollMenu
      data={menu(images.avatars)}
      arrowLeft={<img src={images.angledoubleleft} height="20px" width="20px" alt="" />}
      arrowRight={<img src={images.angledoubleleft} height="20px" width="20px" alt="" />}
      selected={selected}
      alignCenter={false}
      onSelect={onSelect}
    />
  )
}

export default memo(HorizontalMenu)
