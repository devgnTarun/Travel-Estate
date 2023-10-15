import './user.css'
import tourist from '../../Images/tourist.png'
import React, { useState , useEffect } from 'react';
import {useDispatch , useSelector} from 'react-redux'
import './user.css'
import {clearError, loginUser} from '../../Action/userAction'
import {  toast } from "react-toastify";
import { Link , useHistory } from 'react-router-dom';
import MetaData from '../Utils/MetaData'
import Loader from '../Utils/Loader'

const Login = () => {


  const history = useHistory()
  // User Define with email and password
  const [user, setUser] = useState({
    email : '' ,
    password : '',
  })

  const dispatch= useDispatch()
  const { isAuthenticated , error , loading} = useSelector((state) => state.user)
  // Getting data from user
  const { email , password} = user;
 
  // Function for Form connection with backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginUser(email ,password))
  }

  useEffect(() => {
    if(error) {
      toast.error(error)
      dispatch(clearError)
    }
    if(localStorage.getItem('auth_token')){
      history.push('/')
    }
  }, [error , isAuthenticated , dispatch, history ])
  

  // Avtar changing and onChange mixed
  const registerChange = (e) => {
     
        setUser({...user , [e.target.name] : e.target.value} )
      
  }



  return (
    <>
    <MetaData title='User - Login'/>
      {
        loading ? <Loader/> : <div className='login_page'> 
        <div className='map_bg'></div>
        <h2 className='login_h2'>Login</h2>

    <div className="login_container">
      <div className="left_log">
          <img src={tourist} alt="" />
      </div>

      <div className="right_log">
          <form >
          <label>
            Email
            <input type="email" value={email}   onChange={registerChange} name="email" id="" />
          </label>
          <label>
            Password
            <input type="password" value={password}   onChange={registerChange} name="password" id="" />
          </label>
          <button className='submit_btn' onClick={handleSubmit}>Login</button>
          <Link className='noAcc hover:text-sky-500' to='/registerPop'>Don't Have Account ? Register</Link>
          </form>

      </div>
    </div>
    </div>
      }
    </>
  )
}

export default Login