/* eslint-disable import/no-anonymous-default-export */
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    CONTACT_ERROR,
    GET_CONTACTS
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]  // payload is a contact
            }

        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            }
            
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact =>
                    contact._id === action.payload.id ? action.payload : contact)
            }

        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(e => e._id !== action.payload)  // payload is an id
            }

        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }

        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}