import React, { useContext } from 'react'
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
    let contactList = useContext(contactContext)
    contactList = contactList.contacts

    return (
        contactList.length === 0 
        ? <div>Please add a contact</div>
        : contactList.map((e) => (
            <div key={e._id} className={classes.contactList}>
                <ContactItem data={e} />
            </div>
        ))
    )
}

export default Contacts
