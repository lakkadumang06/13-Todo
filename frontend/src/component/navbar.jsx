import React from 'react'
import { Link } from 'react-router-dom'

const navbar = () => {
  return (
    <div>
      <Link to='/addform'>
        <button className='btn btn-primary'>Add</button>
      </Link>
      
    </div>
  )
}

export default navbar
