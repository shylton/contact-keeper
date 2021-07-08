import React, { useContext, useEffect } from 'react'
import contactContext from '../contexts/contact/contactContext'
import { makeStyles } from '@material-ui/core/styles'

import ContactItem from './ContactItem'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    contactList: {
        '& > *': {
            margin: theme.spacing(3)
        },
    },
}))

const Contacts = () => {
    const classes = useStyles()
    const context = useContext(contactContext)
    const { contacts, getContacts } = context

    useEffect(() => {
        getContacts()
        // eslint-disable-next-line
    }, [])


    // TODO: make a spinner for loading contacts
    // bug: shows msg on reload since initial state is lenght zero
    return (
        contacts.length === 0 
        ? <div>Please add a contact</div>
        : contacts.map((e) => (
            <div key={e._id} className={classes.contactList}>
                <ContactItem data={e} />
            </div>
        ))
    )
}

export default Contacts
