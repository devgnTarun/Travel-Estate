import { useHistory } from "react-router-dom";
import './register.css'
import uncle from '../../../Images/login.png'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useSelector} from 'react-redux'
import MetaData from '../../Utils/MetaData'

function PopRegister() {
  const history = useHistory();
  const {isAuthenticated}  = useSelector( state => state.user)
  useEffect(() => {
    if(isAuthenticated) {
      history.push('/')
    }
  }, [isAuthenticated])
  

  return (
    <>
      <MetaData title='Registration'/>
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="map_bg"></div>
        <div className="shadow-lg registerPop">
        <div className="img_div">
        <img src={uncle} alt="" />
        </div> 
        <div className="contentPop">
        <h1 className="text-3xl font-bold my-6">Who are you?</h1>
      <Link to='user_register' className="py-2 px-4 bg-blue-500 text-white text-sm rounded-lg mb-4">
        
        Register as tourist
      </Link>
      <Link to='register_guide' className="py-2 px-4 bg-blue-500 text-white text-sm rounded-lg mb-4">
        Register as guide
      </Link>
      <Link to='register_hotel' className="py-2 px-4 bg-blue-500 text-white text-sm rounded-lg mb-4">
        Register as hotel manager
      </Link>
        </div>
      
        </div>
     
    </div>
    </>
  );
}

export default PopRegister