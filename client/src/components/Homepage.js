import React, { useContext, useEffect } from 'react'
import Contacts from './Contacts'
import ContactForm from './ContactForm'

import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import AuthContext from '../contexts/auth/AuthContext'


function HomePage() {
    const context = useContext(AuthContext)
    
    useEffect(() => {
        context.loadUser()
        // eslint-disable-next-line
    }, [])
    return (
        <Grid container justify="center" spacing={5}>
            <Grid item>
                <Typography variant='h4'>Contact List</Typography>
                <Contacts />
            </Grid>
            <Grid item>
                <ContactForm />
            </Grid>
        </Grid>
    )
}

export default HomePage
