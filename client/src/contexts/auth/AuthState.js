import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './AuthContext'
import authReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: 'init'  // starts as 'init' on error => errorMsg, on success => null
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    // ### ACTIONS ###
    const registerUser = async (formData) => {
        //axios config
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config)  // no need for 'http:...' due to "proxy" in package.json
            dispatch({ type: REGISTER_SUCCESS, payload: res.data })  // res.data = token
            loadUser()
        } catch (err) {
            // err = status 400
            dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg })
        }
    }

    const resetError = () => dispatch({ type: CLEAR_ERRORS })

    // LOADUSER must b async because its making backend request
    const loadUser = async () => {
        // set global header for pesistence
        setAuthToken(localStorage.token)
        // const config = {
        //     headers: {
        //         'x-auth-token': localStorage.getItem('token')
        //     }
        // }
        try {
            const res = await axios.get('/api/auth')  // res.data => { _id, name, email, date }
            dispatch({ type: USER_LOADED, payload: res.data })
        } catch (err) {
            dispatch({ type: AUTH_ERROR })
        }
    }
    

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                error: state.error,
                registerUser,
                resetError,
                loadUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
