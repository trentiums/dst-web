import React, { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNavOption } from '../../redux/sidebar/actions'
import { routesList } from '../../data/routesList'
import images from '../../assets/images'
import './sidebar.css'

function Sidebar() {
  const [hoverIndex, setHoverIndex] = useState(-1)
  const dispatch = useDispatch()
  const { navOption } = useSelector((state) => ({
    navOption: state.navOption,
  }))
  return (
    <div className="header">
      <a href="./" className="logoContainer">
        <img src={images.logo} className="logoImg" height="40px" width="40px" alt=""></img>
        Scrumpanion
      </a>
      <div onClick={() => dispatch(toggleNavOption(!navOption))} className="logoContainer_mb">
        <img src={images.hamburgMenu} className="logoImg" height="30px" width="30px" alt=""></img>
      </div>
      <ul className={navOption ? 'active' : ''}>
        {routesList.map((link, index) => (
          <li
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(-1)}
            style={{ background: hoverIndex === index ? '#999999' : '' }}
          >
            <Link to={link.path}>
              {link.text}
              <i className={link.iconName} style={{ color: '#fff', fontSize: link.iconSize }} />
            </Link>
          </li>
        ))}
        <div onClick={() => dispatch(toggleNavOption(!navOption))} className="arrowContainer">
          <img
            src={images.angledoubleleft}
            className="arrowImg"
            height="30px"
            width="30px"
            alt=""
          ></img>
        </div>
      </ul>
    </div>
  )
}
export default memo(Sidebar)
