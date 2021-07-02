import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './AuthContext'
import authReducer from './authReducer'
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

    // actions go here
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
        } catch (err) {
            // err = status 400
            dispatch({ type: REGISTER_FAIL, payload: err.response.data })
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
                registerUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
