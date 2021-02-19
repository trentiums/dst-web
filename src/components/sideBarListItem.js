import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
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
      <span className="threedots"  ><i class="fa fa-ellipsis-v col-1 mt-1 " style={{ fontSize: "16px" }} /></span>
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
              <Dropdown.Menu style={{ backgroundColor: "white" }}>
                <Dropdown.Item onClick={() =>
                  // console.log("object")
                  setShow(true)
                }>
                  <div style={{ width: "100%", display: "flex" }}>
                    <p style={{ color: "black" }} >edit</p>
                    <p><i class='fa fa-edit'></i></p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item style={{ display: "flex" }} >
                  <div style={{ width: "100%", display: "flex" }}>
                    <p style={{ color: "black" }} >delete</p>
                    <p style={{ justifyContent:"flex-end" }}><i class="fa fa-trash-o"></i></p>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* <i class="fa fa-ellipsis-v col-1 mt-1 " style={{ fontSize: "16px" }}>
              {openBox && (
              <div style={{float:"right"}}>
                <ul style={{backgroundColor:"white",height:"10%",left:"98px",width:"10%" }}>
                  <li style={{backgroundColor:"red"}}>Option 1</li>
                  <li style={{backgroundColor:"yellow"}}>Option 2</li>
                </ul>
              </div>
            )}
            </i> */}

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
