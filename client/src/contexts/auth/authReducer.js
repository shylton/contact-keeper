/* eslint-disable import/no-anonymous-default-export */
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

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            
            break;
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            break;
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            break;
        case CLEAR_ERRORS:
            break;
        default:
            return state;
    }
}
