import React, { useContext } from 'react'
import contactContext from '../contexts/contact/contactContext'
import { makeStyles } from '@material-ui/core/styles'
import uuid from 'uuid'

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
        contactList.map((e) => (
            <div key={uuid.v4()} className={classes.contactList}>
                <ContactItem data={e} />
            </div>
        ))
    )
}

export default Contacts
