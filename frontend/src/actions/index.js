//import config from 'config'
//import {ifaces, getIPaddress} from './utils/utils.js'
import history from '../utils/history'
//import { useHistory } from "react-router-dom";

export const FLIPCARD = 'FLIPCARD'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const REQUEST_REGISTER = 'REQUEST_REGISTER'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const BACKEND_FAILURE = 'BACKEND_FAILURE'
export const RECEIVE_REGISTER = 'RECEIVE_REGISTER'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const GET_USERNAME = 'GET_USERNAME'
export const SHOW_DEMO = 'SHOW_DEMO'

let loginAttempt = 0;
//TODO: REGISTER: Sync
//      LOGIN: Async

//register: register response json data
// return data:
// {
//     register_attempt: 3,
//     sucessful_register: true
// }

// send data:
// {
//     username: username,
//     password: password,
//     ipAddress: ipaddress,
// }

// state shape: 
// {
//     Username: 'username',
//     Password: 'password',
//     UsernameExsit: false,
//     BackendFailure: false,  
//     LoginSuccess: false,
//     RegisterSuccess: false
// }


export function Demo() {
    history.push('/welcome')
    return {
        type: SHOW_DEMO
    }
}

export function GetUsername(username) {
    return {
        type: GET_USERNAME,
        username
    }
}

function Register_Success(Username) {
    return {
        type: REGISTER_SUCCESS,
        //RegisterSuccess: register.sucessful_register
        Username
    }
}

function Register_Failure(register){
    return {
        type: REGISTER_FAILURE,
        ShowRegFailureAlert: true
        //register_attempt: register.register_attempt
    }
}

function requestRegister(register) {
    return {
        type: REQUEST_REGISTER,
        register
    }
}

function handleRegisterResponse(json) {
    //console.log(json.UsernameExsit)

    //ALERT HAS TO BE DISPATCHED AT HERE TO MAKE ACTION SYNC. 
    //IF USING REDUX-THUNK, STATE UPDATE WILL BE LATE. 
    if ((json.UsernameExist) === true) {
        alert('USERNAME EXIST')
    }

    if ((json.RegisterSuccess) === true) {
        alert('REGISTRATION SUCCESS')
    }

    return {
        type: RECEIVE_REGISTER,
        RegisterSuccess: (json.RegisterSuccess) === true,
        UsernameExist: (json.UsernameExist) === true
    }
}

function handleLoginrResponse(json) {
    //ALERT HAS TO BE DISPATCHED AT HERE TO MAKE ACTION SYNC. 
    //IF USING REDUX-THUNK, STATE UPDATE WILL BE LATE. 
    if ((json.UsernameExist) === false) {
        alert('USERNAME DOES NOT EXIST')
    }

    if ((json.LoginSuccess) === true) {
        alert('LOGIN SUCCESS')
        history.push('/welcome')
        //dispatch(Login_Success(username))
        //window.location.reload()
        
    }

    if ((json.UsernameExist) === true && (json.LoginSuccess) === false) {
        alert('PASSWORD INCORRECT')
    }

    return {
        type: RECEIVE_LOGIN,
        RegisterSuccess: (json.RegisterSuccess) === true,
        UsernameExist: (json.UsernameExist) === true
    }
}



// const BackendFailure = (error) => (dispatch) => {
//     dispatch( { type: BACKEND_FAILURE })
//     return Promise.resolve()
// }
function BackendFailure(error) {
    alert('BACKENDFAILURE')
    return {
        type: BACKEND_FAILURE,
        BackendFailure: true
    }
}

export function Register(username, password){
    //const ipAddress = getIPaddress(ifaces)
    return function (dispatch) {
        const RequestOptions = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({"Username":username,"Password":password}),
            redirect: 'follow'        
        };

        return fetch("http://localhost:8080/register", RequestOptions)
        .then(response => response.json())
        .then(json => dispatch(handleRegisterResponse(json)),
              error => dispatch(BackendFailure(error)))
        //.then(json => console.log(json))
    }
}



export function Login(username, password){
    //const ipAddress = getIPaddress(ifaces)
    return function (dispatch) {
        const RequestOptions = {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({"Username":username,"Password":password}),
            redirect: 'follow'        
        };

        return fetch("http://localhost:8080/login", RequestOptions)
        .then(response => response.json())
        .then(json => dispatch(handleLoginrResponse(json, username)),
              error => dispatch(BackendFailure(error)))
        
        .then(res => dispatch(GetUsername(username)))
        .then(json => console.log('JSON!', json))
    }
}





//login: login response json data
// return data:
// {
//     login_attempt: 3
//     successful_login: true
// }

// send data:
// {
//     username: username,
//     password: password,
//     ipAddress: ipaddress
// }

function requestLogin(login) {
    return {
        type: REQUEST_LOGIN,
        login
    }
}

function Login_Success(Username){
    //console.log('login success', Username)
    return {
        type: LOGIN_SUCCESS,
        //login_attempt: login.login_attempt,
        //login_success: login.sucessful_login
        Username
    }
}

function Login_Failure(login){
    return {
        type: LOGIN_FAILURE,
        login_attempt: loginAttempt,
        login_success: false
    }
}

// export function Login(login, password, username) {
//     //const ipAddress = getIPaddress(ifaces)
//     const RequestOptions = {
//         method: 'POST',
//         headers: {'Content-type': 'application/json'},
//         body: JSON.stringify({ username, password, ipAddress })
//     };
//     return function (dispatch) {
//         dispatch(requestLogin(login))
//         return fetch('${config.apiUrl}'/loginauthentication, RequestOptions)
//         .then(response => response.json)
//         .then(login => dispatch(Login_Sucess(login)),
//               error => dispatch((Login_Failure(login))))
//     }
// }


// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }