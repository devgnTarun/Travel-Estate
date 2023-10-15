import { CLEAR_ERROR, GUIDE_LOGIN_FAIL, GUIDE_LOGIN_REQUEST, GUIDE_LOGIN_SUCCESS, GUIDE_REGISTER_FAIL, GUIDE_REGISTER_REQUEST, GUIDE_REGISTER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../Constants/userConstants";


export const userReducer = (state={user : {} , token  :''}, action ) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
        case GUIDE_REGISTER_REQUEST:
        case GUIDE_LOGIN_REQUEST:
           return {
            loading : true,
            isAuthenticated : false,
            isGuide : false,
            success : false
           }
           case LOGIN_SUCCESS:
            return {
                ...state,
                loading : false,
                isAuthenticated : true,
                user : action.payload.user
            }
            case GUIDE_LOGIN_SUCCESS: 
            return {
                ...state,
                loading : false,
                isAuthenticated : true,
                user : action.payload.user,
                isGuide : true,
            }
            case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading : false,
                isAuthenticated : true,
                user : action.payload.user
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading : false,
                isAuthenticated : false,
                user: action.payload.user,
                success : true,
            }
        case GUIDE_REGISTER_SUCCESS:
            return {
                ...state,
                loading : false,
                isAuthenticated : false,
                user: action.payload.user,
                isGuide : false,
            }
        case LOGOUT_SUCCESS : 
            return {
                user : null,
                isAuthenticated : false,
                loading : false,
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOAD_USER_FAIL:
        case GUIDE_REGISTER_FAIL:
        case GUIDE_LOGIN_FAIL:
            return {
                ...state,
                success : false,
                loading : false,
                user : null,
                isAuthenticated : false,
                error : action.payload,
                isGuide : false
            }
         case LOGOUT_FAIL : 
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        case CLEAR_ERROR: 
        return {
            error : null,
            ...state
        }
        default:
            return state;
    }
}