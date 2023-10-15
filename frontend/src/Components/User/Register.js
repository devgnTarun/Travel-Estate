import React, { useState , useEffect } from 'react'
import './user.css'
import {useDispatch , useSelector} from 'react-redux'
import tourist from '../../Images/tourist.png'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { registerUser , clearError } from '../../Action/userAction'
import {  toast } from "react-toastify";
import { useHistory } from 'react-router-dom';
import MetaData from '../Utils/MetaData'
import Loader from '../Utils/Loader'
import userPng from '../../Images/user.jpg'

const Register = () => {

    const history = useHistory()
    // User Define with email and password
    const [user, setUser] = useState({
      name : '',
      email : '' ,
      password : '',
    })
    const {name , email , password} = user;
   // Avatar
   const [avatar, setAvatar] = useState('')
   const [avatarPreview, setavatarPreview] = useState('')

   
   const dispatch= useDispatch()
   const { isAuthenticated , error , loading, success} = useSelector((state) => state.user)



  // Function for Form connection with backend
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const myForm = new FormData();
    myForm.set('name' ,  name)
    myForm.set('email' ,  email)
    myForm.set('password' ,  password)
    myForm.set('avatar' ,  avatar)

     dispatch(registerUser(myForm))
     history.push('/')
  }

  useEffect(() => {
    if(error) {
      toast.error(error)
      dispatch(clearError)
    }
    if(success) {
      toast.success("Account Created !! Verification link sent on your email")
    }
    if(localStorage.getItem('auth_token')) {
      history.push('/')
    }  
  }, [error , isAuthenticated , dispatch , history ])
  

  // Avtar changing and onChange mixed
  const registerChange = (e) => {
    if(e.target.name === 'avatar') {
        const reader = new FileReader();

        reader.onload =() => {
          if(reader.readyState === 2) {
            setavatarPreview(reader.result)
            setAvatar(reader.result)
          }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    else {
      setUser({...user , [e.target.name] : e.target.value} )
    }
}

  return (
   <>
    <MetaData title='User - Register'/>
    {
      loading ? <Loader/> :  <div className='login_page'> 
      <div className='map_bg'></div>
      <h2 className='login_h2'>Register</h2>
  
  <div className="login_container">
    <div className="left_log">
        <img src={tourist} alt="" />
    </div>
  
    <div className="right_log">
        <form action="">
        <div className="avtarBox"> <img  src={avatarPreview || userPng} value={avatarPreview} alt="" /></div>
        <label>
          Name
          <input required type="text" value={user.name}   onChange={registerChange}  name="name" id="" />
        </label>
        <label>
          Email
          <input required type="email" value={user.email}  onChange={registerChange} name="email" id="" />
        </label>
        <label>
          Password
          <input required type="password" value={user.password}   onChange={registerChange}  name="password" id="" />
        </label>
        <input  required className='image_file' type={'file'} name='avatar' accept='image/' onChange={registerChange}/>
        <button onClick={handleSubmit} className='submit_btn'>Send Verification Link</button>
        <Link className='noAcc hover:text-sky-500' to='/loginPop'>Already Have Account ? Login</Link>
        </form>
  
    </div>
  </div>
  </div>
    }
   </>
  )
}

export default Register