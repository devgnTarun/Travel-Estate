import './App.css';
import Header from './Components/Header and Footer/Header';
import Home from './Components/Home';
import {BrowserRouter as Router , Switch ,Route} from 'react-router-dom'
import Login from './Components/User/Login';
import PopRegister from './Components/User/Register/PopRegister';
import GuideLogin from './Components/User/Login/GuideLogin';
import HotelLogin from './Components/User/Login/HotelLogin';
import Register from './Components/User/Register';
import Verify from './Components/Utils/Verify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './Action/userAction';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import LoginPop from './Components/User/Login/LoginPop';
import GuideVerify from './Components/Utils/GuideVerify';
import GuideRegister from './Components/User/Register/GuideRegister';

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
      dispatch(loadUser())
  }, [dispatch])
  
  return (
    <>
    <Router>
      <ToastContainer/>
    <Header/>
      <Switch>
        <Route exact path='/'>  <Home/>   </Route>
        <Route exact path='/loginPop'>  <LoginPop/> </Route>
        <Route exact path='/login'>  <Login/>  </Route>
        <Route exact path='/users/:id/verify/:token'>  <Verify/>  </Route>
        <Route exact path='/guide/:id/verify/:token'>  <GuideVerify/>  </Route>
        <Route exact path='/loginGuide'>  <GuideLogin/> </Route>
        <Route exact path='/loginRoom'>  <HotelLogin/>  </Route>
        <Route exact path='/registerPop'>  <PopRegister/>  </Route>
        <Route exact path='/user_register'>  <Register/>  </Route>
        <Route exact path='/register_guide'>  <GuideRegister/> </Route>
    </Switch>
    </Router>
    </>
  );
}

export default App;
