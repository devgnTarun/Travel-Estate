import React, { useState } from 'react';
import tourist from '../../../Images/tourist.png'
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import userPng from '../../../Images/user.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { clearError, registerGuide } from '../../../Action/userAction';
import {toast} from 'react-toastify'



function GuideRegister() {

    const history = useHistory()
    const dispatch = useDispatch()

    const [registerHeading, setRegisterHeading] = useState('')
    // User Define with email and password
    const [user, setUser] = useState({
      name : '',
      email : '' ,
      password : '',
      state : '',
      city : '',
      phoneNo : '',
    })
    const {name , email , password , state , city , phoneNo} = user;
   
    
  const [currentStep, setCurrentStep] = useState(1);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const {error} = useSelector(state => state.user)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error);
          // Retry getting location after some delay if the user denies the location request
          setTimeout(() => {
            console.log("Retrying location request...");
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
              },
              (error) => {
                console.error(error);
              }
            );
          }, 5000);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const myForm = new FormData()
    myForm.set('name' ,  name)
    myForm.set('email' ,  email)
    myForm.set('password' ,  password)
    myForm.set('avatar' ,  avatar)
    myForm.set('state' ,  state)
    myForm.set('city' ,  city)
    myForm.set('phoneNo' ,  phoneNo)
    myForm.set('latitude' ,  latitude)
    myForm.set('longitude' ,  longitude)

    dispatch(registerGuide(myForm))
  }



       // Avatar
   const [avatar, setAvatar] = useState('')
   const [avatarPreview, setavatarPreview] = useState('')


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
const nextStep = (e) => {
    e.preventDefault();
    const form = e.target.form;
    if (form.checkValidity()) {
      setCurrentStep(currentStep + 1);
    } else {
      form.reportValidity();
    }
  }
  
  

  useEffect(() => {
    if(currentStep === 1) {
        setRegisterHeading('Guide Register')
    }
    if(currentStep === 2) {
        setRegisterHeading('Guide Register - Location')
    }
    if(currentStep === 3) {
        setRegisterHeading('Guide Register - Password ')
    }
    }, [])
    useEffect(() => {
        if(error) {
          toast.error(error)
          dispatch(clearError)
        }
       
      }, [error  , dispatch  ])
      
  return (
    <div className="login_page">
    <div className='map_bg'></div>
    <h2 className='login_h2'>{registerHeading}</h2>

    <div className="login_container">
    <div className="left_log">
        <img src={tourist} alt="" />
    </div>
    <div className="right_log">

      {currentStep === 1 &&
         <form onSubmit={(e) => e.preventDefault()}>
         <div className="avtarBox"> <img src={avatarPreview  || userPng} value={avatarPreview} alt="" /></div>
         <label>
           Name
           <input required type="text" value={user.name}   onChange={registerChange}  name="name" id="" />
         </label>
         <label>
           Email
           <input required type="email" value={user.email}  onChange={registerChange} name="email" id="" />
         </label>
       
         <input  required className='image_file' type={'file'} name='avatar' accept='image/' onChange={registerChange}/>
         <button onClick={nextStep} className='submit_btn mt-2'>Next</button>
         </form>
      }
      {currentStep === 2 &&
          <form onSubmit={(e) => e.preventDefault()}>
             <label>
          Prefered State
           <input required type="text" value={user.state}   onChange={registerChange}  name="state" id="" />
         </label>
             <label>
          Prefered City
           <input required type="text" value={user.city}   onChange={registerChange}  name="city" id="" />
         </label>
            
            <button onClick={() => setCurrentStep(currentStep - 1)} className='submit_btn mt-2 btn_extent'>Go Back</button>
            <button onClick={nextStep} className='submit_btn mt-2'>Next</button>

          </form>
      }
      {currentStep === 3 &&
          <form onSubmit={(e) => e.preventDefault()}>
        <label>
           Phone Number 
           <input minLength={10} maxLength={14} required type="number" value={user.phoneNo}   onChange={registerChange}  name="phoneNo" id="" />
         </label>
         <label>
           Password
           <input required type="password" value={user.password}   onChange={registerChange}  name="password" id="" />
         </label>
          
         <button onClick={() => setCurrentStep(currentStep - 1)} className='submit_btn mt-2 btn_extent'>Go Back</button>
         <button onClick={handleSubmit} className='submit_btn mt-2'>Submit</button>
          </form>
      }
    </div>
      </div>
    </div>
  );
}

export default GuideRegister