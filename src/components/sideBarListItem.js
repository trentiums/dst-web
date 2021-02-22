import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Dropdown from "react-bootstrap/Dropdown";
import deleteLogo from "../assets/images/icons/delete.png"
import editLogo from "../assets/images/icons/edit.png"
import "./sidebarList.css";
import EditTeamspace from './editTeamspace'
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
  editOption,
}) {
  const [hoverIndex, setHoverIndex] = useState(-1)
  const [openBox, setOpenBox] = useState(false)
  const [show, setShow] = useState(false)
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <span >
        <i class="fa fa-ellipsis-v col-1 mt-1 " style={{ fontSize: "16px" }} />
      </span>
    </a>
  ));
  const showDropdown = () => {
    setOpenBox(true)
  }
  return (
    <li
      key={keyValue}
      className={className}
      onMouseEnter={() => setHoverIndex(keyValue)}
      onMouseLeave={() => setHoverIndex(-1)}
      style={{ background: hoverIndex === keyValue ? '#0286be' : '' }}
    >

      <EditTeamspace isShow={show} setShow={setShow} />
      <Link to={isSpecial ? '#' : linkTo} >
        <div className="sideBarItemText">
          <div style={{ flex: "0.7" }} onClick={() => { console.log("object") }}>{text}</div>
          {editOption && (<div style={{ flex: "0.1" }}
            onMouseEnter={() => (isSpecial ? setHoverIndex(-1) : '')}
            onMouseLeave={() => (isSpecial ? setHoverIndex(keyValue) : '')}
            onClick={showDropdown}
          >
            <Dropdown >
              <Dropdown.Toggle as={CustomToggle} />
              <Dropdown.Menu className="dropdownMenu" style={{ backgroundColor: "white", borderRadius: "5px" }}>
                <Dropdown.Item style={{ padding:"0px 8px 0px 8px",display: "flex" }} onClick={() =>
                  setShow(true)
                }>
                  <p style={{  color: "black",top:"8px",flex:"0.9" }} >Edit</p>
                   <p style={{flex:"0.1"}}>
                    <img src={editLogo} style={{ width: '14px' }}></img>
                  </p>
                </Dropdown.Item>
                <Dropdown.Item style={{ display: "flex", padding:"0px 8px 0px 8px" }} >
                  <p style={{ color: "black",flex:"0.9" }} >Delete</p>
                  <p style={{flex:"0.1"}}>         
                      <img src={deleteLogo} style={{ width: '14px' }}></img>
                  </p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </div>)}
          {arrowIcon && <i className={`${arrowIcon} sideBarItemArrowIcon `} />}
        </div>
        {/* {imgSrc && (
          <img src={imgSrc} className="barAvatarImg" height="30px" width="30px" alt=""></img>
        )} */}
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
