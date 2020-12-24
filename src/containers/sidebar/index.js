import React, { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNavOption } from '../../redux/sidebar/actions'
import { topbarList, sidebarList } from '../../data/routesList'
import images from '../../assets/images'
import './sidebar.css'

function Sidebar() {
  const [hoverIndex, setHoverIndex] = useState(-1)
  const dispatch = useDispatch()
  const { navOption, uid } = useSelector((state) => ({
    navOption: state.sidebar.navOption,
    uid: state.user.uid,
  }))
  return (
    <div className="header">
      <a href="./" className="logoContainer">
        <img src={images.logo} className="logoImg" height="40px" width="40px" alt=""></img>
        Scrumpanion
      </a>
      {uid && (
        <a onClick={() => dispatch(toggleNavOption(!navOption))} className="logoContainer_mb">
          <img src={images.hamburgMenu} className="logoImg" height="30px" width="30px" alt=""></img>
        </a>
      )}
      <div href="./" className="menuContainer">
        {topbarList.map((link, index) => (
          <Link key={`topbar-${index}-${link}`} className="menuItem" to={link.path}>
            {link.text}
          </Link>
        ))}
      </div>
      {uid && (
        <ul className={navOption ? 'active' : ''}>
          {sidebarList.map((link, index) => (
            <li
              key={`sidebar-${index}-${link}`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
              style={{ background: hoverIndex === index ? '#0286be' : '' }}
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
      )}
    </div>
  )
}
export default memo(Sidebar)
