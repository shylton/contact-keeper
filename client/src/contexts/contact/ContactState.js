import React, { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    CONTACT_ERROR,
} from '../types'

const ContactState = (props) => {
    const initialState = {
        contacts: [
        ],
        current: null,
        error: null
    }

    const [state, dispatch] = useReducer(contactReducer, initialState)

    // actions go here
    const addContact = async (contact) => {
        // token not set, its an axios global var with setToken()
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config)
            dispatch({ type: ADD_CONTACT, payload: res.data })
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
        
    }

    const deleteContact = (id) => {
        dispatch({ type: DELETE_CONTACT, payload: id })
    }
    
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }
    
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    const updateContact = (contact) => {
        dispatch({ type: UPDATE_CONTACT, payload: contact })
    }

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                error: state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState
