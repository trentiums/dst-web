import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

function SideBarListItem({
  keyValue,
  className,
  onClick,
  linkTo,
  text,
  iconName,
  imgSrc,
  tooltip,
  isSpecial,
  arrowIcon,
}) {
  const [hoverIndex, setHoverIndex] = useState(-1)
  return (
    <li
      key={keyValue}
      className={className}
      onMouseEnter={() => setHoverIndex(keyValue)}
      onMouseLeave={() => setHoverIndex(-1)}
      style={{ background: hoverIndex === keyValue ? '#0286be' : '' }}
    >
      <Link to={linkTo} onClick={() => onClick && onClick('text')}>
        <div className="sideBarItemText">
          {text}
          {arrowIcon && <i className={`${arrowIcon} sideBarItemArrowIcon `} />}
        </div>
        {imgSrc && (
          <img src={imgSrc} className="barAvatarImg" height="30px" width="30px" alt=""></img>
        )}
      </Link>
      {iconName && (
        <Link
          className="sideBarItemIconA"
          to={isSpecial ? '#' : linkTo}
          style={{
            background: hoverIndex === keyValue ? (isSpecial ? '#333333' : '#0286be') : '',
          }}
          onMouseEnter={() => (isSpecial ? setHoverIndex(-1) : '')}
          onMouseLeave={() => (isSpecial ? setHoverIndex(keyValue) : '')}
          onClick={() => onClick && onClick('icon')}
        >
          <OverlayTrigger
            placement="right"
            overlay={tooltip ? <Tooltip id={`tooltip`}>{tooltip}</Tooltip> : <div />}
          >
            <i className={`${iconName} ${isSpecial ? 'sideBarItemIconSpcl' : 'sideBarItemIcon'}`} />
          </OverlayTrigger>
        </Link>
      )}
    </li>
  )
}
export default memo(SideBarListItem)
