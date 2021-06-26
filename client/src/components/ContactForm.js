import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}))

export default function ContactForm() {
    const classes = useStyles()
    const [contact, setContact] = React.useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
    })

    const handleChange = (event) => {
        setContact({ ...contact, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
            <h2>Add Contact</h2>
            <div>
                <TextField
                    type="text"
                    name="name"
                    label="Name"
                    value={contact.name}
                    onChange={handleChange} />
            </div>
            <div>
                <TextField
                    type="email"
                    name="email"
                    label="Email"
                    value={contact.email}
                    onChange={handleChange} />
            </div>
            <div>
                <TextField
                    type="tel"
                    name="phone"
                    label="Phone"
                    value={contact.phone}
                    onChange={handleChange} />
            </div>
            <div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Contact Type</FormLabel>
                    <RadioGroup aria-label="type" name="type" value={contact.type} onChange={handleChange}>
                        <FormControlLabel value="professional" control={<Radio />} label="professional" />
                        <FormControlLabel value="personal" control={<Radio />} label="personal" />
                    </RadioGroup>
                </FormControl>
            </div>
            <div>
                <Button fullWidth variant='contained' >
                    Add Contact
                </Button>
            </div>
        </form>
    )
}
