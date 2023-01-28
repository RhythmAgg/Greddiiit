import React from 'react'
import { Outlet } from 'react-router-dom'


const Layout = () => {
  return (
    <div className='App' style={{'height': '100%'}}>
        <Outlet />
    </div>
  )
}

export default Layout
