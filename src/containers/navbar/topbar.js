import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNavOption } from '../../redux/sidebar/actions'
import { topbarList } from '../../data/routesList'
import images from '../../assets/images'

function Topbar() {
  const dispatch = useDispatch()
  const { navOption, uid, user } = useSelector((state) => ({
    navOption: state.sidebar.navOption,
    uid: state.user.uid,
    user: state.user,
  }))
  return (
    <div>
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
        {!uid ? (
          topbarList.map((link, index) => (
            <Link key={`topbar-${index}-${link}`} className="menuItem" to={link.path}>
              {link.text}
            </Link>
          ))
        ) : (
          <Link to="./register" className="profileContainer">
            <img
              src={`http://localhost:8080${user.photoPath}`}
              className="logoImg"
              height="30px"
              width="30px"
              alt=""
            ></img>
            {user.nickName}
          </Link>
        )}
      </div>
    </div>
  )
}
export default memo(Topbar)
