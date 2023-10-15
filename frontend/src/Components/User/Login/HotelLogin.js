import React, { useState } from 'react'
import tourist from '../../../Images/tourist.png'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const HotelLogin = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
  return (
    <div className='login_page'> 
    <div className='map_bg'></div>
    <h2 className='login_h2'>Login for Hotel</h2>

<div className="login_container">
  <div className="left_log">
      <img src={tourist} alt="" />
  </div>

  <div className="right_log">
      <form action="">
      <label>
        Email
        <input type="email" value={email}   onChange={(e) => setEmail(e.target.value)} name="email" id="" />
      </label>
      <label>
        Password
        <input type="password" value={password}   onChange={(e) => setPassword(e.target.value)} name="password" id="" />
      </label>
      <button className='submit_btn'>Login</button>
      <Link className='noAcc hover:text-sky-500' to='/registerPop'>Don't Have Account ? Register</Link>
      </form>

  </div>
</div>
</div>
  )
}

export default HotelLogin