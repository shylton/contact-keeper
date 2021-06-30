import React, { useState } from 'react'

import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const Register = (props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const handleChange = (event) => {
        setUser({ ...user, [event.target.id]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(user)
    }


    return (
        <Grid
            container
            direction='column'
            maxWidth='sm'
        >
            <Grid item>
                <Typography variant='h3' color='primary'>User Registration</Typography>
            </Grid>
            <form onSubmit={handleSubmit}>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input type='text' id="name" aria-describedby="my-helper-text" value={user.name} onChange={handleChange} />
                        <FormHelperText id="my-helper-text">Enter your name.</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input type='email' id="email" aria-describedby="my-helper-text" value={user.email} onChange={handleChange} />
                        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input type='password' id="password" aria-describedby="my-helper-text" value={user.password} onChange={handleChange} />
                        <FormHelperText id="my-helper-text">Enter a valid password.</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl>
                        <InputLabel htmlFor="password2">Password</InputLabel>
                        <Input type='password' id="password2" aria-describedby="my-helper-text" value={user.password2} onChange={handleChange} />
                        <FormHelperText id="my-helper-text">Enter a matching password.</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button type='submit'>
                        Register
                    </Button>
                </Grid>
            </form>
        </Grid>
    )
}

export default Register
