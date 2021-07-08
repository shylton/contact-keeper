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
    GET_CONTACTS
} from '../types'

const ContactState = (props) => {
    const initialState = {
        contacts: [],
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

    const getContacts = async () => {

        try {
            const res = await axios.get('/api/contacts')
            dispatch({ type: GET_CONTACTS, payload: res.data })
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }

    }

    const updateContact = async (contact) => {
        // token not set, its an axios global var with setToken()
        const config = {
            headers: { 'Content-Type': 'application/json' }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
            dispatch({ type: UPDATE_CONTACT, payload: res.data })
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }

    }

    const deleteContact = async (id) => {
        try {
            await axios.delete(`/api/contacts/${id}`)
            dispatch({ type: DELETE_CONTACT, payload: id })
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }
        
    }
    
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }
    
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
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
                updateContact,
                getContacts
            }}
        >
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState
