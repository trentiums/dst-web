import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNavOption } from '../../redux/actions/sidebar/sidebarAction'
import images from '../../assets/images'
import { userLogout } from '../../redux/actions/user/userAction'
import SideBarListItem from '../../components/sideBarListItem'

function Sidebar({ setShow, profileURL }) {
  const dispatch = useDispatch()
  const [tSListToggle, setTSListToggle] = useState(true)
  const { navOption, uid, user, teamspace } = useSelector((state) => (console.log(state), {
    navOption: state.sidebar.navOption,
    uid: state.user.uid,
    user: state.user,
    teamspace: state.teamspace,
  }))
  let teamspaceData = {
    teamSpaceList: [
      {
        teamSpaceName: "a"
      },
      {
        teamSpaceName: "b"
      },
      {
        teamSpaceName: "c"
      },
      {
        teamSpaceName: "d"
      },
      {
        teamSpaceName: "e"
      },
      {
        teamSpaceName: "f"
      },
    ]
  }
  const isValidUser =
    user.firstName && user.lastName && user.nickName && user.email && user.photoPath && uid
  return (
    <div>
      {uid && (
        <ul className={navOption ? 'active' : ''}>
          {uid && user && (

            <SideBarListItem
              keyValue={`sidebar-profile`}
              className="profileContainer_mb"
              linkTo="./profile"
              text={user.nickName}
              imgSrc={profileURL}
            />
          )}
          {isValidUser && (

            <SideBarListItem
              keyValue={`sidebar-teamspace`}
              className="borderItem"
              linkTo="#"
              text="Team Spaces"
              isSpecial={true}
              iconName="fa fa-plus"
              arrowIcon={!tSListToggle ? 'fa fa-caret-down' : 'fa fa-caret-up'}
              tooltip="Create a new team space"
              onClick={(field) =>
                field === 'text' ? setTSListToggle(!tSListToggle) : setShow(true)
              }
            />
          )}
          <div style={{ overflow: "scroll", width: "100%", height: "50%" }}>
            {isValidUser &&
              tSListToggle &&
              teamspaceData?.teamSpaceList &&
              teamspaceData.teamSpaceList.map((link, index) => (
                <SideBarListItem
                  key={`sidebar-${index}-teamspace`}
                  keyValue={`sidebar-${index}-teamspace`}
                  isSpecial={true}
                  linkTo="/issueScreen"
                  text={link.teamSpaceName}
                  editOption={true}
                />
              ))}
          </div>

          <SideBarListItem
            keyValue={`sidebar-logout`}
            className="borderItem"
            onClick={() => dispatch(userLogout())}
            linkTo="/login"
            text="Logout"
            iconName="fa fa-sign-out"
          />
          {/* Bottom arrow to show full and hide full sidebar (Only in Web) */}
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
