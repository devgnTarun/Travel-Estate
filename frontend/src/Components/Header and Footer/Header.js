import React, { useState } from 'react'
import './head.css'
import {Link} from 'react-router-dom'
import logo from '../../Images/logo.png'
import { useRef , useEffect} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { logoutUser } from '../../Action/userAction.js'


const Header = () => {
    const [navLink, setnNavLink] = useState('nav_list')

    const [isScrolled, setIsScrolled] = useState(false);
  
    // Define the scroll handler function
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };


    const toggle = () => {
        if(navLink === 'nav_list'){
            setnNavLink('nav_list nav_open')
        }
        else{
            setnNavLink('nav_list')
        }
    }

    const [isOpened, setIsOpened] = useState(false);

    const ref = useRef();
    const dispatch = useDispatch();

    const {isAuthenticated, user, isGuide} = useSelector(state => state.user)

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpened(false)
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      };
  
      document.addEventListener("click", handleClickOutside);
  
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [ref]);


    const toggleMenuDashboard = () => {
      setIsOpened(!isOpened);
    };
    const handleLogout = () => {
      dispatch(logoutUser())
      toast.success('User Log out successfully')
  }
  const navbarClasses = ["navBar", isScrolled && "bg-white shadow-lg"].filter(Boolean).join(" ");


  return (
    <>
    <nav className={navbarClasses} ref={ref} >
        <Link to='/' className='logo' >
            <img src={logo} alt=''/>
        </Link>
        <div className={navLink}  >
            <ul>
                <li><Link to='/reservation'>Find Reservation</Link></li>
                <li><Link to='/packages'>Guides  </Link></li>
                {/* <li><Link to='/lakshdeep'>About Lakshdeep  &gt;  </Link></li> */}
                <li><Link to='/about'>About us</Link></li>
                <li><Link to='/guideLogin'>Are you Guide?</Link></li>
                <li><Link to='/support'>Support</Link></li>
            </ul>
        </div>

        {/* For big screen  */}
        <div className='right_btn' >   
           { isAuthenticated && isAuthenticated ?     <div className="relative" >
      <button
        onClick={toggleMenuDashboard}
        style={{overflow : 'hidden'}}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
      >
            <img src={user.avatar.url} alt={`${user.name} Image`}/>
      </button>
      {isOpened && (
        <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg">
        
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="mr-2 fas fa-tachometer-alt"></i> Dashboard
            </a>
            <Link
              to={`/profile/${user.name}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="mr-2 fas fa-user"></i> Profile 
            </Link>
          {user.isGuide && user.isGuide ?  <Link
              to={`/profile/${user.name}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="mr-2 fas fa-user"></i> Profile 
            </Link> : ''}
          </div>
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
            >
              <i className="mr-2 fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      )}
    </div> : 
           <><Link className='login_btn'  to='/loginPop'>
                Login
            </Link>
            <Link className='sign_btn' to='/registerPop'>
                Sign Up
            </Link>
            </> }
        </div>

        {/* Responsive icons  */}
        <div className='responsive_icons'>
       
       {isAuthenticated  && isAuthenticated ?    (
                    <div className="relative">
      <button
        onClick={toggleMenuDashboard}
        style={{overflow : 'hidden'}}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
      >
            <img src={user.avatar.url} alt={`${user.name} Image`}/>
      </button>
      {isOpened && (
        <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg">
        
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="mr-2 fas fa-tachometer-alt"></i> Dashboard
            </a>
            <Link
              to={`/profile/${user.name}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <i className="mr-2 fas fa-user"></i> Profile 
            </Link>
          </div>
          <div className="py-1">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
            >
              <i className="mr-2 fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      )}
    </div>
                ) :   <Link className='login_btn' to='/loginPop'  >
                Login
            </Link>
            }
        <i onClick={toggle} className='icon_toggle fas fa-bars'></i>
        </div>

        {/* 500 px icons  */}
        <div className='icons_500'>
        <i style={{cursor : 'pointer'}} onClick={toggle} className='icon_toggle fas fa-bars'></i>
        </div>

        {/* Small screen  */}
        <div className='profile_500'  >

            {
              isAuthenticated &&  isAuthenticated ?    <div className="relative" >
              <button
                onClick={toggleMenuDashboard}
                style={{overflow : 'hidden'}}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
              >
                    <img src={user.avatar.url} alt={`${user.name} Image`}/>
              </button>
              {isOpened && (
                <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-200 rounded-md shadow-lg">
                
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <i className="mr-2 fas fa-tachometer-alt"></i> Dashboard
                    </a>
                    <Link
                      to={`/profile/${user.name}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <i className="mr-2 fas fa-user"></i> Profile 
                    </Link>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
                    >
                      <i className="mr-2 fas fa-sign-out-alt"></i> Logout
                    </button>
                  </div>
                </div>
              )}
            </div> : <Link to='/loginPop' className='sign_btn ' >Login</Link>
            }

        </div>


    </nav>
    </>
  )
}

export default Header