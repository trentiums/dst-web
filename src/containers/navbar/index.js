import React, { memo, useState } from 'react'
import './navbar.css'
import Topbar from './topbar'
import Sidebar from './sidebar'
import Teamspace from './teamspace'

function Navbar() {
  const [show, setShow] = useState(false)
  return (
    <div className="header">
      <Topbar />
      <Sidebar setShow={setShow} />
      <Teamspace isShow={show} setShow={setShow} />
    </div>
  )
}
export default memo(Navbar)
