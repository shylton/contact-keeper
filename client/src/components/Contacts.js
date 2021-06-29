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
            margin: theme.spacing(1)
        },
    },
}))

const Contacts = () => {
    const classes = useStyles()
    let contactList = useContext(contactContext)
    contactList = contactList.contacts

    return (
        contactList.map((e) => (
            <div className={classes.contactList}>
                <ContactItem key={e.id} data={e} />
            </div>
        ))
    )
}

export default Contacts
