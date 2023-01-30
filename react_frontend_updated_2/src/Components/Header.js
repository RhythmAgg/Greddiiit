import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../img/reddit_logo.jpg'

const Header = () => {
  return (
    <nav className="navbar navbar-expand-sm justify-content-center navbar-dark">
        <div className="container-fluid d-flex justify-content-center ">
            <Link className="navbar-brand" to='/'>
            <img src={Logo} alt="Avatar Logo" style={{"width":"60px","backgroundSize": 'cover'}} className="rounded-pill" /> 
            </Link>
            <h1 style={{'color': 'white'}}><span style={{'color': 'red'}}>Gred</span>diiit</h1>
        </div>
    </nav>
  )
}

export default Header
