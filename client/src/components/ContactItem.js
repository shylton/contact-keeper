import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

const useStyles = makeStyles((theme) => ({
    badgeInfo: {
        textTransform: "none",
        textColor: "green"  // not working, should not use button here
    }
}))

const ContactItem = ({ data }) => {
    const { id, name, email, phone, type } = data
    const classes = useStyles()

    return (
        <Paper key={id}>
            <span>{name}</span>
            <Button
                disabled
                className={classes.badgeInfo}
            >
                {type}
            </Button>
            <List>
                {email && (
                    <React.Fragment key={'1'}>
                        <ListItem>
                            <i className="fas fa-envelope-open" />{email}
                        </ListItem>
                    </React.Fragment>)
                }
                {phone && (
                    <React.Fragment key={'2'}>
                        <ListItem>
                            <i className="fas fa-phone" />{phone}
                        </ListItem>
                    </React.Fragment>)
                }
            </List>
            <Button variant="contained" color="primary">Edit</Button>
            <Button variant="contained">Delete</Button>
        </Paper>
    )
}

ContactItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        type: PropTypes.string,
    }),
}

export default ContactItem
