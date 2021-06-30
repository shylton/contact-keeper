import React from 'react'
import Contacts from './Contacts'
import ContactForm from './ContactForm'

import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'


function HomePage() {

    return (
        <Grid container justify="center" spacing={5}>
            <Grid item>
                <ContactForm />
            </Grid>
            <Grid item>
                <Typography variant='h4'>Contact List</Typography>
                <Contacts />
            </Grid>
        </Grid>
    )
}

export default HomePage
