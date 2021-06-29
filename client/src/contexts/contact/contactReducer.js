/* eslint-disable import/no-anonymous-default-export */
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types'

export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                contacts: [...state.contacts, action.payload]  // payload is a contact
            }
        
            case DELETE_CONTACT:
                return {
                    contacts: state.contacts.filter(e => e.id !== action.payload)  // payload is an id
                }
        default:
            return state
    }
}