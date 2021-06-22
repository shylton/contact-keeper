import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1
    },
    navbarLink: { // refactor: this should be a global change?
        color:'white',
        textDecoration:'none'
    }
}))

export default function Navbar({ title, icon }) {
    const classes = useStyles()

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' className={classes.title}>
                    <i className={icon} /> {title}
                </Typography>
                <Button>
                    <Link to="/" className={classes.navbarLink}>
                        Home
                    </Link>
                </Button>
                <Button>
                    <Link to="/about" className={classes.navbarLink}>
                        About
                    </Link>
                </Button>
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
