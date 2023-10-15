import {combineReducers , createStore , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { userReducer } from './Reducer/userReducer';


const reducer = combineReducers({
    user : userReducer,
});



let initialState = {};
let middleware = [thunk]

const store = createStore(reducer , initialState , composeWithDevTools(applyMiddleware(...middleware)))

export default store