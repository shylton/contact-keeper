import React, { useContext } from 'react'
import contactContext from '../contexts/contact/contactContext'
import { makeStyles } from '@material-ui/core/styles'

import ContactItem from './ContactItem'

const useStyles = makeStyles((theme) => ({
    root: {
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
        <React.Fragment>
            {contactList.map((e) => (
                <div className={classes.root}>
                    <ContactItem key={e.id} data={e} />
                </div>
            ))}
        </React.Fragment>
    )
}

export default Contacts
