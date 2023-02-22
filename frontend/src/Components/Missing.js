import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <div className='Missing'>
        <h2>404: Page Not Found</h2>
        <p>
            <Link to='/'>To the Login Page</Link>
        </p>
    </div>
  )
}

export default Missing
