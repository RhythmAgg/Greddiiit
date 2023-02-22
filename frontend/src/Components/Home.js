import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import Register from './Register'
import Login from './Login'

const Home = () => {
  document.querySelector("html").style.height = '200vh';
  document.querySelector("body").style.height = '200vh';
  return (
    <div className="contain">
        <div className="orange"></div>
        <div className="Black"></div>
        <div className="circle_in_between">
            <i className="fa fa-reddit" style={{"fontSize":"20vw",'color':'red'}}></i>
        </div>
        <div className='Home' >
            <Header />
            <div className='flex-login-register'>
                <Register />
                <Login />
            </div>
        </div>
    </div>
  )
}

export default Home
