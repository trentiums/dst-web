import React, { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNavOption } from '../../redux/sidebar/actions'
import { sidebarList } from '../../data/routesList'
import images from '../../assets/images'
import { userLogout } from '../../redux/user/actions'

function Sidebar() {
  const [hoverIndex, setHoverIndex] = useState(-1)
  const dispatch = useDispatch()
  const { navOption, uid, user } = useSelector((state) => ({
    navOption: state.sidebar.navOption,
    uid: state.user.uid,
    user: state.user,
  }))
  return (
    <div>
      {uid && (
        <ul className={navOption ? 'active' : ''}>
          {uid && user && (
            <li
              key={`sidebar-profile`}
              className="profileContainer_mb"
              onMouseEnter={() => setHoverIndex(1000)}
              onMouseLeave={() => setHoverIndex(-1)}
              style={{ background: hoverIndex === 1000 ? '#0286be' : '' }}
            >
              <Link to={'./register'}>
                {user.nickName}
                <img
                  src={`http://localhost:8080${user.photoPath}`}
                  className="logoImg"
                  height="30px"
                  width="30px"
                  style={{ margin: 0, marginRight: -5 }}
                  alt=""
                ></img>
              </Link>
            </li>
          )}
          {sidebarList.map((link, index) => (
            <li
              key={`sidebar-${index}-${link}`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
              style={{ background: hoverIndex === index ? '#0286be' : '' }}
              onClick={() => {
                if (link.path === '/login') {
                  dispatch(userLogout())
                }
              }}
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
