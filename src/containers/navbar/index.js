import React, { memo } from 'react'
import './navbar.css'
import Topbar from './topbar'
import Sidebar from './sidebar'

function Navbar() {
  return (
    <div className="header">
      <Topbar />
      <Sidebar />
    </div>
  )
}
export default memo(Navbar)
