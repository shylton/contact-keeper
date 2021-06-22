import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1
    }
}))

export default function Navbar({ title, icon }) {
    const classes = useStyles()

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' className={classes.title}>
                    <i className={icon}></i> {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}
