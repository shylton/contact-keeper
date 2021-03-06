import React, { useState, useContext, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AuthContext from '../contexts/auth/AuthContext'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

// ### REGISTER COMPONENT ###
export default function Register(props) {
    const classes = useStyles()
    const context = useContext(AuthContext)  // no me gusta same names
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const [alertType, setAlertType] = useState('init')

    const { name, email, password } = user

    const myAlert = () => {
        switch (alertType) {
            case 'fail':
                return <Alert severity='error'>{context.error}</Alert>
            case 'success':
                return <Alert severity='success'>User Registered!</Alert>

            default:
                return null;
        }

    }

    // Handle alerts with useEffect
    useEffect(() => {
        if (context.isAuthenticated) {
            props.history.push('/')  // go to homepage
        }
        if (context.error === 'init') {
            return
        } else if (context.error === null) { // set to null on success, reset to init?
            setAlertType('success')
        } else {
            setAlertType('fail')
        }
    }, [context.error, context.isAuthenticated, props.history])

    const handleChange = (evt) => {
        setUser({ ...user, [evt.target.id]: evt.target.value })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        context.registerUser({
            name,
            email,
            password
        })
    }
    

    return (
        <Container component="main" maxWidth="xs">
            {myAlert()}
            <div className={classes.paper}>
                <Avatar className={classes.avatar}></Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                value={user.name}
                                onChange={handleChange}
                                autoFocus
                            />
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                value={user.lastName}
                                onChange={handleChange}
                            />
                        </Grid> */}
                        <Grid item xs={12}>
                            <TextField
                                type='email'
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password2"
                                label="Password2"
                                type="password"
                                id="password2"
                                autoComplete="current-password"
                                value={user.password2}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Register
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to='/login' variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
