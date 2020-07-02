import { combineReducers } from 'redux'
import {  RECEIVE_REGISTER,
          LOGIN_SUCCESS, BACKEND_FAILURE, RECEIVE_LOGIN, GET_USERNAME } from '../actions/index'
//import { act } from 'react-dom/test-utils'



const Registration = (state = { BackendFailure: false, UsernameExist: false, RegisterSuccess: false }, action) => {
    switch (action.type) {

        case RECEIVE_REGISTER:
            return {
                BackendFailure: false,
                UsernameExist: action.UsernameExist,
                RegisterSuccess: action.RegisterSuccess
            }
        case BACKEND_FAILURE:
            
            return {
                UsernameExist: false,
                RegisterSuccess: false,
                BackendFailure: true
            }
        default:
            return state
    }
    
}

const LoggingIn = (state = { BackendFailure: false, UsernameExist: false, LoginSuccess: false}, action) => {

    switch(action.type) {
        case RECEIVE_LOGIN:
            return{
                BackendFailure: false,
                UsernameExist: action.UsernameExist,
                LoginSuccess: action.LoginSuccess
            }
        case BACKEND_FAILURE:
            return {
                UsernameExist: false,
                LoginSuccess: false,
                BackendFailure: true
            }
        default:
            return state        
    }
}


const userName = (state = 'NEW USER', action ) => {
    switch(action.type) {
        
        case GET_USERNAME:
            console.log('action_username', action.username)
            return action.username

        case LOGIN_SUCCESS:
            console.log('login success', action.Username)
            return action.Username
            
        default:
            return state
    }
}


const rootreducer = combineReducers({
    Registration,
    LoggingIn,
    userName
})

export default rootreducer;