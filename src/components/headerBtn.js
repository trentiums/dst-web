import React, { memo } from 'react'

function HeaderBtn({ iconName, onClick }) {
  return (
    <div style={{ cursor: 'pointer' }} onClick={onClick}>
      <img src={iconName} width="25px" height="25px" alt="" />
    </div>
  )
}
export default memo(HeaderBtn)
