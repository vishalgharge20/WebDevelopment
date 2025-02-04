import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <div>
        <h2>
            404 | Page Not Found
            <br />
            <button onClick={()=>navigate('/')} >Go To Home Page</button>
        </h2>
    </div>
  )
}

export default NotFound