import React from 'react'
import Contacts from './Contacts'
import ContactForm from './ContactForm'

import Grid from '@material-ui/core/Grid'


function HomePage() {

    return (
        <Grid container justify="center">
            <Grid item>
                <ContactForm />
            </Grid>
            <Grid item>
                <Contacts />
            </Grid>
        </Grid>
    )
}

export default HomePage
