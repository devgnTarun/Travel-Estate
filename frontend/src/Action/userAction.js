import { CLEAR_ERROR, GUIDE_LOGIN_FAIL, GUIDE_LOGIN_REQUEST, GUIDE_LOGIN_SUCCESS, GUIDE_REGISTER_FAIL, GUIDE_REGISTER_REQUEST, GUIDE_REGISTER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../Constants/userConstants"
import axios from 'axios'

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch({type : REGISTER_REQUEST})

        const config = {headers :{"Content-Type" : 'multipart/form-data'} }

       const {data} = await axios.post('/api/register' , userData , config)

        dispatch({
            type : REGISTER_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : REGISTER_FAIL,
            payload : error.response.data.message
        })
    }
}

//Login user

export const loginUser = (email , password) => async (dispatch) => {
    try {
        dispatch({type : LOGIN_REQUEST})

        const config = {headers :{"Content-Type" : 'application/json'} }
    
        const {data} = await axios.post('/api/login' , {email , password} , config)
        localStorage.setItem('auth_token' , data.token)
    
        dispatch({
            type : LOGIN_SUCCESS,
            payload : data
        })
    
    } catch (error) {
        dispatch({
            type : LOGIN_FAIL, 
            payload : error.response.data.message
        })
    }
   
}       


export const loadUser = () => async (dispatch) => {
        try {
            
    dispatch({type : LOAD_USER_REQUEST})

    const token =  localStorage.getItem('auth_token')
    if (!token) {
      return dispatch({ type : LOAD_USER_FAIL})
    }

    const {data} = await axios.get('/api/loadUser' , { headers: { auth_token: token } })

    dispatch({
        type : LOAD_USER_SUCCESS,
        payload : data,
    })
        } catch (error) {
            dispatch({
            type : LOAD_USER_FAIL, 
            payload : error.response.data.message
            })
        }

}

//Logout user
export const logoutUser = () => async (dispatch) => {
   try {
    dispatch({
        type : LOGOUT_REQUEST,
    })

    localStorage.removeItem('auth_token')

    dispatch({type : LOGOUT_SUCCESS})
   } catch (error) {
        dispatch({
            type : LOGOUT_FAIL,
            error : error
        })
   }
}
//Clear errors
export const clearError = () => async (dispatch)=>{
    dispatch({type : CLEAR_ERROR})
}


//Register guide
export const registerGuide = (userData) => async (dispatch) => {
    try {
        dispatch({type : GUIDE_REGISTER_REQUEST})

        const config = {headers :{"Content-Type" : 'multipart/form-data'} }

       const {data} = await axios.post('/api/registerGuide' , userData , config)

        dispatch({
            type : GUIDE_REGISTER_SUCCESS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : GUIDE_REGISTER_FAIL,
            payload : error.response.data.message
        })
    }
}

//Login user

export const loginGuide = (email , password) => async (dispatch) => {
    try {
        dispatch({type : GUIDE_LOGIN_REQUEST})

        const config = {headers :{"Content-Type" : 'application/json'} }
    
        const {data} = await axios.post('/api/loginGuide' , {email , password} , config)
        localStorage.setItem('auth_token' , data.token)
    
        dispatch({
            type : GUIDE_LOGIN_SUCCESS,
            payload : data
        })
    
    } catch (error) {
        dispatch({
            type : GUIDE_LOGIN_FAIL, 
            payload : error.response.data.message
        })
    }
   
}       
