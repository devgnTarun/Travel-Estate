import { useHistory } from "react-router-dom";
import uncle from '../../../Images/login.png'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useSelector} from 'react-redux'

function LoginPop() {
  const history = useHistory();
  const {isAuthenticated}  = useSelector( state => state.user)
  useEffect(() => {
    if(localStorage.getItem('auth_token')){
      history.push('/')
    }
  }, [isAuthenticated , history])
  


  return (
    <div style={{overflow : 'hidden'}} className="flex flex-col justify-center items-center h-screen">
        <div className="map_bg"></div>
        <div className="shadow-lg registerPop">
        <div className="img_div">
        <img src={uncle} alt="" />
        </div> 
        <div className="contentPop">
        <h1 className="text-3xl font-bold my-6">Who are you?</h1>
      <Link to='/login' className="py-2 px-4 bg-blue-500 text-white text-sm rounded-lg mb-4">
        
        Login as tourist
      </Link>
      <Link to='/loginGuide' className="py-2 px-4 bg-blue-500 text-white text-sm rounded-lg mb-4">
        Login as guide
      </Link>
      <Link to='/loginRoom' className="py-2 px-4 bg-blue-500 text-white text-sm rounded-lg mb-4">
        Login as hotel manager
      </Link>
        </div>
      
        </div>
     
    </div>
  );
}

export default LoginPop